'use client';

import { useEffect, useState } from 'react';

export type SceneQuality = 'desktop'|'mobile'|'low';

export function useSceneQuality(){
  const [quality,setQuality]=useState<SceneQuality>('desktop');

  useEffect(()=>{
    const update=()=>{
      const mobile=matchMedia('(max-width: 760px)').matches;
      const cores=navigator.hardwareConcurrency || 4;
      const memory=(navigator as Navigator & {deviceMemory?:number}).deviceMemory || 4;
      const low=cores<=4 || memory<=4;
      setQuality(low?'low':mobile?'mobile':'desktop');
    };
    update();
    addEventListener('resize',update);
    return()=>removeEventListener('resize',update);
  },[]);

  return quality;
}
