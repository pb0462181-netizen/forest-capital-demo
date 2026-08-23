'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { HouseScene } from './3d/HouseScene';
import { heroSteps } from '@/data/site';
import { trackEvent } from './ConsentAnalytics';
import { useSceneQuality } from './3d/useSceneQuality';
import { sceneConfig } from '@/data/scene';

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');

    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export function HeroExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState(true);

  const quality = useSceneQuality();
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');

    const applyMotionPreference = () => {
      const explicit = localStorage.getItem('forest_reduce_motion');

      setReduced(
        explicit === null
          ? systemMotion.matches
          : explicit === '1'
      );
    };

    const onCustomMotion = (event: Event) => {
      const custom = event as CustomEvent<{ reduced: boolean }>;

      if (custom.detail) {
        setReduced(custom.detail.reduced);
      }
    };

    applyMotionPreference();
    setWebgl(canUseWebGL());

    systemMotion.addEventListener('change', applyMotionPreference);
    addEventListener('forest-motion-change', onCustomMotion);

    const onScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(
        1,
        section.offsetHeight - window.innerHeight
      );

      const value = Math.min(
        1,
        Math.max(0, -rect.top / travel)
      );

      setProgress(value);

      [25, 50, 75, 100].forEach((mark) => {
        if (
          value * 100 >= mark &&
          !milestones.current.has(mark)
        ) {
          milestones.current.add(mark);
          trackEvent(`hero_3d_${mark}`);
        }
      });
    };

    onScroll();

    addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      removeEventListener('scroll', onScroll);
      systemMotion.removeEventListener(
        'change',
        applyMotionPreference
      );
      removeEventListener(
        'forest-motion-change',
        onCustomMotion
      );
    };
  }, []);

  const stageIndex = Math.min(
    heroSteps.length - 1,
    Math.floor(
      Math.min(0.9999, progress) * heroSteps.length
    )
  );

  const stage = heroSteps[stageIndex];

  const sceneProgress = reduced
    ? Math.min(progress, 0.16)
    : progress;

  const stageVisible = progress > 0.12;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="experience"
    >
      <div className="sticky">
        <div
          className="canvas"
          onPointerDown={() =>
            trackEvent('hero_3d_interaction')
          }
        >
          {webgl ? (
            <Suspense
              fallback={
                <div
                  className="poster"
                  aria-hidden="true"
                />
              }
            >
              <Canvas
                dpr={
                  reduced
                    ? 1
                    : sceneConfig.quality[quality].dpr
                }
                shadows={
                  !reduced &&
                  sceneConfig.quality[quality].shadows
                }
                gl={{
                  antialias: quality !== 'low',
                  powerPreference: 'high-performance',
                }}
                camera={{
                  fov: 42,
                  near: 0.1,
                  far: 150,
                }}
              >
                <HouseScene
                  progress={sceneProgress}
                  reduced={reduced}
                  quality={quality}
                />
              </Canvas>
            </Suspense>
          ) : (
            <div
              className="poster"
              role="img"
              aria-label="Современный загородный дом в лесном окружении"
            />
          )}
        </div>

        <div className="gradient" />

        <div
          className={`intro ${
            stageVisible ? 'compact' : ''
          }`}
        >
          <div className="eyebrow">
            FOREST CAPITAL · ЕКАТЕРИНБУРГ
          </div>

          <h1>
            Загородные дома
            <span> бизнес-класса</span>
          </h1>

          <p>
            Проектируем и строим современные дома
            под ключ в Екатеринбурге и
            Свердловской области.
          </p>

          <div className="actions">
            <a
              className="button primary"
              href="#contact"
            >
              Обсудить будущий дом
            </a>

            <a
              className="button secondary"
              href="#projects"
            >
              Смотреть проекты
            </a>
          </div>
        </div>

        <div
          className={`stage ${
            stageVisible ? 'visible' : ''
          }`}
        >
          <div className="stageNumber">
            {String(stageIndex + 1).padStart(2, '0')}
          </div>

          <div>
            <div className="stageEyebrow">
              {stage.eyebrow}
            </div>

            <h2>{stage.title}</h2>

            <p>{stage.body}</p>
          </div>
        </div>

        <div className="scroll">
          <div className="line">
            <i
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>

          <span>
            Листайте, чтобы увидеть, как создаётся дом
          </span>
        </div>

        <div className="counter">
          <b>
            {String(stageIndex + 1).padStart(2, '0')}
          </b>
          <span>/</span>
          <small>
            {String(heroSteps.length).padStart(2, '0')}
          </small>
        </div>
      </div>

      <style jsx>{`
        .experience {
          height: 500vh;
          background: #111310;
        }

        .sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: #111310;
        }

        .canvas,
        .poster,
        .gradient {
          position: absolute;
          inset: 0;
        }

        .canvas {
          touch-action: pan-y;
        }

        .poster {
          background:
            radial-gradient(
              circle at 68% 38%,
              #4e6256 0%,
              #26372f 42%,
              #111310 88%
            );
        }

        .gradient {
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              rgba(17, 19, 16, 0.84) 0%,
              rgba(17, 19, 16, 0.52) 30%,
              rgba(17, 19, 16, 0.08) 70%
            ),
            linear-gradient(
              0deg,
              rgba(17, 19, 16, 0.65) 0%,
              transparent 42%
            );
        }

        .intro {
          position: absolute;
          z-index: 5;
          left: 5vw;
          top: 50%;
          width: min(650px, 46vw);
          transform: translateY(-50%);
          transition:
            opacity 0.65s ease,
            transform 0.65s ease;
        }

        .intro.compact {
          opacity: 0;
          transform:
            translateY(-58%)
            translateX(-30px);
          pointer-events: none;
        }

        .eyebrow {
          margin-bottom: 20px;
          color: #d8d3c8;
          font-size: 11px;
          letter-spacing: 0.18em;
        }

        h1 {
          margin: 0;
          font-family: var(--font-prata);
          font-size: clamp(54px, 6.2vw, 96px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.045em;
        }

        h1 span {
          display: block;
          color: #d8d3c8;
        }

        .intro > p {
          max-width: 520px;
          margin: 25px 0 0;
          color: rgba(242, 240, 234, 0.82);
          font-size: 17px;
          line-height: 1.55;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 30px;
        }

        .button {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 13px;
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .button:hover {
          transform: translateY(-2px);
        }

        .primary {
          background: #f2f0ea;
          color: #111310;
        }

        .secondary {
          border: 1px solid rgba(242, 240, 234, 0.28);
          background: rgba(17, 19, 16, 0.24);
          backdrop-filter: blur(12px);
          color: #f2f0ea;
        }

        .stage {
          position: absolute;
          z-index: 5;
          right: 5vw;
          bottom: 11vh;
          width: min(460px, 36vw);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 18px;
          padding: 22px;
          border: 1px solid rgba(242, 240, 234, 0.15);
          border-radius: 20px;
          background: rgba(17, 19, 16, 0.55);
          backdrop-filter: blur(18px);
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease;
        }

        .stage.visible {
          opacity: 1;
          transform: none;
        }

        .stageNumber {
          padding-top: 3px;
          color: #aa8b58;
          font-size: 11px;
        }

        .stageEyebrow {
          color: #aa8b58;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .stage h2 {
          margin: 9px 0 9px;
          font-family: var(--font-prata);
          font-size: 27px;
          font-weight: 400;
          line-height: 1.06;
        }

        .stage p {
          margin: 0;
          color: #c5c0b6;
          font-size: 12px;
          line-height: 1.55;
        }

        .scroll {
          position: absolute;
          z-index: 5;
          left: 5vw;
          bottom: 28px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #aaa69f;
          font-size: 9px;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .line {
          width: 82px;
          height: 1px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.2);
        }

        .line i {
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: left;
          background: #aa8b58;
        }

        .counter {
          position: absolute;
          z-index: 5;
          right: 5vw;
          top: 110px;
          display: flex;
          gap: 5px;
          align-items: baseline;
          color: #f2f0ea;
        }

        .counter b {
          font-size: 18px;
          font-weight: 500;
        }

        .counter span,
        .counter small {
          color: #89857d;
          font-size: 10px;
        }

        @media (max-width: 760px) {
          .experience {
            height: 430vh;
          }

          .gradient {
            background:
              linear-gradient(
                0deg,
                rgba(17, 19, 16, 0.97) 0%,
                rgba(17, 19, 16, 0.72) 32%,
                rgba(17, 19, 16, 0.14) 70%
              );
          }

          .intro {
            left: 20px;
            right: 20px;
            top: auto;
            bottom: 12vh;
            width: auto;
            transform: none;
          }

          .intro.compact {
            opacity: 0;
            transform: translateY(18px);
          }

          .eyebrow {
            margin-bottom: 13px;
            font-size: 9px;
          }

          h1 {
            max-width: 390px;
            font-size: clamp(42px, 12vw, 57px);
            line-height: 0.98;
          }

          .intro > p {
            max-width: 370px;
            margin-top: 17px;
            font-size: 14px;
            line-height: 1.5;
          }

          .actions {
            margin-top: 21px;
          }

          .button {
            min-height: 47px;
            padding: 0 16px;
            font-size: 12px;
          }

          .stage {
            left: 20px;
            right: 20px;
            bottom: 10vh;
            width: auto;
            padding: 17px;
          }

          .stage h2 {
            font-size: 23px;
          }

          .stage p {
            font-size: 11px;
          }

          .scroll {
            left: 20px;
            bottom: 22px;
          }

          .scroll span {
            max-width: 210px;
          }

          .line {
            width: 40px;
          }

          .counter {
            right: 18px;
            top: 84px;
          }
        }

        @media (max-width: 390px) {
          h1 {
            font-size: 40px;
          }

          .actions {
            gap: 8px;
          }

          .button {
            width: 100%;
          }

          .scroll span {
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .experience {
            height: 180vh;
          }

          .intro,
          .stage {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
