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
  const milestones = useRef(new Set<number>());

  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState(true);

  const quality = useSceneQuality();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyMotionPreference = () => {
      const explicit = localStorage.getItem('forest_reduce_motion');

      setReduced(
        explicit === null
          ? media.matches
          : explicit === '1'
      );
    };

    const handleMotionChange = (event: Event) => {
      const customEvent =
        event as CustomEvent<{ reduced: boolean }>;

      if (customEvent.detail) {
        setReduced(customEvent.detail.reduced);
      }
    };

    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(
        1,
        section.offsetHeight - window.innerHeight
      );

      const nextProgress = Math.min(
        1,
        Math.max(0, -rect.top / travel)
      );

      setProgress(nextProgress);

      [25, 50, 75, 100].forEach((mark) => {
        if (
          nextProgress * 100 >= mark &&
          !milestones.current.has(mark)
        ) {
          milestones.current.add(mark);
          trackEvent(`hero_3d_${mark}`);
        }
      });
    };

    applyMotionPreference();
    setWebgl(canUseWebGL());

    media.addEventListener('change', applyMotionPreference);
    window.addEventListener(
      'forest-motion-change',
      handleMotionChange
    );
    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      media.removeEventListener(
        'change',
        applyMotionPreference
      );
      window.removeEventListener(
        'forest-motion-change',
        handleMotionChange
      );
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  const stepIndex = Math.min(
    heroSteps.length - 1,
    Math.floor(
      Math.min(progress, 0.9999) *
        heroSteps.length
    )
  );

  const step = heroSteps[stepIndex];

  const sceneProgress = reduced
    ? Math.min(progress, 0.16)
    : progress;

  const introVisible = progress < 0.11;
  const storyVisible = progress >= 0.11;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="experience"
    >
      <div className="sticky">
        <div
          className="scene"
          onPointerDown={() =>
            trackEvent('hero_3d_interaction')
          }
        >
          {webgl ? (
            <Suspense
              fallback={
                <div
                  className="fallback"
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
              className="fallback"
              role="img"
              aria-label="Современный загородный дом в лесном окружении"
            />
          )}
        </div>

        <div className="visualShade" />

        <div
          className={`intro ${
            introVisible ? 'visible' : ''
          }`}
        >
          <div className="kicker">
            FOREST CAPITAL · ЕКАТЕРИНБУРГ
          </div>

          <h1>
            Загородные дома
            <span>бизнес-класса</span>
          </h1>

          <p>
            Архитектура, строительство, инженерия
            и интерьер — в одном проекте.
          </p>

          <div className="actions">
            <a
              href="#contact"
              className="button primary"
            >
              Обсудить будущий дом
            </a>

            <a
              href="#projects"
              className="button secondary"
            >
              Смотреть проекты
            </a>
          </div>
        </div>

        <div
          className={`story ${
            storyVisible ? 'visible' : ''
          }`}
        >
          <div className="storyNumber">
            {String(stepIndex + 1).padStart(2, '0')}
          </div>

          <div className="storyBody">
            <div className="storyKicker">
              {step.eyebrow}
            </div>

            <h2>{step.title}</h2>

            <p>{step.body}</p>
          </div>
        </div>

        <div className="progress">
          <div className="progressTrack">
            <div
              className="progressFill"
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>

          <span>
            Листайте, чтобы увидеть,
            как создаётся дом
          </span>
        </div>

        <div className="stepCount">
          <b>
            {String(stepIndex + 1).padStart(2, '0')}
          </b>
          <span>/</span>
          <small>
            {String(heroSteps.length).padStart(2, '0')}
          </small>
        </div>
      </div>

      <style jsx>{`
        .experience {
          height: 480vh;
          background: #111310;
        }

        .sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: #111310;
        }

        .scene,
        .fallback,
        .visualShade {
          position: absolute;
          inset: 0;
        }

        .scene {
          z-index: 1;
          touch-action: pan-y;
        }

        .fallback {
          background:
            radial-gradient(
              circle at 62% 38%,
              #46594d 0%,
              #26372f 45%,
              #111310 90%
            );
        }

        .visualShade {
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              rgba(17, 19, 16, 0.9) 0%,
              rgba(17, 19, 16, 0.56) 28%,
              rgba(17, 19, 16, 0.12) 62%,
              rgba(17, 19, 16, 0.04) 100%
            ),
            linear-gradient(
              0deg,
              rgba(17, 19, 16, 0.56) 0%,
              transparent 42%
            );
        }

        .intro {
          position: absolute;
          z-index: 4;
          left: 5vw;
          top: 50%;
          width: min(560px, 42vw);
          transform: translateY(-50%);
          opacity: 0;
          transition:
            opacity 0.5s ease,
            transform 0.5s ease;
          pointer-events: none;
        }

        .intro.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .kicker {
          margin-bottom: 18px;
          color: #d1ccc2;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;
          max-width: 560px;
          font-family: var(--font-prata);
          font-size: clamp(52px, 5.8vw, 90px);
          line-height: 0.98;
          font-weight: 400;
          letter-spacing: -0.045em;
          color: #f2f0ea;
        }

        h1 span {
          display: block;
          color: #cfc9bd;
        }

        .intro > p {
          max-width: 470px;
          margin: 22px 0 0;
          font-size: 16px;
          line-height: 1.55;
          color: rgba(242, 240, 234, 0.78);
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
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
            transform 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .button:hover {
          transform: translateY(-2px);
        }

        .primary {
          background: #f2f0ea;
          color: #111310;
        }

        .secondary {
          border: 1px solid rgba(242, 240, 234, 0.25);
          background: rgba(17, 19, 16, 0.22);
          color: #f2f0ea;
          backdrop-filter: blur(12px);
        }

        .story {
          position: absolute;
          z-index: 4;
          right: 5vw;
          bottom: 10vh;
          width: min(430px, 34vw);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 17px;
          padding: 20px;
          border: 1px solid rgba(242, 240, 234, 0.14);
          border-radius: 18px;
          background: rgba(17, 19, 16, 0.55);
          backdrop-filter: blur(16px);
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.45s ease,
            transform 0.45s ease;
          pointer-events: none;
        }

        .story.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .storyNumber {
          padding-top: 2px;
          color: #aa8b58;
          font-size: 10px;
        }

        .storyKicker {
          color: #aa8b58;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .story h2 {
          margin: 8px 0 8px;
          font-family: var(--font-prata);
          font-size: 25px;
          line-height: 1.08;
          font-weight: 400;
          color: #f2f0ea;
        }

        .story p {
          margin: 0;
          color: #c9c3b8;
          font-size: 12px;
          line-height: 1.5;
        }

        .progress {
          position: absolute;
          z-index: 4;
          left: 5vw;
          bottom: 26px;
          display: flex;
          align-items: center;
          gap: 13px;
          color: #aaa59d;
          font-size: 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .progressTrack {
          width: 74px;
          height: 1px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.18);
        }

        .progressFill {
          width: 100%;
          height: 100%;
          transform-origin: left;
          background: #aa8b58;
        }

        .stepCount {
          position: absolute;
          z-index: 4;
          top: 105px;
          right: 5vw;
          display: flex;
          gap: 4px;
          align-items: baseline;
          color: #f2f0ea;
        }

        .stepCount b {
          font-size: 16px;
          font-weight: 500;
        }

        .stepCount span,
        .stepCount small {
          color: #8c877e;
          font-size: 9px;
        }

        @media (max-width: 760px) {
          .experience {
            height: 420vh;
          }

          .visualShade {
            background:
              linear-gradient(
                0deg,
                rgba(17, 19, 16, 0.96) 0%,
                rgba(17, 19, 16, 0.78) 25%,
                rgba(17, 19, 16, 0.16) 62%,
                rgba(17, 19, 16, 0.04) 100%
              ),
              linear-gradient(
                90deg,
                rgba(17, 19, 16, 0.28) 0%,
                transparent 70%
              );
          }

          .intro {
            left: 20px;
            right: 20px;
            top: auto;
            bottom: 11vh;
            width: auto;
            transform: none;
          }

          .kicker {
            margin-bottom: 12px;
            font-size: 8px;
            letter-spacing: 0.18em;
          }

          h1 {
            max-width: 330px;
            font-size: clamp(39px, 10.7vw, 50px);
            line-height: 0.99;
            letter-spacing: -0.035em;
          }

          .intro > p {
            max-width: 330px;
            margin-top: 14px;
            font-size: 13px;
            line-height: 1.45;
          }

          .actions {
            margin-top: 18px;
          }

          .button {
            min-height: 45px;
            padding: 0 16px;
            font-size: 12px;
          }

          .story {
            left: 20px;
            right: 20px;
            bottom: 11vh;
            width: auto;
            padding: 16px;
            border-radius: 16px;
            background: rgba(17, 19, 16, 0.64);
          }

          .story h2 {
            font-size: 22px;
          }

          .story p {
            font-size: 11px;
          }

          .progress {
            left: 20px;
            right: 74px;
            bottom: 20px;
            gap: 9px;
          }

          .progressTrack {
            width: 36px;
            flex: 0 0 auto;
          }

          .progress span {
            max-width: 190px;
            font-size: 7px;
            line-height: 1.35;
          }

          .stepCount {
            top: 82px;
            right: 18px;
          }
        }

        @media (max-width: 390px) {
          h1 {
            max-width: 300px;
            font-size: 37px;
          }

          .intro > p {
            font-size: 12px;
          }

          .actions {
            gap: 8px;
          }

          .button {
            min-height: 43px;
            padding: 0 14px;
            font-size: 11px;
          }

          .story h2 {
            font-size: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .experience {
            height: 180vh;
          }

          .intro,
          .story {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
