import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { OgLayout } from './OgLayout'
import { allOriginalSlugs } from '../content/nav'
import { sqs } from '../lib/img'

type Page = { slug: string; title: string; hero: string | null; markdown: string }
const pages = import.meta.glob<Page>('../content/pages/*.json', { eager: true, import: 'default' })
const bySlug: Record<string, Page> = Object.fromEntries(Object.values(pages).map((p) => [p.slug, p]))
const known = new Set([...allOriginalSlugs, ...Object.keys(bySlug)])

function render(md: string) {
  let html = marked.parse(md, { async: false }) as string
  // Route cwb.org links we have copies of to the in-app copy; everything else keeps pointing at cwb.org.
  html = html.replace(/href="(?:https?:\/\/(?:www\.)?cwb\.org)?\/([a-z0-9-]+)\/?"/g, (m, slug) => (known.has(slug) ? `href="#/original/${slug}"` : m.startsWith('href="/') ? `href="https://www.cwb.org/${slug}"` : m))
  html = html.replace(/<img src="([^"]+)"/g, (_m, src) => `<img loading="lazy" src="${sqs(src, 1000)}"`)
  // Runs of image-only paragraphs become a Squarespace-style gallery grid.
  html = html.replace(/(?:<p>(?:<img[^>]*>\s*)+<\/p>\s*){2,}/g, (run) => `<div class="og-gallery">${run.replace(/<\/?p>/g, '')}</div>`)
  return html
}

export default function OriginalPage() {
  const { slug = '' } = useParams()
  const page = bySlug[slug]
  const html = useMemo(() => {
    if (!page) return ''
    let md = page.markdown.replace(/^#\s+.*\n/, '')
    if (page.hero) md = md.replace(new RegExp(`!\\[[^\\]]*\\]\\(${page.hero.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`), '')
    return render(md)
  }, [page])
  const h1 = page?.markdown.match(/^#\s+(.*)$/m)?.[1] ?? page?.title
  const hero = page?.hero
  if (!page) {
    return (
      <OgLayout>
        <div className="max-w-[900px] mx-auto px-6 py-24 og-content">
          <h1>Page not copied yet</h1>
          <p>This page lives on cwb.org. <a href={`https://www.cwb.org/${slug}`}>Open it there</a> or go back <Link to="/original">home</Link>.</p>
        </div>
      </OgLayout>
    )
  }
  return (
    <OgLayout overlay={!!hero}>
      {hero && (
        <section className="relative h-[70vh] min-h-[460px] text-white">
          <img src={sqs(hero, 2500)} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative h-full flex items-end px-[6vw] pb-16">
            <h1 className="text-[2.4rem] md:text-[3.2rem] font-semibold leading-tight max-w-4xl [text-shadow:0_1px_3px_rgba(0,0,0,.35)]">{h1}</h1>
          </div>
        </section>
      )}
      <article className="max-w-[1000px] mx-auto px-6 py-16 og-content">
        {!hero && <h1>{h1}</h1>}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </OgLayout>
  )
}
