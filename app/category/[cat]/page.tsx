import { getAllPosts } from '../../../lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ cat: string }> }

const CATEGORY_MAP: Record<string, { label: string; desc: string; keywords: string[] }> = {
  'dumbbells': { label: 'Dumbbells & Weights', desc: 'Best dumbbells, adjustable weights and kettlebells for home and gym workouts.', keywords: ['dumbbell','adjustable dumbbell','kettlebell','weight set','bowflex','powerblock','hex dumbbell'] },
  'cardio': { label: 'Cardio Equipment', desc: 'Top treadmills, exercise bikes, rowing machines and ellipticals compared.', keywords: ['treadmill','exercise bike','rowing machine','elliptical','cardio','stationary bike','peloton'] },
  'yoga-pilates': { label: 'Yoga & Pilates', desc: 'Best yoga mats, blocks, straps, pilates reformers and accessories reviewed.', keywords: ['yoga mat','yoga block','yoga strap','pilates','reformer','meditation','flexibility','cork mat'] },
  'running': { label: 'Running Gear', desc: 'Best running shoes, GPS watches, hydration vests and running accessories.', keywords: ['running shoes','running watch','gps watch','hydration vest','foam roller','compression','garmin'] },
  'resistance-bands': { label: 'Resistance Bands', desc: 'Best resistance bands, loop bands and tube bands for strength and rehab training.', keywords: ['resistance band','loop band','tube band','hip band','pull up band','stretch band','rehab band'] },
  'boxing': { label: 'Boxing & MMA', desc: 'Top boxing gloves, punching bags, hand wraps and MMA training gear reviewed.', keywords: ['boxing gloves','punching bag','hand wraps','mma gloves','speed bag','heavy bag','boxing'] },
  'swimming': { label: 'Swimming Gear', desc: 'Best swim goggles, swimsuits, pull buoys and swimming training accessories.', keywords: ['swim goggles','swimsuit','pull buoy','swim cap','kickboard','fins','swimming gear','triathlon'] },
  'fitness-trackers': { label: 'Fitness Trackers', desc: 'Best fitness trackers, smartwatches and heart rate monitors for workouts.', keywords: ['fitness tracker','smartwatch','heart rate monitor','fitbit','garmin','apple watch','whoop','oura'] },
  'supplements': { label: 'Supplements', desc: 'Best protein powders, pre-workouts, creatine and recovery supplements reviewed.', keywords: ['protein powder','pre-workout','creatine','bcaa','whey protein','mass gainer','supplements'] },
  'athletic-shoes': { label: 'Athletic Shoes', desc: 'Best cross-training shoes, weightlifting shoes and gym sneakers compared.', keywords: ['cross training shoes','weightlifting shoes','gym shoes','training shoes','nike','reebok','new balance'] },
  'home-gym': { label: 'Home Gym Equipment', desc: 'Best power racks, barbells, pull-up bars and home gym setups reviewed.', keywords: ['home gym','power rack','barbell','pull up bar','squat rack','weight bench','cable machine'] },
  'recovery': { label: 'Recovery & Mobility', desc: 'Best foam rollers, massage guns, ice baths and recovery tools for athletes.', keywords: ['foam roller','massage gun','theragun','hypervolt','ice bath','sauna','compression boots','recovery'] },
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ cat: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).cat
  const cat = CATEGORY_MAP[slug]
  if (!cat) return {}
  return {
    title: `${cat.label} 2025 — Fit Gear Rank`,
    description: cat.desc,
    alternates: { canonical: `https://www.fitgearrank.com/category/${slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const slug = (await params).cat
  const cat = CATEGORY_MAP[slug]
  if (!cat) notFound()

  const all = getAllPosts()
  const kw = cat.keywords
  const matched = all.filter((p) => {
    const text = ((p.keyword || '') + ' ' + (p.title || '') + ' ' + (p.slug || '')).toLowerCase()
    return kw.some((k: string) => text.includes(k))
  })
  const posts = matched.length > 0 ? matched : all.slice(0, 12)

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#0a0a0a;--surface:#111111;--border:#1e1e1e;--text:#e4e4e7;--muted:#71717a;--accent:#ef4444;--accent2:#f97316;--radius:12px}
        body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}
        a{text-decoration:none;color:inherit}
        .container{max-width:1100px;margin:0 auto;padding:0 24px}
        .cat-hero{padding:60px 24px 48px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,color-mix(in srgb,#ef4444 15%,transparent) 0%,transparent 70%)}
        .cat-badge{display:inline-block;padding:5px 16px;border-radius:20px;background:color-mix(in srgb,#ef4444 12%,transparent);border:1px solid color-mix(in srgb,#ef4444 30%,transparent);color:var(--accent);font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px}
        .cat-hero h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:12px}
        .cat-hero p{color:var(--muted);font-size:1rem;max-width:560px;margin:0 auto 24px}
        .breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--muted);justify-content:center;margin-bottom:32px}
        .breadcrumb a{color:var(--accent)}
        .post-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;padding-bottom:80px}
        .post-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s}
        .post-card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .post-tag{display:inline-block;padding:3px 10px;border-radius:20px;background:color-mix(in srgb,#ef4444 10%,transparent);border:1px solid color-mix(in srgb,#ef4444 25%,transparent);color:var(--accent);font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:12px}
        .post-card h2{font-size:1rem;font-weight:700;line-height:1.4;margin-bottom:10px}
        .post-card h2 a:hover{color:var(--accent)}
        .post-card p{color:var(--muted);font-size:0.87rem;line-height:1.65;flex:1;margin-bottom:18px}
        .post-footer{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--border)}
        .post-date{font-size:0.72rem;color:var(--muted)}
        .post-link{font-size:0.82rem;color:var(--accent);font-weight:600}
        .empty{text-align:center;padding:80px 0;color:var(--muted)}
        @media(max-width:600px){.post-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="cat-hero">
        <div className="cat-badge">Category</div>
        <h1>{cat.label}</h1>
        <p>{cat.desc}</p>
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{cat.label}</span>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <p className="empty">No articles yet — check back soon!</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.slug}>
                {post.keyword && <span className="post-tag">{post.keyword}</span>}
                <h2><a href={`/${post.slug}`}>{post.title}</a></h2>
                <p>{post.description}</p>
                <div className="post-footer">
                  <span className="post-date">{post.date}</span>
                  <a href={`/${post.slug}`} className="post-link">Read →</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
