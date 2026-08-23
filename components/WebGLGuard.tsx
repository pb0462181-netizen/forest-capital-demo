'use client';
import { ReactNode, useEffect, useState } from 'react';

function supportsWebGL(){
  try{
    const canvas=document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  }catch{return false}
}

export function WebGLGuard({children}:{children:ReactNode}){
  const [ok,setOk]=useState<boolean|null>(null);
  useEffect(()=>setOk(supportsWebGL()),[]);
  if(ok===null) return <div className="scenePoster" aria-hidden="true"/>;
  if(!ok) return <div className="scenePoster fallback" role="img" aria-label="Современный загородный дом FOREST capital среди лесного ландшафта"/>;
  return <>{children}</>;
}
