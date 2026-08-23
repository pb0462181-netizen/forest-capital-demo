'use client';

import { useGLTF } from '@react-three/drei';
import { sceneConfig } from '@/data/scene';

export function RealHouseModel({mobile=false}:{mobile?:boolean}){
  const path=mobile?sceneConfig.models.mobile:sceneConfig.models.desktop;
  const {scene}=useGLTF(path);
  const t=sceneConfig.modelTransform;

  return <primitive
    object={scene}
    position={t.position}
    rotation={t.rotation}
    scale={t.scale}
    castShadow
    receiveShadow
  />;
}
