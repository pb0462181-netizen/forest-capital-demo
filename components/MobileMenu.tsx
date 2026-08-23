'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const items = [
  ['Проекты','#projects'],
  ['Реализованные дома','#portfolio'],
  ['Услуги','#services'],
  ['О компании','#company'],
  ['Демодом','#demo'],
  ['Медиа','#media'],
  ['Контакты','#contact'],
] as const;

export function MobileMenu(){
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    document.body.style.overflow=open?'hidden':'';
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false); };
    addEventListener('keydown',onKey);
    return ()=>{
      document.body.style.overflow='';
      removeEventListener('keydown',onKey);
    };
  },[open]);

  return <>
    <button className="menuButton" aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(v=>!v)}>
      <i className={open?'x':''}><span/><span/></i>
      <b>{open?'Закрыть':'Меню'}</b>
    </button>

    <div id="mobile-nav" className={`sheet ${open?'open':''}`} aria-hidden={!open}>
      <nav aria-label="Мобильная навигация">
        {items.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}
      </nav>
      <div className="bottom">
        <a className="button primary" href="#contact" onClick={()=>setOpen(false)}>Обсудить проект</a>
        <a className="phone" href={site.phoneHref}>{site.phone}</a>
      </div>
    </div>

    <style jsx>{`
      .menuButton{display:none;position:relative;z-index:91;align-items:center;gap:8px;border:1px solid var(--line);
        border-radius:999px;background:rgba(17,19,16,.62);color:white;padding:10px 13px;backdrop-filter:blur(12px)}
      .menuButton i{width:15px;height:12px;display:block;position:relative}
      .menuButton span{position:absolute;left:0;width:15px;height:1px;background:white;transition:.2s}
      .menuButton span:first-child{top:3px}.menuButton span:last-child{bottom:3px}
      .menuButton i.x span:first-child{top:6px;transform:rotate(45deg)}
      .menuButton i.x span:last-child{bottom:5px;transform:rotate(-45deg)}
      .menuButton b{font-size:11px;font-weight:500}
      .sheet{display:none}
      @media(max-width:900px){
        .menuButton{display:flex}
        .sheet{display:flex;flex-direction:column;justify-content:space-between;position:fixed;z-index:90;inset:0;
          background:radial-gradient(circle at 80% 10%,#26372f,#111310 45%);padding:104px 22px 30px;
          opacity:0;visibility:hidden;transform:translateY(-10px);transition:.3s ease}
        .sheet.open{opacity:1;visibility:visible;transform:none}
        nav{display:flex;flex-direction:column;gap:4px}
        nav a{font-family:var(--font-prata);font-size:clamp(31px,9vw,52px);line-height:1.08;letter-spacing:-.035em;
          color:#f2f0ea;text-decoration:none;padding:6px 0}
        .bottom{display:flex;flex-direction:column;gap:14px;align-items:flex-start}
        .phone{font-size:18px;text-decoration:none}
      }
    `}</style>
  </>;
}
