// A "living photograph": the real CWB photo, with a real-time ripple simulation
// running only on the water. Moving the cursor across the lake leaves a wake.

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const SIM = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uDelta;
uniform float uDamping;
in vec2 vUv;
out vec4 o;
void main() {
  vec4 info = texture(uState, vUv);
  vec2 dx = vec2(uDelta.x, 0.0);
  vec2 dy = vec2(0.0, uDelta.y);
  float avg = (
    texture(uState, vUv - dx).r +
    texture(uState, vUv - dy).r +
    texture(uState, vUv + dx).r +
    texture(uState, vUv + dy).r
  ) * 0.25;
  info.g += (avg - info.r) * 2.0;
  info.g *= uDamping;
  info.r += info.g;
  info.r *= 0.999;
  o = info;
}`

const DROP = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec4 uDrops[16];
uniform int uCount;
uniform float uAspect;
in vec2 vUv;
out vec4 o;
void main() {
  vec4 info = texture(uState, vUv);
  for (int i = 0; i < 16; i++) {
    if (i >= uCount) break;
    vec4 d = uDrops[i];
    vec2 p = vUv - d.xy;
    p.x *= uAspect;
    float drop = max(0.0, 1.0 - length(p) / d.z);
    drop = 0.5 - cos(drop * 3.14159265) * 0.5;
    info.r += drop * d.w;
  }
  o = info;
}`

const RENDER = `#version 300 es
precision highp float;
uniform sampler2D uImage;
uniform sampler2D uMask;
uniform sampler2D uState;
uniform vec2 uImgScale;
uniform vec2 uImgOffset;
uniform vec2 uSimDelta;
uniform float uTime;
uniform float uZoom;
uniform vec2 uParallax;
uniform float uGolden;
uniform float uDusk;
uniform float uHorizon;
in vec2 vUv;
out vec4 o;

void main() {
  vec2 zuv = (vUv - 0.5) / uZoom + 0.5 + uParallax;
  vec2 iuv = uImgOffset + zuv * uImgScale;
  float m = texture(uMask, iuv).r;

  // Height-field normal from the ripple simulation (screen space)
  float hL = texture(uState, vUv - vec2(uSimDelta.x, 0.0)).r;
  float hR = texture(uState, vUv + vec2(uSimDelta.x, 0.0)).r;
  float hB = texture(uState, vUv - vec2(0.0, uSimDelta.y)).r;
  float hT = texture(uState, vUv + vec2(0.0, uSimDelta.y)).r;
  vec2 n = vec2(hR - hL, hT - hB);

  // Ambient lake: small swell, bigger and slower close to camera, finer near the horizon
  float close = clamp((uHorizon - iuv.y) / uHorizon, 0.0, 1.0);
  float f = mix(380.0, 120.0, close);
  float amp = mix(0.0004, 0.0024, close);
  float ph = iuv.y * f - uTime * mix(1.9, 1.1, close) + sin(iuv.x * 14.0 + uTime * 0.45) * 1.4;
  vec2 amb = vec2(sin(ph) * amp, cos(ph * 0.7 + iuv.x * 30.0) * amp * 0.35);

  vec2 disp = (n * 0.42 + amb) * m;
  vec3 col = texture(uImage, iuv + disp).rgb;

  // Glints where ripples face the sky
  float glint = max(0.0, dot(normalize(vec3(n * 40.0, 1.0)), normalize(vec3(-0.35, 0.8, 0.5))) - 0.72);
  col += glint * 0.7 * m * vec3(1.0, 0.97, 0.9);
  // faint darkening in troughs gives the rings body
  col *= 1.0 - clamp(-(hL + hR + hB + hT) * 0.25 * 1.2, 0.0, 0.08) * m;

  // Time-of-day grade
  vec3 golden = col * vec3(1.12, 0.98, 0.80) + vec3(0.03, 0.01, 0.0);
  col = mix(col, golden, uGolden);
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  vec3 dusk = mix(vec3(luma), col, 0.6) * vec3(0.62, 0.72, 0.98);
  col = mix(col, dusk, uDusk);

  o = vec4(col, 1.0);
}`

type Program = { prog: WebGLProgram; uni: Record<string, WebGLUniformLocation | null> }

export type LivingWaterOptions = {
  image: string
  mask: string
  focal?: [number, number]
  horizon?: number // image-space height of the horizon, 0 = bottom
  imageAspect: number
}

export class LivingWater {
  private gl: WebGL2RenderingContext
  private canvas: HTMLCanvasElement
  private opts: LivingWaterOptions
  private quad!: WebGLVertexArrayObject
  private pSim!: Program
  private pDrop!: Program
  private pRender!: Program
  private texImage: WebGLTexture | null = null
  private texMask: WebGLTexture | null = null
  private state: { tex: WebGLTexture; fbo: WebGLFramebuffer }[] = []
  private cur = 0
  private simW = 0
  private simH = 0
  private drops: number[][] = []
  private maskData: Uint8ClampedArray | null = null
  private maskW = 0
  private maskH = 0
  private raf = 0
  private running = false
  private start = performance.now()
  private last = { x: -1, y: -1, t: 0 }
  private nextAmbient = 0
  private dpr = 1

  zoom = 1
  parallax: [number, number] = [0, 0]
  golden = 0
  dusk = 0
  ready: Promise<void>

  constructor(canvas: HTMLCanvasElement, opts: LivingWaterOptions) {
    this.canvas = canvas
    this.opts = opts
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) throw new Error('webgl2 unavailable')
    if (!gl.getExtension('EXT_color_buffer_float')) throw new Error('float render targets unavailable')
    this.gl = gl
    this.setup()
    this.ready = this.load()
  }

  private compile(fragSrc: string, names: string[]): Program {
    const gl = this.gl
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader')
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fragSrc))
    gl.bindAttribLocation(prog, 0, 'aPos')
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link')
    const uni: Program['uni'] = {}
    names.forEach((n) => (uni[n] = gl.getUniformLocation(prog, n)))
    return { prog, uni }
  }

  private setup() {
    const gl = this.gl
    this.quad = gl.createVertexArray()!
    gl.bindVertexArray(this.quad)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    this.pSim = this.compile(SIM, ['uState', 'uDelta', 'uDamping'])
    this.pDrop = this.compile(DROP, ['uState', 'uDrops', 'uCount', 'uAspect'])
    this.pRender = this.compile(RENDER, [
      'uImage', 'uMask', 'uState', 'uImgScale', 'uImgOffset', 'uSimDelta', 'uTime', 'uZoom',
      'uParallax', 'uGolden', 'uDusk', 'uHorizon',
    ])
  }

  private loadImage(src: string) {
    return new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => res(img)
      img.onerror = rej
      img.src = src
    })
  }

  private texFrom(img: HTMLImageElement) {
    const gl = this.gl
    const t = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  }

  private async load() {
    const [img, mask] = await Promise.all([this.loadImage(this.opts.image), this.loadImage(this.opts.mask)])
    this.texImage = this.texFrom(img)
    this.texMask = this.texFrom(mask)
    const c = document.createElement('canvas')
    c.width = this.maskW = mask.naturalWidth
    c.height = this.maskH = mask.naturalHeight
    const ctx = c.getContext('2d', { willReadFrequently: true })!
    ctx.drawImage(mask, 0, 0)
    this.maskData = ctx.getImageData(0, 0, c.width, c.height).data
    this.resize()
  }

  private makeState(w: number, h: number) {
    const gl = this.gl
    const tex = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    const fbo = gl.createFramebuffer()!
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    return { tex, fbo }
  }

  resize() {
    const gl = this.gl
    const rect = this.canvas.getBoundingClientRect()
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    const w = Math.max(2, Math.round(rect.width * this.dpr))
    const h = Math.max(2, Math.round(rect.height * this.dpr))
    this.canvas.width = w
    this.canvas.height = h
    const simScale = rect.width > 1400 ? 4 : 3
    const sw = Math.max(64, Math.round(rect.width / simScale))
    const shh = Math.max(64, Math.round(rect.height / simScale))
    if (sw !== this.simW || shh !== this.simH) {
      this.state.forEach((s) => {
        gl.deleteTexture(s.tex)
        gl.deleteFramebuffer(s.fbo)
      })
      this.simW = sw
      this.simH = shh
      this.state = [this.makeState(sw, shh), this.makeState(sw, shh)]
    }
  }

  // Cover-fit math shared by the shader and the CPU mask lookup
  private cover() {
    const rect = this.canvas.getBoundingClientRect()
    const ac = rect.width / Math.max(1, rect.height)
    const ai = this.opts.imageAspect
    const sx = Math.min(1, ac / ai)
    const sy = Math.min(1, ai / ac)
    const [fx, fy] = this.opts.focal ?? [0.5, 0.5]
    const cx = Math.min(Math.max(fx, sx / 2), 1 - sx / 2)
    const cy = Math.min(Math.max(fy, sy / 2), 1 - sy / 2)
    return { sx, sy, ox: cx - sx / 2, oy: cy - sy / 2 }
  }

  setFocal(f: [number, number]) {
    this.opts.focal = f
  }

  private maskAt(u: number, v: number) {
    if (!this.maskData) return 0
    const { sx, sy, ox, oy } = this.cover()
    const zu = (u - 0.5) / this.zoom + 0.5 + this.parallax[0]
    const zv = (v - 0.5) / this.zoom + 0.5 + this.parallax[1]
    const iu = ox + zu * sx
    const iv = oy + zv * sy
    if (iu < 0 || iu > 1 || iv < 0 || iv > 1) return 0
    const px = Math.min(this.maskW - 1, Math.floor(iu * this.maskW))
    const py = Math.min(this.maskH - 1, Math.floor((1 - iv) * this.maskH))
    return this.maskData[(py * this.maskW + px) * 4] / 255
  }

  /** Returns true if the point (client coords) is over water. */
  pointer(clientX: number, clientY: number, force = false) {
    const rect = this.canvas.getBoundingClientRect()
    const u = (clientX - rect.left) / rect.width
    const v = 1 - (clientY - rect.top) / rect.height
    const now = performance.now()
    const m = this.maskAt(u, v)
    if (this.last.x < 0 || now - this.last.t > 200) {
      this.last = { x: u, y: v, t: now }
      return m > 0.15
    }
    const dxp = (u - this.last.x) * rect.width
    const dyp = (v - this.last.y) * rect.height
    const dist = Math.hypot(dxp, dyp)
    const dt = Math.max(1, now - this.last.t)
    const speed = dist / dt // px per ms
    const steps = Math.min(6, Math.floor(dist / 10))
    if (steps > 0 || force) {
      for (let i = 1; i <= Math.max(1, steps); i++) {
        const t = i / Math.max(1, steps)
        const pu = this.last.x + (u - this.last.x) * t
        const pv = this.last.y + (v - this.last.y) * t
        const mm = this.maskAt(pu, pv)
        if (mm > 0.15) this.addDrop(pu, pv, 0.012 + Math.min(0.006, speed * 0.003), Math.min(0.32, 0.07 + speed * 0.14) * mm)
      }
      this.last = { x: u, y: v, t: now }
    }
    return m > 0.15
  }

  splash(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect()
    const u = (clientX - rect.left) / rect.width
    const v = 1 - (clientY - rect.top) / rect.height
    const m = this.maskAt(u, v)
    if (m > 0.15) this.addDrop(u, v, 0.04, 1.1 * m)
  }

  private addDrop(u: number, v: number, r: number, s: number) {
    if (this.drops.length < 16) this.drops.push([u, v, r, s])
  }

  private ambient(now: number) {
    if (now < this.nextAmbient) return
    this.nextAmbient = now + 2600 + Math.random() * 3400
    for (let i = 0; i < 24; i++) {
      const u = Math.random()
      const v = Math.random() * 0.55
      const m = this.maskAt(u, v)
      if (m > 0.55) {
        this.addDrop(u, v, 0.008 + Math.random() * 0.006, (0.03 + Math.random() * 0.04) * m)
        return
      }
    }
  }

  private pass(p: Program, target: { fbo: WebGLFramebuffer } | null, w: number, h: number) {
    const gl = this.gl
    gl.useProgram(p.prog)
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fbo : null)
    gl.viewport(0, 0, w, h)
  }

  private step() {
    const gl = this.gl
    const src = this.state[this.cur]
    const dst = this.state[1 - this.cur]
    // drops
    if (this.drops.length) {
      this.pass(this.pDrop, dst, this.simW, this.simH)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, src.tex)
      gl.uniform1i(this.pDrop.uni.uState, 0)
      const arr = new Float32Array(64)
      this.drops.forEach((d, i) => arr.set(d, i * 4))
      gl.uniform4fv(this.pDrop.uni.uDrops, arr)
      gl.uniform1i(this.pDrop.uni.uCount, this.drops.length)
      gl.uniform1f(this.pDrop.uni.uAspect, this.simW / this.simH)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      this.drops = []
      this.cur = 1 - this.cur
    }
    const s2 = this.state[this.cur]
    const d2 = this.state[1 - this.cur]
    this.pass(this.pSim, d2, this.simW, this.simH)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, s2.tex)
    gl.uniform1i(this.pSim.uni.uState, 0)
    gl.uniform2f(this.pSim.uni.uDelta, 1 / this.simW, 1 / this.simH)
    gl.uniform1f(this.pSim.uni.uDamping, 0.986)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    this.cur = 1 - this.cur
  }

  private render(time: number) {
    const gl = this.gl
    this.pass(this.pRender, null, this.canvas.width, this.canvas.height)
    const { sx, sy, ox, oy } = this.cover()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.texImage)
    gl.uniform1i(this.pRender.uni.uImage, 0)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.texMask)
    gl.uniform1i(this.pRender.uni.uMask, 1)
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, this.state[this.cur].tex)
    gl.uniform1i(this.pRender.uni.uState, 2)
    gl.uniform2f(this.pRender.uni.uImgScale, sx, sy)
    gl.uniform2f(this.pRender.uni.uImgOffset, ox, oy)
    gl.uniform2f(this.pRender.uni.uSimDelta, 1 / this.simW, 1 / this.simH)
    gl.uniform1f(this.pRender.uni.uTime, time)
    gl.uniform1f(this.pRender.uni.uZoom, this.zoom)
    gl.uniform2f(this.pRender.uni.uParallax, this.parallax[0], this.parallax[1])
    gl.uniform1f(this.pRender.uni.uGolden, this.golden)
    gl.uniform1f(this.pRender.uni.uDusk, this.dusk)
    gl.uniform1f(this.pRender.uni.uHorizon, this.opts.horizon ?? 0.4)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  private loop = () => {
    if (!this.running) return
    const now = performance.now()
    if (this.texImage) {
      this.ambient(now)
      this.step()
      this.step()
      this.render((now - this.start) / 1000)
    }
    this.raf = requestAnimationFrame(this.loop)
  }

  play() {
    if (this.running) return
    this.running = true
    this.raf = requestAnimationFrame(this.loop)
  }

  pause() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  /** Draw a single frame (used for reduced motion). */
  async still() {
    await this.ready
    this.render(0)
  }

  destroy() {
    this.pause()
  }
}
