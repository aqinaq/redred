import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import { images as IMAGES, imageAlts, stories } from './content';

function EditorialImage({src, sizes='(max-width: 800px) 100vw, 70vw', ...props}) {
  const stem=src.replace(/\.jpg$/, '');
  return <img src={src} srcSet={`${stem}-640.webp 640w, ${stem}-1600.webp 1600w`} sizes={sizes} decoding="async" {...props}/>;
}

const go = (path) => {
  history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({top: 0, behavior: 'instant'});
};

function Link({to, children, className='', onClick, ...props}) {
  return <a href={to} className={className} {...props} onClick={e => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || props.target === '_blank') return;
    onClick?.(e);
    if (!e.defaultPrevented) { e.preventDefault(); go(to); }
  }}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const nav = ['Latest', 'Culture', 'Fashion', 'Music', 'Art', 'Case study'];
  const destination = x => x === 'Latest' ? '/latest' : x === 'Case study' ? '/case-study' : `/category/${x.toLowerCase()}`;
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = [...document.querySelectorAll('main, footer, .site-header .wordmark')];
    background.forEach(el=>el.inert=true);
    menuRef.current?.querySelector('a')?.focus();
    const keydown = e => {
      if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); }
      if (e.key === 'Tab') {
        const links = [...menuRef.current.querySelectorAll('a')];
        const first = buttonRef.current, last = links.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const resize = () => { if (innerWidth > 800) setOpen(false); };
    addEventListener('keydown', keydown); addEventListener('resize', resize);
    return () => { document.body.style.overflow = old; background.forEach(el=>el.inert=false); removeEventListener('keydown', keydown); removeEventListener('resize', resize); };
  }, [open]);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="site-header" id="top">
      <Link to="/" className="wordmark" onClick={()=>setOpen(false)}><span className="signal-dot"/>OFF/RECORD</Link>
      <nav className="desktop-nav" aria-label="Primary">
        {nav.map(x=><Link key={x} to={destination(x)} aria-current={location.pathname === destination(x) ? 'page' : undefined}>{x}</Link>)}
      </nav>
      <Link to="/issues/01" className="issue-link"><span>Current</span> Issue 01</Link>
      <button ref={buttonRef} className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'} <b>{open?'×':'+'}</b></button>
    </header>
    <div className="concept-flag" role="note"><span>Independent culture publication</span><strong>Fictional concept / Almaty ↗ Worldwide</strong><Link to="/case-study">Project notes</Link></div>
    {open && <nav ref={menuRef} id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
      <div className="mobile-menu-count"><span className="signal-dot"/> Browse the signal</div>
      <div className="mobile-links">{nav.map((x,i)=><Link key={x} to={destination(x)} onClick={()=>setOpen(false)}><sup>0{i+1}</sup><span>{x}</span><b>↗</b></Link>)}</div>
      <div className="mobile-menu-foot"><Link to="/issues/01" onClick={()=>setOpen(false)}>Read Issue 01</Link><Link to="/about" onClick={()=>setOpen(false)}>About</Link></div>
    </nav>}
  </>;
}

function Footer(){ return <footer>
  <div className="footer-intro"><span className="footer-pulse">● ON AIR</span><h2>Stay curious<br/>after dark.</h2><p>Independent stories from the hours<br/>that rarely make the morning edition.</p></div>
  <nav className="footer-links" aria-label="Footer"><span>Explore</span><Link to="/latest">All stories</Link><Link to="/issues/01">Issue 01</Link><Link to="/case-study">Project notes</Link><Link to="/about">About us</Link></nav>
  <a href="#top" className="back-top" aria-label="Back to top">↑</a>
  <div className="footer-meta"><Link to="/" className="wordmark footer-mark"><span className="signal-dot"/>OFF/RECORD</Link><span>ALMATY / WORLDWIDE</span><span>FICTIONAL EDITORIAL PROJECT · 2026</span></div>
</footer> }

function Hero(){ return <section className="hero">
  <div className="hero-copy">
    <div className="hero-kicker"><span>Issue 01</span><span>September / 2026</span></div>
    <h1>After<br/><span>Dark</span></h1>
    <p>The city does not sleep.<br/>It changes frequency.</p>
    <div className="hero-actions"><a href="#lead" className="primary-action">Enter the issue <b>↓</b></a><Link to="/about" className="quiet-action">What is Off/Record?</Link></div>
    <div className="hero-status"><span><i/>Live from Almaty</span><span>43.2220° N<br/>76.8512° E</span></div>
  </div>
  <div className="hero-visual"><EditorialImage src={IMAGES.hero} fetchPriority="high" alt="A figure looks across a green-lit city skyline at night"/><div className="hero-caption"><span>01 / Cover image</span><strong>Night city, unknown hour</strong></div><span className="hero-stamp">OR<br/>01</span></div>
</section> }

function Marquee(){const [paused,setPaused]=useState(false);return <div className="marquee" aria-label="Issue themes"><span className="broadcast-label">Broadcasting</span><div style={{animationPlayState:paused?'paused':undefined}}>Nightlife&nbsp; — &nbsp;Music&nbsp; — &nbsp;Fashion&nbsp; — &nbsp;Photography&nbsp; — &nbsp;The city after hours&nbsp; — &nbsp;Nightlife&nbsp; — &nbsp;Music&nbsp; — &nbsp;</div><button aria-label={paused?'Play ticker':'Pause ticker'} onClick={()=>setPaused(!paused)}>{paused?'Play':'Pause'}</button></div>}

function LeadStory(){return <section className="lead" id="lead">
  <div className="section-label"><span><i/> Featured transmission</span><span>Story 001 / 008</span></div>
  <div className="lead-grid">
    <button className="lead-image image-button" onClick={()=>go('/article/the-city-after-2am')} aria-label="Read The City After 2AM"><EditorialImage loading="lazy" src={IMAGES.city} alt="A double-exposed portrait layered over a city at night"/><span>View story <b>↗</b></span></button>
    <div className="lead-copy"><div className="eyebrow">Culture <span/> Essay <span/> {stories[0].read}</div><h2>The City<br/>After 2AM</h2><p>The city changes character somewhere between the last train and the first bus. An imagined walk through the hours that daylight tends to overlook.</p><Link to="/article/the-city-after-2am" className="text-link"><span>Start reading</span><b>↗</b></Link><div className="lead-credit">Words / Mira Vale<br/>Visual notebook / OR Studio</div></div>
  </div>
</section>}

function EditorialGrid(){return <section className="editorial-grid"><div className="editorial-heading"><span>More on this frequency</span><h2>Stories for<br/>the long way home.</h2></div>
  <article className="feature fashion-feature"><div className="feature-num"><span>02</span> Fashion / Editorial</div><Link className="feature-image" to="/article/clothes-made-for-disappearing"><EditorialImage loading="lazy" src={IMAGES.fashion} alt="Three cinematic portraits against blurred city lights"/><b>↗</b></Link><div className="feature-copy"><h3><Link to="/article/clothes-made-for-disappearing">Clothes Made for Disappearing</Link></h3><p>Night dressing as camouflage, refusal and private ritual.</p></div></article>
  <article className="feature music-feature"><div className="feature-num"><span>03</span> Music / Essay</div><Link className="feature-image" to="/article/bedroom-producers"><EditorialImage loading="lazy" src={IMAGES.music} alt="Friends sitting in a red-lit window against a blue building"/><b>↗</b></Link><div className="feature-copy"><h3><Link to="/article/bedroom-producers">Bedroom Producers Are Building the New Underground</Link></h3><p>A scene can begin with one unfinished track and someone willing to listen.</p></div></article>
  <div className="interlude"><span>Night note / 01</span><p>“The night does not hide the city. It reveals who the city was made to hide.”</p><small>Mira Vale / contributing editor</small></div>
</section>}

function StoryIndex({items=stories, title='Inside the issue', description='Eight stories from the hours when the city turns inward.'}) {
  const [active,setActive] = useState(null);
  const ref = useRef(null);
  function move(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--preview-x', `${Math.max(0, Math.min(r.width-240, e.clientX-r.left+30))}px`);
    ref.current.style.setProperty('--preview-y', `${e.clientY-r.top-150}px`);
  }
  return <section className="story-index" ref={ref} onPointerMove={move} onPointerLeave={()=>setActive(null)}>
    <div className="index-head"><span className="eyebrow">Complete transmission log</span><h2>{title}</h2><p>{description}</p></div>
    <div className="index-rows">
      {items.map(s=><Link key={s.id} to={`/article/${s.slug}`} className="index-row" onPointerEnter={()=>setActive(s)} onFocus={()=>setActive(s)} onBlur={()=>setActive(null)}>
        <span>{s.id}</span><EditorialImage className="index-thumb" sizes="100px" src={s.image} loading="lazy" alt=""/><strong>{s.title}</strong><span className="index-category">{s.category}<small>{s.read}</small></span><span className="row-action" aria-hidden="true">↗</span>
      </Link>)}
    </div>
    {active && <EditorialImage className="follow-image" sizes="240px" src={active.image} alt=""/>}
  </section>;
}

function ClosingImage(){return <section className="closing-image"><div className="closing-copy"><span>Culture / Story 004</span><h2>The death of<br/>the dance floor</h2><p>What changes when a night out becomes a document of itself?</p><Link to="/article/death-of-the-dance-floor">Listen closer <b>↗</b></Link></div><div className="closing-visual"><EditorialImage loading="lazy" src={IMAGES.dance} alt="A lone dancer beneath a monumental abstract red projection"/><span>Last song / 04:37</span></div></section>}

function Home(){ return <><Header/><main id="main-content" tabIndex={-1}><Hero/><Marquee/><LeadStory/><EditorialGrid/><StoryIndex/><ClosingImage/><section className="next-issue"><span>Up next / Winter 2026</span><div><strong>02</strong><h2>A new frequency is coming.</h2><span>Theme<br/>unannounced</span></div></section></main><Footer/></> }

function Gallery({images, initial, onClose}) {
  const [index,setIndex] = useState(initial);
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    return () => { document.body.style.overflow = old; previous?.focus(); };
  }, []);
  const shift = step => setIndex(i=>(i+step+images.length)%images.length);
  return <dialog ref={dialog} className="lightbox" aria-label="Editorial image gallery" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();shift(1);}if(e.key==='ArrowLeft'){e.preventDefault();shift(-1);}}}>
    <button className="gallery-close" onClick={onClose}>Close ×</button>
    <EditorialImage src={images[index]} alt={imageAlts[images[index]]}/>
    <div className="gallery-controls"><button onClick={()=>shift(-1)} aria-label="Previous image">←</button><span aria-live="polite">{String(index+1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}</span><button onClick={()=>shift(1)} aria-label="Next image">→</button></div>
  </dialog>;
}

function ShareButton(){
  const [message,setMessage]=useState('Copy link ↗');
  const [fallback,setFallback]=useState(false);
  const timer = useRef();
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  async function copy(){
    try { await navigator.clipboard.writeText(location.href); setMessage('Link copied ✓'); clearTimeout(timer.current); timer.current=setTimeout(()=>setMessage('Copy link ↗'),2500); }
    catch { setFallback(true); }
  }
  return <div className="share"><button onClick={copy}>{message}</button><span className="sr-only" role="status">{message==='Link copied ✓'?message:''}</span>{fallback&&<input aria-label="Article link to copy" readOnly value={location.href} onFocus={e=>e.target.select()}/>}</div>;
}

function Article({slug}){
  const story=stories.find(s=>s.slug===slug);
  const [gallery,setGallery]=useState(null);
  if(!story)return <NotFound/>;
  const next=stories[(stories.indexOf(story)+1)%stories.length];
  return <><Header/><main id="main-content" tabIndex={-1} className={`article-page article-${story.layout||'notebook'}`}>
    <header className="article-hero"><div className="article-no"><Link to="/issues/01">Issue 01</Link> / Article {story.id}</div><div className="article-cat"><Link to={`/category/${story.category.toLowerCase()}`}>{story.category}</Link> / {story.type}</div><h1>{story.title}</h1><div className="article-byline"><p>Words by<br/><strong>{story.author}</strong></p><p>Visuals<br/><strong>Concept imagery</strong></p><p>Published<br/><strong>{story.date}</strong></p><p>Read time<br/><strong>{story.read}</strong></p></div></header>
    <button className="article-cover" onClick={()=>setGallery(0)} aria-label={`Open image gallery for ${story.title}`}><EditorialImage src={story.image} alt={imageAlts[story.image]}/><span>View gallery +</span></button>
    <div className="article-layout"><aside><span>{story.id} / 008</span><p>Issue 01<br/>After Dark</p><p>{story.author}<br/>Contributing editor</p><ShareButton/></aside>
      <article className="article-body"><p className="dek">{story.intro}</p>
        {story.sections.map(([heading,...paragraphs],i)=><React.Fragment key={heading}>
          <h2>{heading}</h2>{paragraphs.map(p=><p key={p.slice(0,45)}>{p}</p>)}
          {i===0&&<blockquote>“{story.quote}”</blockquote>}
          {i===1&&<figure><button className="inline-image" onClick={()=>setGallery(1)} aria-label="Open second image in gallery"><EditorialImage loading="lazy" src={story.gallery[1]} alt={imageAlts[story.gallery[1]]}/><span>Expand +</span></button><figcaption>02 / {story.gallery.length.toString().padStart(2,'0')} — From the After Dark visual notebook.</figcaption></figure>}
        </React.Fragment>)}
        <div className="article-end">●<span>End of story / {story.id}</span></div>
        <p className="editorial-note">Original fictional editorial. Contributors are fictional; existing project imagery is used for visual direction.</p>
      </article>
    </div>
    <div className="contact-sheet">{story.gallery.map((src,i)=><button key={src} onClick={()=>setGallery(i)} aria-label={`View image ${i+1} of ${story.gallery.length}`}><EditorialImage src={src} loading="lazy" alt={imageAlts[src]}/><span>0{i+1} / Open +</span></button>)}</div>
    <section className="article-next"><span>Continue reading</span><Link to={`/article/${next.slug}`}><small>{next.id} / {next.category}</small><strong>{next.title}</strong><b>↗</b></Link></section>
  </main>{gallery!==null&&<Gallery images={story.gallery} initial={gallery} onClose={()=>setGallery(null)}/>}<Footer/></>;
}

function Category({name}){
  const list=stories.filter(s=>s.category.toLowerCase()===name);
  if(!list.length)return <NotFound/>;
  const lead=list[0];
  return <><Header/><main id="main-content" tabIndex={-1} className="category-page"><header><span>Section / 0{['culture','fashion','music','art'].indexOf(name)+1}</span><h1>{name}</h1><p>Stories, field notes and images from<br/>the edge of the night.</p></header><section className="category-lead"><Link to={`/article/${lead.slug}`} aria-label={`Read ${lead.title}`}><EditorialImage src={lead.image} alt={imageAlts[lead.image]}/></Link><div><span>{lead.type} / {lead.read}</span><h2>{lead.title}</h2><p>{lead.blurb}</p><Link to={`/article/${lead.slug}`}>Read story ↗</Link></div></section><StoryIndex items={list} title={`All ${name}`} description={`${list.length.toString().padStart(2,'0')} stories / Issue 01`}/></main><Footer/></>;
}

function Latest(){
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const list=stories.filter(s=>(category==='All'||s.category===category)&&`${s.title} ${s.blurb} ${s.author} ${s.category}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <><Header/><main id="main-content" tabIndex={-1} className="latest-page"><header><span className="eyebrow">The reading room / Issue 01</span><h1>Latest<span> dispatches.</span></h1><p>From the last train to the first light. Everything, in order.</p></header>
    <div className="reading-tools"><div className="category-filters" role="group" aria-label="Filter by category">{['All','Culture','Fashion','Music','Art'].map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="story-search"><span>Search stories</span><input type="search" placeholder="Title, author, subject…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
    <p className="result-count" role="status">{list.length} {list.length===1?'story':'stories'}{query?` matching “${query}”`:''}</p>
    {list.length?<div className="latest-stories">{list.map(s=><article key={s.id}><Link to={`/article/${s.slug}`} className="latest-image" aria-label={`Read ${s.title}`}><EditorialImage loading="lazy" src={s.image} alt={imageAlts[s.image]}/></Link><div><span className="eyebrow">{s.category} / {s.type} / {s.read}</span><h2><Link to={`/article/${s.slug}`}>{s.title}</Link></h2><p>{s.blurb}</p><span className="eyebrow">{s.date} — {s.author}</span></div><Link className="latest-arrow" to={`/article/${s.slug}`} aria-label={`Read ${s.title}`}>↗</Link></article>)}</div>:<div className="empty-state"><h2>Nothing on this frequency.</h2><p>Try another word or explore all eight stories.</p><button onClick={()=>{setQuery('');setCategory('All');}}>Reset filters ↗</button></div>}
  </main><Footer/></>;
}

function Issue(){return <><Header/><main id="main-content" tabIndex={-1} className="issue-page"><section className="issue-mast"><div className="giant-no">01</div><div><span>September 2026 / Current issue</span><h1>After<br/><em>Dark</em></h1><p>A study of what happens to culture when the city turns off its main lights.</p></div></section><StoryIndex/><section className="manifesto"><span>Issue manifesto</span><p>We stayed awake to look at the hours usually edited out: the walk home, the empty room, the first attempt, the last song. AFTER DARK is about nightlife without spectacle — culture made in private before it learns how to perform.</p></section></main><Footer/></>}

function About(){return <><Header/><main id="main-content" tabIndex={-1} className="about-page"><div className="about-kicker">About / Est. 2026 / Fictional concept</div><h1>OFF//RECORD IS AN<br/>INDEPENDENT PUBLICATION<br/>ABOUT CULTURE <em>WHILE</em><br/>IT’S STILL HAPPENING.</h1><div className="about-grid"><p>We are interested in unfinished ideas, marginal spaces and the people building culture before it has a name. Fashion as a private language. Music before the release. Art outside the frame.</p><div><span>Based</span><strong>Almaty / Worldwide</strong><span>Issue 01</span><strong>After Dark / September 2026</strong><span>Format</span><strong>Fictional digital magazine</strong></div></div><section className="contributors"><span className="eyebrow">The imagined masthead</span><h2>A few different<br/><em>points of view.</em></h2>{[['Mira Vale','Culture / Editor'],['Lea Arden','Fashion & Art'],['Jules Park','Music'],['Orin North','Visual notebooks']].map(([name,role])=><div key={name}><strong>{name}</strong><span>{role}</span></div>)}<p>OFF//RECORD is a fictional publication created as an independent design and development portfolio project. All writing and contributors are fictional. All published imagery was generated specifically for this concept and is documented in IMAGE_RIGHTS.md. Submissions are not currently open.</p></section><section className="submit"><span>Start with the hours in between.</span><Link to="/issues/01">Read Issue 01 <b>↗</b></Link></section></main><Footer/></>}
function CaseStudy(){return <><Header/><main id="main-content" tabIndex={-1} className="case-study">
  <header className="case-hero"><div className="case-kicker">OFF//RECORD / Case study / 2026</div><h1>Culture after<br/><em>the lights go out.</em></h1><div className="case-intro"><strong>A fictional editorial concept</strong><p>OFF//RECORD explores how an independent culture title can feel cinematic without sacrificing the clarity of a reading product. The brief covered identity, editorial system, responsive behavior and a fully written first issue.</p></div></header>
  <section className="case-facts" aria-label="Project facts"><div><span>Scope</span><strong>Strategy, identity, UX/UI, editorial</strong></div><div><span>Format</span><strong>Responsive digital publication</strong></div><div><span>Status</span><strong>Self-initiated fictional concept</strong></div></section>
  <section className="case-section"><div className="case-label">01 / System</div><div className="case-copy"><h2>A signal, not a newspaper.</h2><p>The redesigned identity uses Montserrat for headlines, navigation and controls, with an old-style serif reserved for long-form reading. The geometric display voice keeps the interface contemporary; the quieter serif makes longer essays comfortable without returning to the previous decorative style.</p><div className="type-specimen"><span className="type-display">Aa</span><div><strong>Montserrat</strong><p>Display / Navigation / Controls</p></div><span className="type-ui">Aa</span><div><strong>Iowan Old Style</strong><p>Long-form reading only</p></div></div></div></section>
  <section className="case-section case-dark"><div className="case-label">02 / Grid</div><div className="case-copy"><h2>Built from responsive signal cards.</h2><p>Instead of imitating magazine spreads, the interface pairs modular color fields with cinematic image panels. On smaller screens those pairings re-sequence into a vertical broadcast: image first, message second, action always within reach.</p><div className="grid-demo" aria-label="Twelve column grid demonstration">{Array.from({length:12},(_,i)=><i key={i}/>)}</div></div></section>
  <section className="case-section"><div className="case-label">03 / Art direction</div><div className="case-copy"><h2>Night is the subject, not a filter.</h2><p>The image system pairs deep blacks and cool cyan with restrained vermilion. Wet surfaces, window frames and long exposures repeat the grid in-camera. Every image used by the site was created specifically for this concept with OpenAI image generation; the source and portfolio-use status are documented in the repository’s image ledger.</p><div className="art-strip">{[IMAGES.hero,IMAGES.city,IMAGES.fashion,IMAGES.music].map((src,i)=><EditorialImage key={src} src={src} loading="lazy" sizes="(max-width:800px) 50vw, 25vw" alt={[imageAlts[src],imageAlts[src],imageAlts[src],imageAlts[src]][i]}/>)}</div></div></section>
  <section className="case-section case-product"><div className="case-label">04 / Product</div><div className="case-copy"><h2>One system, from index to essay.</h2><p>Navigation behaves as a compact publication index on desktop and a full-screen contents page on mobile. Article pages combine an oversized title, byline system, gallery, long-form reading column and a next-story handoff.</p><div className="ui-frame nav-frame"><div className="mini-nav"><b>OFF<span>//</span>RECORD</b><span>Latest&nbsp;&nbsp; Culture&nbsp;&nbsp; Fashion&nbsp;&nbsp; Music&nbsp;&nbsp; Art</span><i>Issue 01 ↗</i></div></div><Link to="/article/the-city-after-2am" className="case-article-card"><EditorialImage src={IMAGES.city} loading="lazy" alt={imageAlts[IMAGES.city]}/><div><span>Article 001 / Culture</span><strong>The City After 2AM</strong><p>Open the complete article page ↗</p></div></Link></div></section>
  <section className="case-section case-responsive"><div className="case-label">05 / Responsive</div><div className="case-copy"><h2>One broadcast, recomposed.</h2><p>Desktop uses paired panels and wide story rows. Mobile deliberately changes the sequence, turns navigation into a full-screen channel list, expands tap targets and lets every image breathe before the next block of information.</p><div className="device-row"><div className="device desktop-device"><div className="device-bar"/><EditorialImage src={IMAGES.hero} alt="Desktop layout preview using the After Dark hero artwork"/><span>1440 / paired panels</span></div><div className="device tablet-device"><div className="device-bar"/><EditorialImage src={IMAGES.city} alt="Tablet article layout preview"/><span>768 / stacked grid</span></div><div className="device phone-device"><div className="device-bar"/><EditorialImage src={IMAGES.fashion} alt="Mobile layout preview"/><span>375 / vertical signal</span></div></div></div></section>
  <section className="case-outcome"><span>Outcome / Live prototype</span><h2>Eight stories.<br/>Sixteen routes.<br/><em>One invented night.</em></h2><div><Link to="/">Explore the publication ↗</Link><Link to="/article/the-city-after-2am">Read the lead article ↗</Link></div></section>
  </main><Footer/></>}

function NotFound(){return <><Header/><main id="main-content" tabIndex={-1} className="not-found"><span>Error / 404</span><h1>OFF<br/><em>the record.</em></h1><p>This page left before sunrise.</p><Link to="/">Return home ↗</Link></main><Footer/></>}

function App(){
  const [path,setPath]=useState(location.pathname.replace(/\/+$/, '') || '/');
  const initial=useRef(true);
  useEffect(()=>{
    const h=()=>setPath(location.pathname.replace(/\/+$/, '') || '/');
    addEventListener('popstate',h);
    return()=>removeEventListener('popstate',h);
  },[]);
  const story=stories.find(s=>path===`/article/${s.slug}`);
  const category=['culture','fashion','music','art'].find(c=>path===`/category/${c}`);
  const title=story?.title || (category?category[0].toUpperCase()+category.slice(1):({'/':'After Dark','/latest':'Latest stories','/about':'About the publication','/case-study':'Case study','/issues/01':'Issue 01 — After Dark'}[path]||'Page not found'));
  useEffect(()=>{
    document.title=`${title} — OFF//RECORD`;
    const description=story?.blurb||'A fictional editorial concept for culture, fashion, music and art. Issue 01: After Dark.';
    document.querySelector('meta[name="description"]').content=description;
    document.querySelector('meta[property="og:title"]').content=document.title;
    document.querySelector('meta[property="og:description"]').content=description;
    document.querySelector('meta[property="og:image"]').content=new URL(story?.image||IMAGES.hero,location.origin).href;
    const canonical=document.querySelector('link[rel="canonical"]');
    if(canonical)canonical.href=new URL(path,location.origin).href;
    const ogUrl=document.querySelector('meta[property="og:url"]');
    if(ogUrl)ogUrl.content=new URL(path,location.origin).href;
    const ogType=document.querySelector('meta[property="og:type"]');
    if(ogType)ogType.content=story?'article':'website';
    if(!initial.current)document.getElementById('main-content')?.focus({preventScroll:true});
    initial.current=false;
  },[path,title,story]);
  let page;
  if(path==='/')page=<Home/>;
  else if(path==='/latest')page=<Latest/>;
  else if(path==='/issues/01')page=<Issue/>;
  else if(path==='/about')page=<About/>;
  else if(path==='/case-study')page=<CaseStudy/>;
  else if(story)page=<Article slug={story.slug}/>;
  else if(category)page=<Category name={category}/>;
  else page=<NotFound/>;
  return <div className="page-transition" key={path}>{page}<div className="route-announcer sr-only" role="status">{title}</div></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
