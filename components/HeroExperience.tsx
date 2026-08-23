'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';

import { HouseScene } from './3d/HouseScene';
import { useSceneQuality } from './3d/useSceneQuality';
import { trackEvent } from './ConsentAnalytics';

import { heroSteps } from '@/data/site';
import { sceneConfig } from '@/data/scene';

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');

    return !!(
      window.WebGLRenderingContext &&
      (
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl')
      )
    );
  } catch {
    return false;
  }
}

export function HeroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const milestones = useRef(new Set<number>());

  const [progress, setProgress] = useState(0);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);

  const quality = useSceneQuality();

  useEffect(() => {
    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const applyMotion = () => {
      const saved = localStorage.getItem(
        'forest_reduce_motion'
      );

      setReduced(
        saved === null
          ? motion.matches
          : saved === '1'
      );
    };

    const onMotionChange = (event: Event) => {
      const custom =
        event as CustomEvent<{
          reduced: boolean;
        }>;

      if (custom.detail) {
        setReduced(custom.detail.reduced);
      }
    };

    const onScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const travel = Math.max(
        1,
        section.offsetHeight -
          window.innerHeight
      );

      const value = Math.min(
        1,
        Math.max(
          0,
          -rect.top / travel
        )
      );

      setProgress(value);

      [25, 50, 75, 100].forEach(
        (mark) => {
          if (
            value * 100 >= mark &&
            !milestones.current.has(mark)
          ) {
            milestones.current.add(mark);

            trackEvent(
              `hero_3d_${mark}`
            );
          }
        }
      );
    };

    setWebgl(canUseWebGL());

    applyMotion();
    onScroll();

    motion.addEventListener(
      'change',
      applyMotion
    );

    window.addEventListener(
      'forest-motion-change',
      onMotionChange
    );

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    return () => {
      motion.removeEventListener(
        'change',
        applyMotion
      );

      window.removeEventListener(
        'forest-motion-change',
        onMotionChange
      );

      window.removeEventListener(
        'scroll',
        onScroll
      );
    };
  }, []);

  const stepIndex = Math.min(
    heroSteps.length - 1,
    Math.floor(
      Math.min(
        progress,
        0.9999
      ) * heroSteps.length
    )
  );

  const step =
    heroSteps[stepIndex];

  const introVisible =
    progress < 0.11;

  const sceneProgress = reduced
    ? Math.min(progress, 0.14)
    : progress;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="experience"
    >
      <div className="sticky">

        {/* Красивый постер остаётся под 3D */}
        <div className="poster" />

        {/* Настоящая WebGL / 3D сцена */}
        {webgl && (
          <div
            className="canvas"
            onPointerDown={() =>
              trackEvent(
                'hero_3d_interaction'
              )
            }
          >
            <Canvas
              dpr={
                reduced
                  ? 1
                  : sceneConfig
                      .quality[quality]
                      .dpr
              }
              shadows={
                !reduced &&
                sceneConfig
                  .quality[quality]
                  .shadows
              }
              gl={{
                antialias:
                  quality !== 'low',
                alpha: true,
                powerPreference:
                  'high-performance',
              }}
              camera={{
                fov: 42,
                near: 0.1,
                far: 150,
              }}
            >
              <Suspense fallback={null}>
                <HouseScene
                  progress={
                    sceneProgress
                  }
                  reduced={reduced}
                  quality={quality}
                />
              </Suspense>
            </Canvas>
          </div>
        )}

        <div className="shade" />

        {/* Первый кадр */}
        <div
          className={`intro ${
            introVisible
              ? 'visible'
              : ''
          }`}
        >
          <p className="eyebrow">
            FOREST CAPITAL ·
            ЕКАТЕРИНБУРГ
          </p>

          <h1>
            Загородные
            <br />
            дома
            <br />
            <span>
              бизнес-класса
            </span>
          </h1>

          <p className="lead">
            Архитектура,
            строительство,
            инженерия и интерьер —
            в одном проекте.
          </p>

          <div className="actions">
            <a
              href="#contact"
              className="primary"
              onClick={() =>
                trackEvent(
                  'hero_contact'
                )
              }
            >
              Обсудить будущий дом
            </a>

            <a
              href="#projects"
              className="secondary"
            >
              Смотреть проекты
            </a>
          </div>
        </div>

        {/* Этапы 01–06 */}
        <div
          className={`story ${
            !introVisible
              ? 'visible'
              : ''
          }`}
        >
          <div className="storyTop">
            <span>
              {String(
                stepIndex + 1
              ).padStart(2, '0')}
            </span>

            <small>
              {step.eyebrow}
            </small>
          </div>

          <h2>
            {step.title}
          </h2>

          <p>
            {step.body}
          </p>
        </div>

        {/* 01 / 06 */}
        <div className="counter">
          <b>
            {String(
              stepIndex + 1
            ).padStart(2, '0')}
          </b>

          <span>/</span>

          <small>
            {String(
              heroSteps.length
            ).padStart(2, '0')}
          </small>
        </div>

        {/* Индикатор прокрутки */}
        <div className="scroll">
          <span className="arrow">
            ↓
          </span>

          <div>
            <div className="track">
              <i
                style={{
                  transform:
                    `scaleX(${progress})`,
                }}
              />
            </div>

            <small>
              Листайте, чтобы
              увидеть,
              <br />
              как создаётся дом
            </small>
          </div>
        </div>

      </div>

      <style jsx>{`
        .experience {
          height: 450vh;
          background: #0a0f0c;
        }

        .sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          min-height: 650px;
          overflow: hidden;
          background: #111310;
          color: #f2f0ea;
        }

        .poster,
        .canvas,
        .shade {
          position: absolute;
          inset: 0;
        }

        .poster {
          z-index: 0;
          background:
            linear-gradient(
              90deg,
              rgba(
                7,
                11,
                8,
                0.26
              ),
              transparent
            ),
            url(
              '/models/forest-hero-house.webp'
            )
            center center /
            cover no-repeat;
        }

        .canvas {
          z-index: 1;
          touch-action: pan-y;
        }

        .shade {
          z-index: 2;
          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(
                7,
                11,
                8,
                0.94
              )
              0%,
              rgba(
                7,
                11,
                8,
                0.72
              )
              28%,
              rgba(
                7,
                11,
                8,
                0.20
              )
              56%,
              rgba(
                7,
                11,
                8,
                0.02
              )
              80%
            ),
            linear-gradient(
              0deg,
              rgba(
                7,
                11,
                8,
                0.56
              ),
              transparent 46%
            );
        }

        .intro {
          position: absolute;
          z-index: 4;

          left: 5vw;
          top: 50%;

          width:
            min(
              620px,
              43vw
            );

          opacity: 0;

          transform:
            translateY(-48%)
            translateX(-22px);

          transition:
            opacity
            0.5s ease,
            transform
            0.55s ease;

          pointer-events: none;
        }

        .intro.visible {
          opacity: 1;

          transform:
            translateY(-48%);

          pointer-events: auto;
        }

        .eyebrow {
          margin:
            0 0 16px;

          color: #c4a364;

          font-size: 10px;
          font-weight: 500;

          letter-spacing:
            0.18em;

          text-transform:
            uppercase;
        }

        h1 {
          margin: 0;

          font-family:
            var(--font-prata);

          font-size:
            clamp(
              58px,
              6vw,
              106px
            );

          font-weight: 400;

          line-height: 0.9;

          letter-spacing:
            -0.045em;
        }

        h1 span {
          color: #ddd5c8;
        }

        .lead {
          max-width: 470px;

          margin:
            25px 0 0;

          color:
            rgba(
              242,
              240,
              234,
              0.8
            );

          font-size: 16px;
          line-height: 1.55;
        }

        .actions {
          display: flex;

          flex-wrap: wrap;

          gap: 10px;

          margin-top: 28px;
        }

        .actions a {
          min-height: 50px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            0 20px;

          text-decoration:
            none;

          font-size: 12px;

          transition:
            0.2s ease;
        }

        .primary {
          background:
            #caa45f;

          border:
            1px solid
            #caa45f;

          color:
            #111310;
        }

        .secondary {
          border:
            1px solid
            rgba(
              202,
              164,
              95,
              0.55
            );

          background:
            rgba(
              17,
              19,
              16,
              0.28
            );

          color:
            #f2f0ea;

          backdrop-filter:
            blur(14px);
        }

        .actions a:hover {
          transform:
            translateY(-2px);
        }

        .story {
          position: absolute;
          z-index: 5;

          left: 5vw;
          bottom: 14vh;

          width:
            min(
              470px,
              38vw
            );

          padding:
            25px 27px;

          border:
            1px solid
            rgba(
              202,
              164,
              95,
              0.28
            );

          background:
            rgba(
              8,
              13,
              9,
              0.72
            );

          backdrop-filter:
            blur(18px);

          opacity: 0;

          transform:
            translateY(20px);

          transition:
            opacity
            0.45s ease,
            transform
            0.45s ease;
        }

        .story.visible {
          opacity: 1;
          transform: none;
        }

        .storyTop {
          display: flex;

          align-items:
            center;

          gap: 15px;

          margin-bottom:
            10px;
        }

        .storyTop span {
          color:
            #caa45f;

          font-size:
            11px;
        }

        .storyTop small {
          color:
            #caa45f;

          font-size:
            9px;

          letter-spacing:
            0.14em;

          text-transform:
            uppercase;
        }

        .story h2 {
          margin: 0;

          font-family:
            var(--font-prata);

          font-size:
            clamp(
              30px,
              3vw,
              48px
            );

          font-weight:
            400;

          line-height:
            1.05;
        }

        .story p {
          margin:
            14px 0 0;

          color:
            #bdb8ae;

          font-size:
            13px;

          line-height:
            1.55;
        }

        .counter {
          position:
            absolute;

          z-index: 5;

          top: 106px;
          right: 5vw;

          display: flex;

          align-items:
            baseline;

          gap: 5px;
        }

        .counter b {
          font-family:
            var(--font-prata);

          font-size:
            25px;

          font-weight:
            400;
        }

        .counter span,
        .counter small {
          color:
            #85817a;

          font-size:
            10px;
        }

        .scroll {
          position:
            absolute;

          z-index: 5;

          left: 5vw;
          bottom: 28px;

          display: flex;

          align-items:
            center;

          gap: 13px;
        }

        .arrow {
          color:
            #caa45f;

          font-size:
            22px;
        }

        .scroll > div {
          display: flex;

          align-items:
            center;

          gap: 10px;
        }

        .track {
          width: 54px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.18
            );

          overflow: hidden;
        }

        .track i {
          display: block;

          width: 100%;
          height: 100%;

          transform-origin:
            left;

          background:
            #caa45f;
        }

        .scroll small {
          color:
            #8e8a82;

          font-size:
            7px;

          letter-spacing:
            0.1em;

          line-height:
            1.45;

          text-transform:
            uppercase;
        }

        @media (
          max-width:
          760px
        ) {
          .experience {
            height: 420vh;
          }

          .sticky {
            min-height:
              620px;
          }

          .poster {
            background-position:
              62% center;
          }

          .shade {
            background:
              linear-gradient(
                0deg,
                rgba(
                  7,
                  11,
                  8,
                  0.96
                )
                0%,
                rgba(
                  7,
                  11,
                  8,
                  0.78
                )
                28%,
                rgba(
                  7,
                  11,
                  8,
                  0.16
                )
                63%
              );
          }

          .intro {
            left: 22px;
            right: 22px;

            top: auto;
            bottom: 11vh;

            width: auto;

            transform:
              translateY(16px);
          }

          .intro.visible {
            transform: none;
          }

          .eyebrow {
            margin-bottom:
              10px;

            font-size:
              8px;
          }

          h1 {
            max-width:
              360px;

            font-size:
              clamp(
                42px,
                11.4vw,
                56px
              );

            line-height:
              0.94;
          }

          .lead {
            max-width:
              330px;

            margin-top:
              15px;

            font-size:
              13px;
          }

          .actions {
            margin-top:
              18px;

            gap: 8px;
          }

          .actions a {
            min-height:
              45px;

            padding:
              0 14px;

            font-size:
              11px;
          }

          .story {
            left: 22px;
            right: 22px;

            bottom: 82px;

            width: auto;

            padding: 19px;
          }

          .story h2 {
            font-size:
              clamp(
                27px,
                8vw,
                37px
              );
          }

          .story p {
            font-size:
              11px;
          }

          .counter {
            top: 106px;
            right: 22px;
          }

          .counter b {
            font-size:
              21px;
          }

          .scroll {
            left: 22px;
            bottom: 20px;
          }
        }

        @media (
          max-width:
          390px
        ) {
          h1 {
            font-size:
              39px;
          }

          .actions a {
            width: 100%;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .experience {
            height:
              180vh;
          }

          .intro,
          .story {
            transition:
              none;
          }
        }
      `}</style>
    </section>
  );
}
