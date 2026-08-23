'use client';
import { useEffect, useState } from 'react';

const KEY='forest_reduce_motion';

export function MotionControls(){
  const [reduced,setReduced]=useState(false);

  useEffect(()=>{
    const explicit=localStorage.getItem(KEY);
    const system=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const value=explicit===null?system:explicit==='1';
    setReduced(value);
    document.documentElement.dataset.motion=value?'reduced':'full';
  },[]);

  function toggle(){
    const next=!reduced;
    setReduced(next);
    localStorage.setItem(KEY,next?'1':'0');
    document.documentElement.dataset.motion=next?'reduced':'full';
    dispatchEvent(new CustomEvent('forest-motion-change',{detail:{reduced:next}}));
  }

  return <button className="motion" onClick={toggle} aria-pressed={reduced}>
    {reduced?'Включить анимацию':'Упростить анимацию'}
    <style jsx>{`
      .motion{position:fixed;z-index:45;right:18px;bottom:18px;border:1px solid var(--line);border-radius:999px;
        background:rgba(17,19,16,.72);backdrop-filter:blur(12px);color:#f2f0ea;padding:10px 13px;font-size:11px}
      @media(max-width:700px){.motion{right:12px;bottom:12px;font-size:10px}}
    `}</style>
  </button>;
}
