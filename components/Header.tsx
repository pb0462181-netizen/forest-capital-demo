'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { MobileMenu } from './MobileMenu';

const links = [
  ['Проекты','#projects'],
  ['Реализованные дома','#portfolio'],
  ['Услуги','#services'],
  ['О компании','#company'],
  ['Демодом','#demo'],
  ['Медиа','#media'],
  ['Контакты','#contact'],
] as const;

export function Header(){
  const [compact,setCompact]=useState(false);

  useEffect(()=>{
    const update=()=>setCompact(window.scrollY>40);
    update();
    addEventListener('scroll',update,{passive:true});
    return()=>removeEventListener('scroll',update);
  },[]);

  return <header className={`hdr ${compact?'compact':''}`}>
    <a className="brand" href="#top" aria-label="FOREST capital — на главную">
      FOREST <span>capital</span>
    </a>

    <nav aria-label="Основная навигация">
      {links.map(([name,href])=><a key={href} href={href}>{name}</a>)}
    </nav>

    <div className="right">
      <a href={site.phoneHref}>{site.phone}</a>
      <a className="mini" href="#contact">Обсудить проект</a>
    </div>

    <MobileMenu/>

    <style jsx>{`
      .hdr{position:fixed;z-index:50;inset:0 0 auto;display:grid;grid-template-columns:1fr auto 1fr;
        align-items:center;padding:22px 4vw;transition:.3s;background:linear-gradient(180deg,rgba(17,19,16,.22),transparent)}
      .compact{padding:12px 4vw;background:rgba(17,19,16,.78);backdrop-filter:blur(18px);
        border-bottom:1px solid rgba(255,255,255,.08)}
      .brand{text-decoration:none;letter-spacing:.16em;font-weight:800;white-space:nowrap}
      .brand span{font-weight:400}
      .hdr nav{display:flex;gap:18px}
      .hdr nav a,.right a{font-size:11px;text-decoration:none;white-space:nowrap}
      .right{justify-self:end;display:flex;gap:14px;align-items:center}
      .mini{border:1px solid var(--line);padding:10px 13px;border-radius:999px}
      @media(max-width:1120px){.hdr nav{gap:11px}.hdr nav a{font-size:10px}.right>a:first-child{display:none}}
      @media(max-width:900px){.hdr{grid-template-columns:1fr auto;padding:18px 20px}.hdr nav,.right{display:none}}
    `}</style>
  </header>;
}
