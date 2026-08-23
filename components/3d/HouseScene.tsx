'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { sceneConfig } from '@/data/scene';
import { RealHouseModel } from './RealHouseModel';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const range = (p: number, a: number, b: number) =>
  clamp01((p - a) / Math.max(0.0001, b - a));

const smooth = (t: number) =>
  t * t * (3 - 2 * t);

function Box({
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
    <mesh
      position={position}
      castShadow
      receiveShadow
    >
      <boxGeometry args={args} />

      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

function DemoHouse({
  progress,
}: {
  progress: number;
}) {
  const root = useRef<THREE.Group>(null);

  const construction = smooth(
    range(progress, 0.12, 0.58)
  );

  const engineering = smooth(
    range(progress, 0.48, 0.72)
  );

  const interior = smooth(
    range(progress, 0.66, 0.86)
  );

  const finale = smooth(
    range(progress, 0.82, 1)
  );

  useFrame(() => {
    if (!root.current) return;

    root.current.rotation.y =
      -0.02 + progress * 0.035;
  });

  const baseOpacity = 1;

  return (
    <group
      ref={root}
      position={[0, 0, 0]}
      scale={0.82}
    >
      {/* участок */}
      <Box
        args={[13.2, 0.16, 9]}
        position={[0, -0.08, 0]}
        color="#5d6059"
      />

      {/* главный темный объем */}
      <Box
        args={[6.2, 2.65, 4.6]}
        position={[-2.1, 1.42, -0.3]}
        color="#242a25"
        opacity={baseOpacity}
      />

      {/* светлый объем */}
      <Box
        args={[4, 2.4, 3.5]}
        position={[2.65, 1.3, -0.75]}
        color="#c8c4b9"
        opacity={baseOpacity}
      />

      {/* правое крыло */}
      <Box
        args={[3.15, 2.3, 3]}
        position={[2.95, 1.25, 2]}
        color="#303b33"
        opacity={baseOpacity}
      />

      {/* крыши */}
      <Box
        args={[7, 0.22, 5.3]}
        position={[-1.85, 2.85, -0.3]}
        color="#111411"
        roughness={0.4}
      />

      <Box
        args={[4.7, 0.2, 4.15]}
        position={[2.55, 2.62, -0.65]}
        color="#111411"
        roughness={0.4}
      />

      <Box
        args={[3.7, 0.18, 3.55]}
        position={[2.95, 2.48, 2]}
        color="#111411"
        roughness={0.4}
      />

      {/* большие окна главного фасада */}
      <Box
        args={[4.45, 1.92, 0.05]}
        position={[-1.45, 1.48, 2.03]}
        color="#78938f"
        opacity={0.72}
        roughness={0.08}
        metalness={0.08}
      />

      <Box
        args={[2.3, 1.72, 0.05]}
        position={[2.55, 1.4, 1]}
        color="#78938f"
        opacity={0.72}
        roughness={0.08}
      />

      {/* дерево */}
      <Box
        args={[0.22, 2.2, 3]}
        position={[0.92, 1.34, 1.25]}
        color="#9c744e"
        roughness={0.85}
      />

      <Box
        args={[1.25, 2.18, 0.14]}
        position={[3.48, 1.34, 2.63]}
        color="#9c744e"
        roughness={0.85}
      />

      {[-4.1, -3.55, -3].map((x) => (
        <Box
          key={x}
          args={[0.14, 2.12, 0.16]}
          position={[x, 1.34, 2.05]}
          color="#9c744e"
        />
      ))}

      {/* терраса */}
      <Box
        args={[7.4, 0.14, 2.8]}
        position={[-0.25, 0.08, 3.55]}
        color="#735c47"
      />

      <Box
        args={[5.2, 0.1, 0.7]}
        position={[-0.1, -0.01, 5.25]}
        color="#77746c"
      />

      {/* интерьер виден через стекло */}
      <group>
        <Box
          args={[2.6, 0.1, 0.95]}
          position={[-1, 0.52, 1.3]}
          color="#695342"
          opacity={0.8}
        />

        <Box
          args={[1.35, 0.7, 0.65]}
          position={[-2.1, 0.55, 0.9]}
          color="#d4cabc"
          opacity={0.85}
        />

        <Box
          args={[1.45, 0.08, 0.8]}
          position={[0.15, 0.83, 0.78]}
          color="#9b9389"
          opacity={0.85}
        />
      </group>

      {/* инженерные линии */}
      <group visible={engineering > 0.03}>
        <Box
          args={[4.8, 0.035, 0.035]}
          position={[-0.4, 0.46, 0.15]}
          color="#c99f62"
          opacity={engineering}
        />

        <Box
          args={[4, 0.03, 0.03]}
          position={[-0.1, 0.72, -0.45]}
          color="#85a6b7"
          opacity={engineering}
        />

        <Box
          args={[4.3, 0.025, 0.025]}
          position={[-0.1, 1.72, 0.2]}
          color="#d9be77"
          opacity={engineering}
        />
      </group>

      {/* теплый свет */}
      <pointLight
        position={[-1.5, 2.05, 2.35]}
        intensity={
          1.25 +
          interior * 1.8 +
          finale * 1.4
        }
        color="#ffd19d"
        distance={7}
      />

      <pointLight
        position={[2.7, 1.9, 1.7]}
        intensity={
          0.9 +
          interior * 1.5 +
          finale * 1.2
        }
        color="#ffc17a"
        distance={6}
      />

      <pointLight
        position={[-4, 0.45, 3]}
        intensity={0.45 + finale * 1.1}
        color="#e6aa65"
        distance={4}
      />

      {/* небольшой эффект строительства,
          но дом никогда полностью не исчезает */}
      <group
        scale={[
          1,
          0.88 + construction * 0.12,
          1,
        ]}
      />
    </group>
  );
}

function Trees({
  count,
}: {
  count: number;
}) {
  const trees = useMemo(() => {
    const amount = Math.max(
      8,
      Math.floor(count * 0.55)
    );

    return Array.from(
      { length: amount },
      (_, i) => {
        const angle =
          i * 2.399963229728653;

        const radius =
          15 + (i % 6) * 1.5;

        return {
          id: i,
          x: Math.cos(angle) * radius,
          z:
            Math.sin(angle) * radius -
            5,
          scale:
            0.6 + (i % 4) * 0.1,
        };
      }
    ).filter((tree) => {
      return !(
        Math.abs(tree.x) < 8 &&
        tree.z > -3 &&
        tree.z < 10
      );
    });
  }, [count]);

  return (
    <>
      {trees.map((tree) => (
        <group
          key={tree.id}
          position={[
            tree.x,
            0,
            tree.z,
          ]}
          scale={tree.scale}
        >
          <mesh
            position={[0, 1.1, 0]}
            castShadow
          >
            <cylinderGeometry
              args={[
                0.07,
                0.12,
                2.2,
                7,
              ]}
            />

            <meshStandardMaterial
              color="#44392f"
              roughness={1}
            />
          </mesh>

          <mesh
            position={[0, 2.5, 0]}
            castShadow
          >
            <coneGeometry
              args={[0.75, 2.5, 8]}
            />

            <meshStandardMaterial
              color="#1c3025"
              roughness={1}
            />
          </mesh>

          <mesh
            position={[0, 3.3, 0]}
            castShadow
          >
            <coneGeometry
              args={[0.55, 1.9, 8]}
            />

            <meshStandardMaterial
              color="#22392b"
              roughness={1}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function MobileCamera({
  progress,
}: {
  progress: number;
}) {
  useFrame(({ camera }) => {
    const shots = [
      {
        p: 0,
        position: [9.8, 4.5, 14.8],
        target: [0, 1.25, 0.9],
      },
      {
        p: 0.18,
        position: [10.8, 3.8, 12.8],
        target: [0.2, 1.35, 0.6],
      },
      {
        p: 0.36,
        position: [-10.8, 3.8, 12.2],
        target: [-0.3, 1.35, 0.8],
      },
      {
        p: 0.54,
        position: [-8.8, 3.3, 11.8],
        target: [0.2, 1.35, 0.8],
      },
      {
        p: 0.72,
        position: [9.6, 3.4, 11.2],
        target: [0.6, 1.4, 1.1],
      },
      {
        p: 0.86,
        position: [-8.4, 3.6, 10.8],
        target: [0, 1.4, 1.2],
      },
      {
        p: 1,
        position: [11.2, 4.8, 15.5],
        target: [0.2, 1.35, 0.8],
      },
    ];

    let a = shots[0];
    let b = shots[shots.length - 1];

    for (
      let i = 0;
      i < shots.length - 1;
      i++
    ) {
      if (
        progress >= shots[i].p &&
        progress <= shots[i + 1].p
      ) {
        a = shots[i];
        b = shots[i + 1];
        break;
      }
    }

    const localProgress = smooth(
      range(progress, a.p, b.p)
    );

    const position =
      new THREE.Vector3(
        ...a.position
      ).lerp(
        new THREE.Vector3(
          ...b.position
        ),
        localProgress
      );

    const target =
      new THREE.Vector3(
        ...a.target
      ).lerp(
        new THREE.Vector3(
          ...b.target
        ),
        localProgress
      );

    camera.position.lerp(
      position,
      0.07
    );

    camera.lookAt(target);
  });

  return null;
}

function DesktopCamera({
  progress,
  reduced,
}: {
  progress: number;
  reduced: boolean;
}) {
  useFrame(({ camera }) => {
    const p = reduced ? 0 : progress;

    const path =
      sceneConfig.cameraPath;

    let a = path[0];
    let b =
      path[path.length - 1];

    for (
      let i = 0;
      i < path.length - 1;
      i++
    ) {
      if (
        p >= path[i].p &&
        p <= path[i + 1].p
      ) {
        a = path[i];
        b = path[i + 1];
        break;
      }
    }

    const t = smooth(
      range(p, a.p, b.p)
    );

    const position =
      new THREE.Vector3(
        ...a.position
      ).lerp(
        new THREE.Vector3(
          ...b.position
        ),
        t
      );

    const target =
      new THREE.Vector3(
        ...a.target
      ).lerp(
        new THREE.Vector3(
          ...b.target
        ),
        t
      );

    camera.position.lerp(
      position,
      reduced ? 1 : 0.06
    );

    camera.lookAt(target);
  });

  return null;
}

function CameraRig({
  progress,
  reduced,
  quality,
}: {
  progress: number;
  reduced: boolean;
  quality:
    | 'desktop'
    | 'mobile'
    | 'low';
}) {
  if (quality === 'desktop') {
    return (
      <DesktopCamera
        progress={progress}
        reduced={reduced}
      />
    );
  }

  return (
    <MobileCamera
      progress={
        reduced ? 0 : progress
      }
    />
  );
}

export function HouseScene({
  progress,
  reduced,
  quality = 'desktop',
}: {
  progress: number;
  reduced: boolean;
  quality?:
    | 'desktop'
    | 'mobile'
    | 'low';
}) {
  const q =
    sceneConfig.quality[quality];

  const evening = smooth(
    range(progress, 0.8, 1)
  );

  const mobile =
    quality !== 'desktop';

  const background =
    evening > 0.45
      ? '#151a16'
      : '#304239';

  return (
    <>
      <color
        attach="background"
        args={[background]}
      />

      <fog
        attach="fog"
        args={[
          background,
          mobile ? 19 : 22,
          mobile ? 48 : 54,
        ]}
      />

      <ambientLight
        intensity={0.9}
      />

      <hemisphereLight
        intensity={1.25}
        color="#dde8df"
        groundColor="#27342b"
      />

      <directionalLight
        position={[-8, 12, 9]}
        intensity={2.35}
        color="#fff1d9"
        castShadow={q.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight
        position={[9, 5, -6]}
        intensity={0.5}
        color="#a6c0ae"
      />

      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow={q.shadows}
      >
        <planeGeometry
          args={[100, 100]}
        />

        <meshStandardMaterial
          color="#293a31"
          roughness={1}
        />
      </mesh>

      <Trees
        count={q.treeCount}
      />

      {sceneConfig.usePlaceholder ? (
        <DemoHouse
          progress={progress}
        />
      ) : (
        <RealHouseModel
          mobile={mobile}
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
