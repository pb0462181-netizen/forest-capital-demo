'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { sceneConfig } from '@/data/scene';
import { RealHouseModel } from './RealHouseModel';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) =>
  clamp01((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);

function FadeBox({
  args,
  position,
  color,
  opacity = 1,
  roughness = 0.72,
  metalness = 0,
}: {
  args: [number, number, number];
  position: [number, number, number];
  color: string;
  opacity?: number;
  roughness?: number;
  metalness?: number;
}) {
  if (opacity <= 0.01) return null;

  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function PlaceholderHouse({
  progress,
}: {
  progress: number;
}) {
  const root = useRef<THREE.Group>(null);

  const reveal = smooth(range(progress, 0.0, 0.08));
  const build = smooth(range(progress, 0.18, 0.62));
  const engineering = smooth(range(progress, 0.56, 0.73));
  const interior = smooth(range(progress, 0.68, 0.88));
  const finale = smooth(range(progress, 0.82, 1));

  useFrame(() => {
    if (!root.current) return;

    root.current.position.y = THREE.MathUtils.lerp(
      -0.08,
      0,
      reveal
    );

    root.current.rotation.y = THREE.MathUtils.lerp(
      -0.08,
      0.02,
      progress
    );
  });

  const slab = Math.max(0.86, smooth(range(build, 0.0, 0.12)));
  const walls = Math.max(0.94, smooth(range(build, 0.08, 0.34)));
  const roof = Math.max(0.92, smooth(range(build, 0.26, 0.48)));
  const glazing = Math.max(0.94, smooth(range(build, 0.38, 0.6)));
  const facade = Math.max(0.88, smooth(range(build, 0.48, 0.78)));
  const landscape = Math.max(0.72, smooth(range(build, 0.68, 1)));

  const warm = 0.28 + interior * 0.72 + finale * 0.55;

  return (
    <group
      ref={root}
      position={[0, 0, 0]}
      scale={1.08}
    >
      <FadeBox
        args={[9.7, 0.18, 6]}
        position={[-0.2, -0.09, 0]}
        color="#77766f"
        opacity={slab}
      />

      <FadeBox
        args={[8.9, 0.38, 5.35]}
        position={[-0.2, 0.12, 0]}
        color="#aaa79f"
        opacity={slab}
      />

      <FadeBox
        args={[5.4, 2.65, 4.65]}
        position={[-1.95, 1.5, -0.15]}
        color="#202722"
        opacity={walls}
      />

      <FadeBox
        args={[3.65, 2.35, 3.45]}
        position={[2.55, 1.34, -0.72]}
        color="#d4cfc4"
        opacity={walls}
      />

      <FadeBox
        args={[2.6, 2.25, 2.65]}
        position={[2.95, 1.29, 2.08]}
        color="#26372F"
        opacity={walls}
      />

      <FadeBox
        args={[6.15, 0.18, 5.25]}
        position={[-1.78, 2.9, -0.12]}
        color="#141815"
        opacity={roof}
        roughness={0.45}
      />

      <FadeBox
        args={[4.35, 0.17, 4.05]}
        position={[2.48, 2.63, -0.63]}
        color="#151916"
        opacity={roof}
        roughness={0.45}
      />

      <FadeBox
        args={[3.25, 0.15, 3.25]}
        position={[2.92, 2.51, 2.06]}
        color="#151916"
        opacity={roof}
        roughness={0.45}
      />

      <FadeBox
        args={[4.25, 2.02, 0.055]}
        position={[-1.25, 1.49, 2.2]}
        color="#6f8986"
        opacity={glazing * 0.8}
        roughness={0.1}
        metalness={0.05}
      />

      <FadeBox
        args={[2.35, 1.82, 0.05]}
        position={[2.55, 1.42, 1.02]}
        color="#738d89"
        opacity={glazing * 0.78}
        roughness={0.1}
      />

      <FadeBox
        args={[0.055, 1.82, 2.1]}
        position={[4.38, 1.42, -0.5]}
        color="#738d89"
        opacity={glazing * 0.76}
        roughness={0.1}
      />

      <FadeBox
        args={[0.2, 2.22, 3.18]}
        position={[0.98, 1.38, 1.15]}
        color="#9b744f"
        opacity={facade}
      />

      <FadeBox
        args={[1.2, 2.2, 0.12]}
        position={[3.55, 1.38, 2.76]}
        color="#9b744f"
        opacity={facade}
      />

      {[-3.9, -3.45, -3.0, -2.55].map((x) => (
        <FadeBox
          key={x}
          args={[0.13, 2.22, 0.15]}
          position={[x, 1.38, 2.27]}
          color="#9b744f"
          opacity={facade}
        />
      ))}

      <FadeBox
        args={[7.15, 0.13, 2.8]}
        position={[-0.25, 0.08, 3.58]}
        color="#715b47"
        opacity={landscape}
      />

      <FadeBox
        args={[4.3, 0.1, 0.58]}
        position={[-0.35, -0.02, 5.18]}
        color="#77736c"
        opacity={landscape}
      />

      <FadeBox
        args={[3.2, 0.08, 0.42]}
        position={[-0.35, -0.09, 5.65]}
        color="#77736c"
        opacity={landscape}
      />

      <FadeBox
        args={[2.2, 0.22, 0.75]}
        position={[-4.7, 0.11, 3.55]}
        color="#35483b"
        opacity={landscape}
      />

      <FadeBox
        args={[1.8, 0.18, 0.65]}
        position={[4.7, 0.09, 3.25]}
        color="#35483b"
        opacity={landscape}
      />

      <group visible={engineering > 0.02}>
        <FadeBox
          args={[5.3, 0.035, 0.035]}
          position={[-0.2, 0.48, 0.1]}
          color="#c99f62"
          opacity={engineering}
        />

        <FadeBox
          args={[0.035, 1.7, 0.035]}
          position={[-2.8, 1.28, 0.1]}
          color="#c99f62"
          opacity={engineering}
        />

        <FadeBox
          args={[4.4, 0.025, 0.025]}
          position={[-0.15, 0.72, -0.5]}
          color="#86a6b7"
          opacity={engineering}
        />

        <FadeBox
          args={[0.025, 1.25, 0.025]}
          position={[2.05, 1.28, -0.5]}
          color="#86a6b7"
          opacity={engineering}
        />

        <FadeBox
          args={[4.6, 0.022, 0.022]}
          position={[-0.15, 1.78, 0.18]}
          color="#d5ba70"
          opacity={engineering}
        />
      </group>

      <group visible={interior > 0.02}>
        <FadeBox
          args={[3, 0.09, 1]}
          position={[-0.8, 0.53, 1.28]}
          color="#6f5844"
          opacity={interior}
        />

        <FadeBox
          args={[1.55, 0.72, 0.68]}
          position={[-2.1, 0.52, 0.82]}
          color="#d1c8b9"
          opacity={interior}
        />

        <FadeBox
          args={[1.45, 0.07, 0.88]}
          position={[0.15, 0.85, 0.75]}
          color="#a9a095"
          opacity={interior}
        />

        <FadeBox
          args={[0.95, 1.95, 0.08]}
          position={[2.85, 1.34, 0.96]}
          color="#6d5b4d"
          opacity={interior}
        />
      </group>

      <pointLight
        position={[-1.2, 2.0, 2.3]}
        intensity={2.6 * warm}
        color="#ffd09a"
        distance={8}
      />

      <pointLight
        position={[2.8, 1.9, 1.6]}
        intensity={2.1 * warm}
        color="#ffc47d"
        distance={6}
      />

      <pointLight
        position={[-4.1, 0.55, 2.8]}
        intensity={1.0 + 1.4 * finale}
        color="#e9b16e"
        distance={4.5}
      />

      <pointLight
        position={[4, 0.55, 2.4]}
        intensity={0.8 + 1.2 * finale}
        color="#e9b16e"
        distance={4.5}
      />
    </group>
  );
}

function Trees({
  count,
}: {
  count: number;
}) {
  const items = useMemo(() => {
    const safeCount = Math.max(10, Math.floor(count * 0.72));

    return Array.from({ length: safeCount }, (_, i) => {
      const a = i * 2.399963229728653;
      const radius = 12 + (i % 8) * 1.35;

      return {
        x: Math.cos(a) * radius,
        z: Math.sin(a) * radius - 4.5,
        s: 0.64 + (i % 5) * 0.12,
        id: i,
      };
    }).filter((t) => {
      const centerClear =
        Math.abs(t.x) < 6.6 &&
        t.z > -1 &&
        t.z < 8;

      return !centerClear;
    });
  }, [count]);

  return (
    <>
      {items.map((t) => (
        <group
          key={t.id}
          position={[t.x, 0, t.z]}
          scale={t.s}
        >
          <mesh position={[0, 1.05, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.12, 2.1, 7]} />
            <meshStandardMaterial
              color="#443a31"
              roughness={1}
            />
          </mesh>

          <mesh position={[0, 2.45, 0]} castShadow>
            <coneGeometry args={[0.78, 2.5, 8]} />
            <meshStandardMaterial
              color="#1b2c23"
              roughness={1}
            />
          </mesh>

          <mesh position={[0, 3.25, 0]} castShadow>
            <coneGeometry args={[0.58, 1.95, 8]} />
            <meshStandardMaterial
              color="#203429"
              roughness={1}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function ConstructionSite({
  progress,
}: {
  progress: number;
}) {
  const visibility = smooth(range(progress, 0.22, 0.44));

  if (visibility <= 0.01) return null;

  return (
    <group>
      {[
        [-4.8, 0, 4.2],
        [4.9, 0, 4.5],
        [-4.6, 0, -4.4],
        [4.7, 0, -4.2],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
        >
          <cylinderGeometry args={[0.045, 0.045, 2.7, 8]} />
          <meshStandardMaterial
            color="#77736d"
            transparent
            opacity={visibility * 0.35}
          />
        </mesh>
      ))}

      <mesh
        position={[0, 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[11, 7]} />
        <meshStandardMaterial
          color="#777268"
          transparent
          opacity={visibility * 0.16}
        />
      </mesh>
    </group>
  );
}

function CameraRig({
  progress,
  reduced,
  quality,
}: {
  progress: number;
  reduced: boolean;
  quality: 'desktop' | 'mobile' | 'low';
}) {
  useFrame(({ camera }) => {
    const p = reduced ? 0 : progress;

    if (quality !== 'desktop' && p < 0.14) {
      const mobileIntro = new THREE.Vector3(8.4, 4.4, 11.6);
      const mobileTarget = new THREE.Vector3(0.4, 1.4, 0.7);

      camera.position.lerp(
        mobileIntro,
        reduced ? 1 : 0.075
      );
      camera.lookAt(mobileTarget);
      return;
    }

    if (quality === 'desktop' && p < 0.12) {
      const desktopIntro = new THREE.Vector3(10.8, 4.9, 13.8);
      const desktopTarget = new THREE.Vector3(0.3, 1.35, 0.6);

      camera.position.lerp(
        desktopIntro,
        reduced ? 1 : 0.06
      );
      camera.lookAt(desktopTarget);
      return;
    }

    const path = sceneConfig.cameraPath;

    let a = path[0];
    let b = path[path.length - 1];

    for (let i = 0; i < path.length - 1; i++) {
      if (
        p >= path[i].p &&
        p <= path[i + 1].p
      ) {
        a = path[i];
        b = path[i + 1];
        break;
      }
    }

    const span = Math.max(0.0001, b.p - a.p);
    const t = smooth(clamp01((p - a.p) / span));

    const desired = new THREE.Vector3(
      ...a.position
    ).lerp(
      new THREE.Vector3(...b.position),
      t
    );

    const target = new THREE.Vector3(
      ...a.target
    ).lerp(
      new THREE.Vector3(...b.target),
      t
    );

    camera.position.lerp(
      desired,
      reduced ? 1 : 0.055
    );

    camera.lookAt(target);
  });

  return null;
}

export function HouseScene({
  progress,
  reduced,
  quality = 'desktop',
}: {
  progress: number;
  reduced: boolean;
  quality?: 'desktop' | 'mobile' | 'low';
}) {
  const q = sceneConfig.quality[quality];

  const evening = smooth(range(progress, 0.82, 1));
  const morning = 1 - evening;
  const useMobileAsset = quality !== 'desktop';

  const background =
    evening > 0.5
      ? '#161b17'
      : '#304238';

  const fogColor =
    evening > 0.5
      ? '#161b17'
      : '#304238';

  return (
    <>
      <color attach="background" args={[background]} />

      <fog
        attach="fog"
        args={[fogColor, 16, 44]}
      />

      <ambientLight
        intensity={0.82 + morning * 0.45}
      />

      <hemisphereLight
        intensity={1.45}
        color="#e1e9e1"
        groundColor="#253229"
      />

      <directionalLight
        position={[-8, 12, 9]}
        intensity={2.55 - evening * 0.65}
        color={
          evening > 0.4
            ? '#ffd09a'
            : '#fff4df'
        }
        castShadow={q.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight
        position={[8, 6, -5]}
        intensity={0.55}
        color="#a9c1b0"
      />

      <pointLight
        position={[5, 3, 4]}
        intensity={0.7 + evening * 2.3}
        color="#ffbd74"
        distance={11}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={q.shadows}
      >
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial
          color="#2a3b31"
          roughness={1}
        />
      </mesh>

      <Trees count={q.treeCount} />

      <ConstructionSite
        progress={progress}
      />

      {sceneConfig.usePlaceholder ? (
        <PlaceholderHouse
          progress={progress}
        />
      ) : (
        <RealHouseModel
          mobile={useMobileAsset}
        />
      )}

      <CameraRig
        progress={progress}
        reduced={reduced}
        quality={quality}
      />
    </>
  );
  }
