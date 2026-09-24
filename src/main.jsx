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
  const nav = ['Latest', 'Culture', 'Fashion', 'Music', 'Art'];
  const destination = x => x === 'Latest' ? '/latest' : `/category/${x.toLowerCase()}`;
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
      <Link to="/" className="wordmark" onClick={()=>setOpen(false)}>OFF<span>//</span>RECORD</Link>
      <nav className="desktop-nav" aria-label="Primary">
        {nav.map(x=><Link key={x} to={destination(x)} aria-current={location.pathname === destination(x) ? 'page' : undefined}>{x}</Link>)}
      </nav>
      <Link to="/issues/01" className="issue-link">Issue 01 <span>↗</span></Link>
      <button ref={buttonRef} className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?'Close ×':'Menu +'}</button>
    </header>
    {open && <nav ref={menuRef} id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
      <div className="mobile-menu-count">OFF//RECORD / Index</div>
      {nav.map((x,i)=><Link key={x} to={destination(x)} onClick={()=>setOpen(false)}><sup>0{i+1}</sup>{x}</Link>)}
      <Link to="/issues/01" onClick={()=>setOpen(false)}>Issue 01 ↗</Link>
      <Link to="/about" onClick={()=>setOpen(false)} className="mobile-about">About the publication ↗</Link>
    </nav>}
  </>;
}

function Footer(){ return <footer>
  <div><Link to="/" className="wordmark footer-mark">OFF<span>//</span>RECORD</Link><p>Independent publication about culture<br/>while it’s still happening.</p></div>
  <nav className="footer-links" aria-label="Footer"><Link to="/latest">Latest stories</Link><Link to="/issues/01">Issue 01</Link><Link to="/about">About / Contributors</Link><a href="#top">Back to top ↑</a></nav>
  <div className="footer-meta"><span>ALMATY / WORLDWIDE</span><span>FICTIONAL EDITORIAL PROJECT · 2026</span></div>
</footer> }

function Hero(){ return <section className="hero">
  <EditorialImage src={IMAGES.hero} fetchPriority="high" alt="A figure looks across a green-lit city skyline at night" />
  <div className="hero-shade" />
  <div className="hero-kicker"><span>Independent culture magazine</span><span>September 2026</span></div>
  <h1><span>After</span><span className="outline">Dark</span></h1>
  <div className="hero-bottom"><div><span>Issue</span><strong>01</strong></div><p>The hours between the last train<br/>and the first light.</p><a href="#lead">Explore the issue <b>↓</b></a></div>
</section> }

function Marquee(){const [paused,setPaused]=useState(false);return <div className="marquee" aria-label="Issue themes"><div style={{animationPlayState:paused?'paused':undefined}}>Nightlife&nbsp; ✳ &nbsp;Music&nbsp; ✳ &nbsp;Fashion&nbsp; ✳ &nbsp;Photography&nbsp; ✳ &nbsp;The city after hours&nbsp; ✳ &nbsp;Nightlife&nbsp; ✳ &nbsp;Music&nbsp; ✳ &nbsp;Fashion&nbsp; ✳ &nbsp;</div><button aria-label={paused?'Play ticker':'Pause ticker'} onClick={()=>setPaused(!paused)}>{paused?'▶':'Ⅱ'}</button></div>}

function LeadStory(){return <section className="lead" id="lead">
  <div className="section-label"><span>Lead story</span><span>001—008</span></div>
  <div className="lead-grid">
    <button className="lead-image image-button" onClick={()=>go('/article/the-city-after-2am')} aria-label="Read The City After 2AM"><EditorialImage loading="lazy" src={IMAGES.city} alt="A double-exposed portrait layered over a city at night"/><span>Open story ↗</span></button>
    <div className="lead-copy"><div className="eyebrow">Culture / Essay / {stories[0].read}</div><h2>The City<br/><em>After</em> 2AM</h2><p>The city changes character somewhere between the last train and the first bus. An imagined walk through the hours that daylight tends to overlook.</p><Link to="/article/the-city-after-2am" className="text-link">Read story <span>↗</span></Link></div>
  </div>
</section>}

function EditorialGrid(){return <section className="editorial-grid">
  <article className="feature fashion-feature"><div className="feature-num">02 / Fashion</div><Link to="/article/clothes-made-for-disappearing"><EditorialImage loading="lazy" src={IMAGES.fashion} alt="Three cinematic portraits against blurred city lights"/></Link><h3><Link to="/article/clothes-made-for-disappearing">Clothes Made<br/>for Disappearing</Link></h3><p>Night dressing as camouflage, refusal and private ritual.</p></article>
  <div className="interlude"><span>“</span><p>The night does not hide the city. It reveals who the city was made to hide.</p><small>— Mira Vale, contributing editor</small></div>
  <article className="feature music-feature"><div className="feature-num">03 / Music</div><Link to="/article/bedroom-producers"><EditorialImage loading="lazy" src={IMAGES.music} alt="Friends sitting in a red-lit window against a blue building"/></Link><h3><Link to="/article/bedroom-producers">Bedroom Producers Are Building the New Underground</Link></h3><Link to="/article/bedroom-producers" className="circle-link" aria-label="Read story">↗</Link></article>
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
    <div className="index-head"><h2>{title}</h2><p>{description}</p></div>
    <div className="index-rows">
      {items.map(s=><Link key={s.id} to={`/article/${s.slug}`} className="index-row" onPointerEnter={()=>setActive(s)} onFocus={()=>setActive(s)} onBlur={()=>setActive(null)}>
        <span>{s.id}</span><EditorialImage className="index-thumb" sizes="65px" src={s.image} loading="lazy" alt=""/><strong>{s.title}</strong><span className="index-category">{s.category}</span><span aria-hidden="true">↗</span>
      </Link>)}
    </div>
    {active && <EditorialImage className="follow-image" sizes="240px" src={active.image} alt=""/>}
  </section>;
}

function ClosingImage(){return <section className="closing-image"><EditorialImage loading="lazy" src={IMAGES.dance} alt="A running figure beneath a projected red portrait at night"/><div className="closing-copy"><span>004 / Culture</span><h2>The death of<br/><em>the dance floor</em></h2><Link to="/article/death-of-the-dance-floor">Read the essay ↗</Link></div><div className="vertical-caption">ISSUE 01 / AFTER DARK / 2026</div></section>}

function Home(){ return <><Header/><main id="main-content" tabIndex={-1}><Hero/><Marquee/><LeadStory/><EditorialGrid/><StoryIndex/><ClosingImage/><section className="next-issue"><span>Next issue</span><div><strong>02</strong><h2>Theme to be announced.</h2><span>Winter 2026</span></div></section></main><Footer/></> }

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

function About(){return <><Header/><main id="main-content" tabIndex={-1} className="about-page"><div className="about-kicker">About / Est. 2026</div><h1>OFF//RECORD IS AN<br/>INDEPENDENT PUBLICATION<br/>ABOUT CULTURE <em>WHILE</em><br/>IT’S STILL HAPPENING.</h1><div className="about-grid"><p>We are interested in unfinished ideas, marginal spaces and the people building culture before it has a name. Fashion as a private language. Music before the release. Art outside the frame.</p><div><span>Based</span><strong>Almaty / Worldwide</strong><span>Issue 01</span><strong>After Dark / September 2026</strong><span>Format</span><strong>Independent digital magazine</strong></div></div><section className="contributors"><span className="eyebrow">The imagined masthead</span><h2>A few different<br/><em>points of view.</em></h2>{[['Mira Vale','Culture / Editor'],['Lea Arden','Fashion & Art'],['Jules Park','Music'],['Orin North','Visual notebooks']].map(([name,role])=><div key={name}><strong>{name}</strong><span>{role}</span></div>)}<p>OFF//RECORD is a fictional publication created as an independent design and development project. All writing is original; contributors are fictional. The images supplied with the project establish its visual direction and are not credited as commissioned photography. Submissions are not currently open.</p></section><section className="submit"><span>Start with the hours in between.</span><Link to="/issues/01">Read Issue 01 <b>↗</b></Link></section></main><Footer/></>}

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
  const title=story?.title || (category?category[0].toUpperCase()+category.slice(1):({'/':'After Dark','/latest':'Latest stories','/about':'About the publication','/issues/01':'Issue 01 — After Dark'}[path]||'Page not found'));
  useEffect(()=>{
    document.title=`${title} — OFF//RECORD`;
    const description=story?.blurb||'Independent culture, fashion, music and art. Issue 01: After Dark.';
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
  else if(story)page=<Article slug={story.slug}/>;
  else if(category)page=<Category name={category}/>;
  else page=<NotFound/>;
  return <div className="page-transition" key={path}>{page}<div className="route-announcer sr-only" role="status">{title}</div></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
