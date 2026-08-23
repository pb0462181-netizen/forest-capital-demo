'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { sceneConfig } from '@/data/scene';
import { RealHouseModel } from './RealHouseModel';

const clamp01=(v:number)=>Math.min(1,Math.max(0,v));
const range=(p:number,a:number,b:number)=>clamp01((p-a)/(b-a));
const smooth=(t:number)=>t*t*(3-2*t);

function FadeBox({args,position,color,opacity=1,roughness=.72,metalness=0}:{
  args:[number,number,number];
  position:[number,number,number];
  color:string;
  opacity?:number;
  roughness?:number;
  metalness?:number;
}){
  if(opacity<=.01) return null;
  return <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={args}/>
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      transparent
      opacity={opacity}
    />
  </mesh>;
}

function PlaceholderHouse({progress}:{progress:number}){
  const root=useRef<THREE.Group>(null);
  const build=smooth(range(progress,.30,.66));
  const engineering=smooth(range(progress,.57,.73));
  const interior=smooth(range(progress,.70,.88));
  const finale=smooth(range(progress,.84,1));

  useFrame(()=>{
    if(root.current) root.current.position.y=THREE.MathUtils.lerp(-.20,0,build);
  });

  const slab=smooth(range(build,.00,.14));
  const walls=smooth(range(build,.10,.40));
  const roof=smooth(range(build,.32,.57));
  const glazing=smooth(range(build,.43,.68));
  const facade=smooth(range(build,.55,.82));
  const landscape=smooth(range(build,.72,1));

  return <group ref={root}>
    {/* DEMO CONCEPT: original generic architecture, not a copy of a FOREST project. */}
    <FadeBox args={[9.7,.18,6.0]} position={[-.2,-.09,0]} color="#77766f" opacity={slab}/>
    <FadeBox args={[8.9,.38,5.35]} position={[-.2,.12,0]} color="#aaa79f" opacity={slab}/>

    {/* L-shaped one-storey volume */}
    <FadeBox args={[5.4,2.65,4.65]} position={[-1.95,1.50,-.15]} color="#202722" opacity={walls}/>
    <FadeBox args={[3.65,2.35,3.45]} position={[2.55,1.34,-.72]} color="#d4cfc4" opacity={walls}/>
    <FadeBox args={[2.6,2.25,2.65]} position={[2.95,1.29,2.08]} color="#26372F" opacity={walls}/>

    {/* deep low-profile roofs */}
    <FadeBox args={[6.15,.18,5.25]} position={[-1.78,2.90,-.12]} color="#141815" opacity={roof} roughness={.48}/>
    <FadeBox args={[4.35,.17,4.05]} position={[2.48,2.63,-.63]} color="#151916" opacity={roof} roughness={.48}/>
    <FadeBox args={[3.25,.15,3.25]} position={[2.92,2.51,2.06]} color="#151916" opacity={roof} roughness={.48}/>

    {/* panoramic living-room glass */}
    <FadeBox args={[4.25,2.02,.055]} position={[-1.25,1.49,2.20]} color="#76908d" opacity={glazing*.76} roughness={.14}/>
    <FadeBox args={[2.35,1.82,.05]} position={[2.55,1.42,1.02]} color="#78928e" opacity={glazing*.75} roughness={.14}/>
    <FadeBox args={[.055,1.82,2.10]} position={[4.38,1.42,-.50]} color="#78928e" opacity={glazing*.72} roughness={.14}/>

    {/* timber accent portal / facade rhythm */}
    <FadeBox args={[.20,2.22,3.18]} position={[.98,1.38,1.15]} color="#9b744f" opacity={facade}/>
    <FadeBox args={[1.20,2.20,.12]} position={[3.55,1.38,2.76]} color="#9b744f" opacity={facade}/>
    {[-3.9,-3.45,-3.0,-2.55].map(x=>
      <FadeBox key={x} args={[.13,2.22,.15]} position={[x,1.38,2.27]} color="#9b744f" opacity={facade}/>
    )}

    {/* terrace + steps */}
    <FadeBox args={[7.15,.13,2.80]} position={[-.25,.08,3.58]} color="#715b47" opacity={landscape}/>
    <FadeBox args={[4.3,.10,.58]} position={[-.35,-.02,5.18]} color="#77736c" opacity={landscape}/>
    <FadeBox args={[3.2,.08,.42]} position={[-.35,-.09,5.65]} color="#77736c" opacity={landscape}/>

    {/* restrained landscaping */}
    <FadeBox args={[2.2,.22,.75]} position={[-4.7,.11,3.55]} color="#35483b" opacity={landscape}/>
    <FadeBox args={[1.8,.18,.65]} position={[4.7,.09,3.25]} color="#35483b" opacity={landscape}/>

    {/* engineering reveal */}
    <group visible={engineering>.02}>
      <FadeBox args={[5.3,.035,.035]} position={[-.2,.48,.10]} color="#c99f62" opacity={engineering}/>
      <FadeBox args={[.035,1.70,.035]} position={[-2.80,1.28,.10]} color="#c99f62" opacity={engineering}/>
      <FadeBox args={[4.4,.025,.025]} position={[-.15,.72,-.50]} color="#86a6b7" opacity={engineering}/>
      <FadeBox args={[.025,1.25,.025]} position={[2.05,1.28,-.50]} color="#86a6b7" opacity={engineering}/>
      <FadeBox args={[4.6,.022,.022]} position={[-.15,1.78,.18]} color="#d5ba70" opacity={engineering}/>
    </group>

    {/* warm interior silhouette */}
    <group visible={interior>.02}>
      <FadeBox args={[3.0,.09,1.0]} position={[-.8,.53,1.28]} color="#6f5844" opacity={interior}/>
      <FadeBox args={[1.55,.72,.68]} position={[-2.1,.52,.82]} color="#d1c8b9" opacity={interior}/>
      <FadeBox args={[1.45,.07,.88]} position={[.15,.85,.75]} color="#a9a095" opacity={interior}/>
      <FadeBox args={[.95,1.95,.08]} position={[2.85,1.34,.96]} color="#6d5b4d" opacity={interior}/>
      <pointLight position={[-1.2,2.15,1.2]} intensity={2.7*interior+1.8*finale} color="#ffd09a" distance={7}/>
      <pointLight position={[2.8,1.9,.8]} intensity={1.8*interior+1.4*finale} color="#ffc47d" distance={5}/>
    </group>

    {/* architectural exterior light for finale */}
    <pointLight position={[-4.1,.55,2.8]} intensity={1.5*finale} color="#e9b16e" distance={4}/>
    <pointLight position={[4.0,.55,2.4]} intensity={1.3*finale} color="#e9b16e" distance={4}/>
  </group>;
}

function Trees({count}:{count:number}){
  const items=useMemo(()=>Array.from({length:count},(_,i)=>{
    const a=i*2.399963229728653;
    const radius=7.2+(i%9)*1.15;
    return {x:Math.cos(a)*radius,z:Math.sin(a)*radius-2.2,s:.78+(i%5)*.17,id:i};
  }).filter(t=>Math.abs(t.x)>4.8||Math.abs(t.z)>6),[count]);

  return <>{items.map(t=><group key={t.id} position={[t.x,0,t.z]} scale={t.s}>
    <mesh position={[0,1.05,0]} castShadow><cylinderGeometry args={[.07,.12,2.1,7]}/><meshStandardMaterial color="#443a31" roughness={1}/></mesh>
    <mesh position={[0,2.45,0]} castShadow><coneGeometry args={[.85,2.8,8]}/><meshStandardMaterial color="#1e3026" roughness={1}/></mesh>
    <mesh position={[0,3.35,0]} castShadow><coneGeometry args={[.65,2.15,8]}/><meshStandardMaterial color="#21372a" roughness={1}/></mesh>
  </group>)}</>;
}

function ConstructionSite({progress}:{progress:number}){
  const visibility=smooth(range(progress,.30,.48));
  if(visibility<=.01) return null;
  return <group>
    {[[-4.8,0,4.2],[4.9,0,4.5],[-4.6,0,-4.4],[4.7,0,-4.2]].map((p,i)=>
      <mesh key={i} position={p as [number,number,number]}>
        <cylinderGeometry args={[.045,.045,2.7,8]}/>
        <meshStandardMaterial color="#77736d" transparent opacity={visibility*.5}/>
      </mesh>
    )}
    <mesh position={[0,.015,0]} rotation={[-Math.PI/2,0,0]} receiveShadow>
      <planeGeometry args={[11,7]}/>
      <meshStandardMaterial color="#777268" transparent opacity={visibility*.22}/>
    </mesh>
  </group>;
}

function CameraRig({progress,reduced}:{progress:number;reduced:boolean}){
  useFrame(({camera})=>{
    const p=reduced?0:progress;
    const path=sceneConfig.cameraPath;
    let a=path[0],b=path[path.length-1];

    for(let i=0;i<path.length-1;i++){
      if(p>=path[i].p&&p<=path[i+1].p){a=path[i];b=path[i+1];break;}
    }

    const span=Math.max(.0001,b.p-a.p);
    const t=smooth(clamp01((p-a.p)/span));
    const desired=new THREE.Vector3(...a.position).lerp(new THREE.Vector3(...b.position),t);
    const target=new THREE.Vector3(...a.target).lerp(new THREE.Vector3(...b.target),t);

    camera.position.lerp(desired,reduced?1:.055);
    camera.lookAt(target);
  });
  return null;
}

export function HouseScene({
  progress,
  reduced,
  quality='desktop'
}:{
  progress:number;
  reduced:boolean;
  quality?:'desktop'|'mobile'|'low';
}){
  const q=sceneConfig.quality[quality];
  const evening=smooth(range(progress,.84,1));
  const morning=1-evening;
  const useMobileAsset=quality!=='desktop';

  return <>
    <color attach="background" args={[evening>.5?'#151812':'#26372F']}/>
    <fog attach="fog" args={[evening>.5?'#151812':'#26372F',13,38]}/>

    <ambientLight intensity={.65+morning*.48}/>
    <hemisphereLight intensity={1.25} color="#dfe8df" groundColor="#253229"/>
    <directionalLight
      position={[-7,11,8]}
      intensity={2.4-evening*.7}
      color={evening>.4?'#ffd09a':'#fff3dd'}
      castShadow={q.shadows}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
    <pointLight position={[5,3,4]} intensity={evening*2.4} color="#ffbd74" distance={10}/>

    <mesh rotation={[-Math.PI/2,0,0]} receiveShadow={q.shadows}>
      <planeGeometry args={[90,90]}/>
      <meshStandardMaterial color="#26372F" roughness={1}/>
    </mesh>

    <Trees count={q.treeCount}/>
    <ConstructionSite progress={progress}/>

    {sceneConfig.usePlaceholder
      ? <PlaceholderHouse progress={progress}/>
      : <RealHouseModel mobile={useMobileAsset}/>
    }

    <CameraRig progress={progress} reduced={reduced}/>
  </>;
}
