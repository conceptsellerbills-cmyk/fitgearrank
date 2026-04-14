import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories — FitGearRank",
  description: "Browse all categories on FitGearRank. Find expert guides and reviews organized by topic.",
};

const CATEGORIES: { icon: string; label: string; desc: string; href: string }[] = [{"icon":"🏋️","label":"Dumbbells & Weights","desc":"Fixed, adjustable & sets","href":"/category/dumbbells"},{"icon":"🚴","label":"Cardio Equipment","desc":"Treadmills, bikes & rowers","href":"/category/cardio"},{"icon":"🧘","label":"Yoga & Pilates","desc":"Mats, blocks & reformers","href":"/category/yoga-pilates"},{"icon":"🏃","label":"Running Gear","desc":"Shoes, watches & accessories","href":"/category/running"},{"icon":"💪","label":"Resistance Bands","desc":"Loop, tube & fabric bands","href":"/category/resistance-bands"},{"icon":"🥊","label":"Boxing & MMA","desc":"Bags, gloves & gear ranked","href":"/category/boxing"},{"icon":"🏊","label":"Swimming Gear","desc":"Goggles, suits & accessories","href":"/category/swimming"},{"icon":"⌚","label":"Fitness Trackers","desc":"Smartwatches & fitness bands","href":"/category/fitness-trackers"},{"icon":"🧴","label":"Supplements & Nutrition","desc":"Protein, creatine & vitamins","href":"/category/supplements"},{"icon":"👟","label":"Athletic Footwear","desc":"Training, running & cross-fit","href":"/category/athletic-shoes"},{"icon":"🏠","label":"Home Gym Setup","desc":"Racks, benches & full setups","href":"/category/home-gym"},{"icon":"🔄","label":"Recovery & Mobility","desc":"Foam rollers, massage & more","href":"/category/recovery"}];

export default function CategoriesPage() {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#0a0808;color:#e4e8f4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}
        a{text-decoration:none;color:inherit}
        .cats-wrap{max-width:1100px;margin:0 auto;padding:48px 24px 80px}
        .cats-header{margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #1e2535}
        .cats-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ef4444;margin-bottom:8px}
        .cats-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;letter-spacing:-0.03em;color:#e4e8f4}
        .cats-subtitle{font-size:0.95rem;color:#7a82a0;margin-top:10px;line-height:1.6}
        .cats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
        .cat-card{background:#120f0f;border:1px solid #1e2535;border-radius:12px;padding:28px 22px;display:block;transition:border-color 0.15s,transform 0.15s,box-shadow 0.15s}
        .cat-card:hover{border-color:#ef4444;transform:translateY(-3px);box-shadow:0 10px 32px rgba(0,0,0,0.35)}
        .cat-icon{font-size:2.2rem;margin-bottom:14px;display:block;line-height:1}
        .cat-label{font-weight:700;font-size:1rem;margin-bottom:6px;color:#e4e8f4}
        .cat-desc{font-size:0.8rem;color:#7a82a0;line-height:1.55}
        .cat-arrow{display:block;margin-top:14px;font-size:0.8rem;font-weight:600;color:#ef4444;opacity:0;transition:opacity 0.15s}
        .cat-card:hover .cat-arrow{opacity:1}
        @media(max-width:500px){.cats-grid{grid-template-columns:repeat(2,1fr)}}
      `}</style>
      <div className="cats-wrap">
        <div className="cats-header">
          <div className="cats-eyebrow">Browse</div>
          <h1 className="cats-title">All Categories</h1>
          <p className="cats-subtitle">{CATEGORIES.length} categories — pick a topic and dive in.</p>
        </div>
        <div className="cats-grid">
          {CATEGORIES.map((c) => (
            <a href={c.href} className="cat-card" key={c.href}>
              <span className="cat-icon">{c.icon}</span>
              <div className="cat-label">{c.label}</div>
              <div className="cat-desc">{c.desc}</div>
              <span className="cat-arrow">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
