// Generative harbour ambience: lapping water and the odd halyard ping against a mast.
// Everything is synthesized; no audio files.
let ctx: AudioContext | null = null
let master: GainNode | null = null
let pingTimer = 0

export function soundOn() {
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    // Brown noise for the water
    const len = ctx.sampleRate * 4
    const buf = ctx.createBuffer(2, len, ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      let last = 0
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1
        last = (last + 0.02 * white) / 1.02
        d[i] = last * 3.2
      }
    }
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.loop = true
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 520
    lp.Q.value = 0.6
    const swell = ctx.createGain()
    swell.gain.value = 0.55
    // Slow swells: two LFOs at unrelated rates so it never loops audibly
    ;[0.11, 0.073].forEach((rate, i) => {
      const lfo = ctx!.createOscillator()
      lfo.frequency.value = rate
      const g = ctx!.createGain()
      g.gain.value = i === 0 ? 0.28 : 160
      lfo.connect(g)
      g.connect(i === 0 ? swell.gain : lp.frequency)
      lfo.start()
    })
    src.connect(lp).connect(swell).connect(master)
    src.start()
  }
  ctx.resume()
  master!.gain.cancelScheduledValues(ctx.currentTime)
  master!.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5)
  schedulePing()
}

function schedulePing() {
  clearTimeout(pingTimer)
  pingTimer = window.setTimeout(() => {
    ping()
    schedulePing()
  }, 4000 + Math.random() * 9000)
}

function ping() {
  if (!ctx || !master) return
  const t = ctx.currentTime
  const base = 1800 + Math.random() * 900
  const pan = ctx.createStereoPanner()
  pan.pan.value = Math.random() * 1.6 - 0.8
  pan.connect(master)
  ;[1, 2.76, 5.4].forEach((m, i) => {
    const o = ctx!.createOscillator()
    o.type = 'sine'
    o.frequency.value = base * m
    const g = ctx!.createGain()
    const peak = [0.05, 0.018, 0.008][i]
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(peak, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6 - i * 0.4)
    o.connect(g).connect(pan)
    o.start(t)
    o.stop(t + 1.7)
  })
  // a second, softer strike sometimes follows
  if (Math.random() > 0.5) setTimeout(ping, 180 + Math.random() * 220)
}

export function soundOff() {
  clearTimeout(pingTimer)
  if (!ctx || !master) return
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
}
