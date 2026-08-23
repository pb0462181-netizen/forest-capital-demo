'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { HouseScene } from './3d/HouseScene';
import { heroSteps } from '@/data/site';
import { sceneConfig } from '@/data/scene';
import { trackEvent } from './ConsentAnalytics';
import { useSceneQuality } from './3d/useSceneQuality';
import { sceneConfig } from '@/data/scene';

function canUseWebGL(){
  try{
    const c=document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  }catch{return false}
}

export function HeroExperience(){
  const ref=useRef<HTMLElement>(null);
  const [progress,setProgress]=useState(0);
  const [reduced,setReduced]=useState(false);
  const [webgl,setWebgl]=useState(true);
  const quality=useSceneQuality();
  const milestones=useRef(new Set<number>());

  useEffect(()=>{
    const system=matchMedia('(prefers-reduced-motion: reduce)');

    const applyMotion=()=>{
      const explicit=localStorage.getItem('forest_reduce_motion');
      setReduced(explicit===null ? system.matches : explicit==='1');
    };

    const onCustom=(e:Event)=>{
      const detail=(e as CustomEvent<{reduced:boolean}>).detail;
      if(detail) setReduced(detail.reduced);
    };

    applyMotion();
    setWebgl(canUseWebGL());
    system.addEventListener('change',applyMotion);
    addEventListener('forest-motion-change',onCustom);

    const onScroll=()=>{
      const el=ref.current;
      if(!el) return;
      const rect=el.getBoundingClientRect();
      const travel=Math.max(1,el.offsetHeight-innerHeight);
      const p=Math.min(1,Math.max(0,-rect.top/travel));
      setProgress(p);

      [25,50,75,100].forEach(mark=>{
        if(p*100>=mark && !milestones.current.has(mark)){
          milestones.current.add(mark);
          trackEvent(`hero_3d_${mark}`);
        }
      });
    };

    onScroll();
    addEventListener('scroll',onScroll,{passive:true});
    return()=>{
      removeEventListener('scroll',onScroll);
      system.removeEventListener('change',applyMotion);
      removeEventListener('forest-motion-change',onCustom);
    };
  },[]);

  const idx=Math.min(heroSteps.length-1,Math.floor(Math.min(.9999,progress)*heroSteps.length));
  const step=heroSteps[idx];

  const label=useMemo(
    ()=>sceneConfig.labels.reduce<string|undefined>((acc,item)=>progress>=item.p?item.text:acc,undefined),
    [progress]
  );

  const sceneProgress=reduced ? Math.min(progress,.16) : progress;

  return <section ref={ref} id="top" className="experience">
    <div className="sticky">
      <div className="canvas" onPointerDown={()=>trackEvent('hero_3d_interaction')}>
        {webgl
          ? <Suspense fallback={<div className="poster loading" aria-hidden="true"/>}>
              <Canvas
                dpr={reduced ? 1 : sceneConfig.quality[quality].dpr}
                shadows={!reduced && sceneConfig.quality[quality].shadows}
                gl={{antialias:quality!=='low',powerPreference:'high-performance'}}
                camera={{fov:42,near:.1,far:150}}
              >
                <HouseScene progress={sceneProgress} reduced={reduced} quality={quality}/>
              </Canvas>
            </Suspense>
          : <div className="poster fallback" role="img" aria-label="Атмосферная визуализация загородного дома FOREST capital"/>
        }
      </div>

      <div className="shade"/>

      <div className="story">
        <div className="eyebrow">{step.eyebrow}</div>
        <h1>{idx===0
          ? 'Строительство загородных домов комфорт+ и бизнес-класса в Екатеринбурге'
          : step.title}</h1>
        <p>{idx===0
          ? 'Проектируем, строим и полностью оснащаем дома для жизни в Екатеринбурге и Свердловской области.'
          : step.body}</p>

        {label && idx>0 && <div className="label">{label}</div>}

        <div className="actions">
          <a className="button primary" href="#contact">
            {idx===5?'Получить консультацию архитектора':'Обсудить будущий дом'}
          </a>
          <a className="button" href="#projects">Смотреть проекты</a>
        </div>

        <div className="scrollCue">
          <span/>
          <div><b>{Math.round(progress*100)}%</b><small>Листайте, чтобы увидеть, как создаётся дом</small></div>
        </div>
      </div>

      <div className="chapters" aria-label="Этапы 3D-истории">
        {heroSteps.map((s,i)=><div key={s.id} className={`chapter ${i===idx?'active':''} ${i<idx?'done':''}`}>
          <i/><span>{String(i+1).padStart(2,'0')}</span>
        </div>)}
      </div>

      <div className="notice">DEMO · авторский дом в стилистике современного портфолио · не копия FOREST 170</div>
    </div>

    <style jsx>{`
      .experience{height:520vh}.sticky{position:sticky;top:0;height:100vh;overflow:hidden;background:#111310}
      .canvas,.poster,.shade{position:absolute;inset:0}.canvas{touch-action:pan-y}
      .poster{background:radial-gradient(circle at 70% 35%,#586b5e,#26372F 42%,#111310 85%)}
      .poster.loading:after{content:"Загрузка 3D";position:absolute;right:5vw;bottom:7vh;font-size:10px;letter-spacing:.15em;text-transform:uppercase}
      .shade{pointer-events:none;background:linear-gradient(90deg,rgba(17,19,16,.91),rgba(17,19,16,.24) 60%,rgba(17,19,16,.08)),
        linear-gradient(0deg,rgba(17,19,16,.72),transparent 52%)}
      .story{position:absolute;z-index:4;left:5vw;top:50%;transform:translateY(-45%);max-width:820px}
      .story h1{font-family:var(--font-prata);font-weight:400;font-size:clamp(42px,6.25vw,90px);line-height:.96;margin:12px 0 20px;max-width:900px}
      .story p{font-size:clamp(16px,1.6vw,21px);line-height:1.55;max-width:680px;color:#f2f0ea}
      .label{display:inline-flex;margin-top:14px;padding:9px 13px;border:1px solid rgba(170,139,88,.58);border-radius:999px;color:#e3cfaa;background:rgba(17,19,16,.45);font-size:12px}
      .actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:25px}
      .scrollCue{margin-top:28px;display:flex;gap:11px;align-items:center;color:#D8D3C8}
      .scrollCue>span{width:42px;height:1px;background:#AA8B58}.scrollCue div{display:flex;gap:10px;align-items:baseline}
      .scrollCue b{font-size:12px;color:#AA8B58}.scrollCue small{font-size:10px;letter-spacing:.08em;text-transform:uppercase}
      .chapters{position:absolute;z-index:5;right:26px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px}
      .chapter{display:flex;align-items:center;gap:8px;color:#a9a59c;font-size:9px}.chapter i{display:block;width:3px;height:26px;border-radius:10px;background:rgba(255,255,255,.18);transition:.25s}
      .chapter.active i,.chapter.done i{background:#AA8B58}.chapter.active span{color:white}
      .notice{position:absolute;z-index:4;right:26px;bottom:22px;font-size:9px;color:#aaa69e;letter-spacing:.06em;text-align:right}
      @media(max-width:760px){
        .experience{height:430vh}.story{left:20px;right:20px;top:auto;bottom:12vh;transform:none}
        .story h1{font-size:clamp(38px,11.5vw,58px);line-height:.98}.story p{font-size:14px}
        .scrollCue small{max-width:210px;display:block}.chapters{right:10px}.notice{display:none}
        .shade{background:linear-gradient(0deg,rgba(17,19,16,.90),rgba(17,19,16,.18) 70%)}
      }
      @media(prefers-reduced-motion:reduce){.experience{height:180vh}}
    `}</style>
  </section>;
}
