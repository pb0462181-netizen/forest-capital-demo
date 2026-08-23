'use client';

import { useEffect, useRef, useState } from 'react';
import { heroSteps } from '@/data/site';
import { trackEvent } from './ConsentAnalytics';

const benefits = [
  {
    number: '01',
    title: 'Индивидуальная архитектура',
    text: 'Проект под ваш участок и образ жизни',
  },
  {
    number: '02',
    title: 'Полный цикл строительства',
    text: 'От идеи до готового дома',
  },
  {
    number: '03',
    title: 'Фиксированная стоимость',
    text: 'Прозрачный договор и сроки',
  },
  {
    number: '04',
    title: 'Контроль качества',
    text: 'На каждом этапе строительства',
  },
];

export function HeroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const milestones = useRef(new Set<number>());

  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
          trackEvent(`hero_${mark}`);
        }
      });
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
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

  const introVisible = progress < 0.12;

  const zoom = 1.02 + progress * 0.05;
  const moveX = progress * -1.8;
  const moveY = progress * -0.8;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="heroExperience"
    >
      <div className="sticky">
        <div className="visual">
          <div
            className="photo"
            style={{
              transform: `
                scale(${zoom})
                translate3d(${moveX}%, ${moveY}%, 0)
              `,
            }}
          />
        </div>

        <div className="overlay" />

        <div
          className={`intro ${
            introVisible ? 'visible' : ''
          }`}
        >
          <p className="eyebrow">
            FOREST CAPITAL · ЕКАТЕРИНБУРГ
          </p>

          <h1>
            Загородные
            <br />
            дома
            <br />
            <span>бизнес-класса</span>
          </h1>

          <p className="lead">
            Архитектура, строительство,
            инженерия и интерьер — в одном
            проекте.
          </p>

          <div className="actions">
            <a
              href="#contact"
              className="primary"
              onClick={() =>
                trackEvent('hero_contact')
              }
            >
              Обсудить будущий дом
            </a>

            <a
              href="#projects"
              className="secondary"
            >
              <i aria-hidden="true">↗</i>
              Смотреть проекты
            </a>
          </div>
        </div>

        <div
          className={`story ${
            !introVisible ? 'visible' : ''
          }`}
        >
          <div className="storyMeta">
            <span>
              {String(stepIndex + 1).padStart(
                2,
                '0'
              )}
            </span>

            <small>{step.eyebrow}</small>
          </div>

          <h2>{step.title}</h2>

          <p>{step.body}</p>
        </div>

        <div className="counter">
          <b>
            {String(stepIndex + 1).padStart(
              2,
              '0'
            )}
          </b>

          <span>/</span>

          <small>
            {String(heroSteps.length).padStart(
              2,
              '0'
            )}
          </small>
        </div>

        <div
          className={`benefits ${
            introVisible ? 'visible' : ''
          }`}
        >
          {benefits.map((item) => (
            <div
              className="benefit"
              key={item.number}
            >
              <div className="benefitIcon">
                {item.number}
              </div>

              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="scrollHint">
          <span className="arrow">↓</span>

          <div>
            <i
              style={{
                transform: `scaleX(${Math.max(
                  progress,
                  0.12
                )})`,
              }}
            />

            <small>
              Листайте, чтобы увидеть,
              <br />
              как создаётся дом
            </small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .heroExperience {
          position: relative;
          height: 430vh;
          background: #0b100d;
        }

        .sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          min-height: 650px;
          overflow: hidden;
          background: #0d120f;
          color: #f4f0e7;
        }

        .visual {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #132019;
        }

        .photo {
          position: absolute;
          inset: -3%;
          will-change: transform;

          background-image:
          url('/models/forest-hero-house.webp');

          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;

          transition: transform 0.08s linear;
        }

        .overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(5, 9, 6, 0.96) 0%,
              rgba(5, 9, 6, 0.84) 22%,
              rgba(5, 9, 6, 0.46) 43%,
              rgba(5, 9, 6, 0.08) 68%,
              rgba(5, 9, 6, 0.02) 100%
            ),
            linear-gradient(
              180deg,
              rgba(5, 8, 6, 0.2) 0%,
              transparent 27%,
              transparent 65%,
              rgba(5, 8, 6, 0.74) 100%
            );
        }

        .intro {
          position: absolute;
          z-index: 4;

          left: 5vw;
          top: 50%;

          width: min(650px, 42vw);

          transform:
            translateY(-48%)
            translateX(-20px);

          opacity: 0;
          pointer-events: none;

          transition:
            opacity 0.55s ease,
            transform 0.65s ease;
        }

        .intro.visible {
          opacity: 1;
          transform: translateY(-48%);
          pointer-events: auto;
        }

        .eyebrow {
          margin: 0 0 16px;

          color: #c6a665;

          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;

          max-width: 620px;

          font-family: var(--font-prata);

          font-size: clamp(
            60px,
            6vw,
            108px
          );

          font-weight: 400;
          line-height: 0.9;
          letter-spacing: -0.045em;

          color: #f4f0e7;
        }

        h1 span {
          color: #e8e0d3;
        }

        .lead {
          max-width: 470px;

          margin: 26px 0 0;

          color: rgba(
            244,
            240,
            231,
            0.78
          );

          font-size: 16px;
          line-height: 1.55;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-top: 30px;
        }

        .actions a {
          min-height: 52px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          box-sizing: border-box;

          text-decoration: none;

          font-size: 12px;

          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .actions a:hover {
          transform: translateY(-2px);
        }

        .primary {
          padding: 0 22px;

          background: #d7b36c;
          color: #10130f;

          border: 1px solid #d7b36c;
        }

        .secondary {
          gap: 11px;
          padding: 0 20px;

          color: #f4f0e7;

          border:
            1px solid
            rgba(215, 179, 108, 0.55);

          background:
            rgba(10, 15, 11, 0.28);

          backdrop-filter: blur(12px);
        }

        .secondary i {
          width: 25px;
          height: 25px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(215, 179, 108, 0.7);

          border-radius: 50%;

          color: #d7b36c;

          font-style: normal;
          font-size: 10px;
        }

        .counter {
          position: absolute;
          z-index: 5;

          top: 105px;
          right: 5vw;

          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .counter b {
          font-family: var(--font-prata);

          font-size: 26px;
          font-weight: 400;
        }

        .counter span,
        .counter small {
          color: #85857e;
          font-size: 10px;
        }

        .story {
          position: absolute;
          z-index: 5;

          left: 5vw;
          bottom: 20vh;

          width: min(470px, 38vw);

          padding: 26px 28px;

          border:
            1px solid
            rgba(215, 179, 108, 0.24);

          background:
            rgba(8, 13, 9, 0.74);

          backdrop-filter: blur(18px);

          opacity: 0;

          transform:
            translateY(24px);

          pointer-events: none;

          transition:
            opacity 0.5s ease,
            transform 0.55s ease;
        }

        .story.visible {
          opacity: 1;
          transform: none;
        }

        .storyMeta {
          display: flex;
          align-items: center;
          gap: 16px;

          margin-bottom: 11px;
        }

        .storyMeta span {
          color: #d7b36c;
          font-size: 11px;
        }

        .storyMeta small {
          color: #b99c65;

          font-size: 9px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .story h2 {
          margin: 0;

          font-family: var(--font-prata);

          font-size: clamp(
            30px,
            3vw,
            48px
          );

          font-weight: 400;
          line-height: 1.04;
        }

        .story > p {
          margin: 15px 0 0;

          color: #bdb9af;

          font-size: 13px;
          line-height: 1.6;
        }

        .benefits {
          position: absolute;
          z-index: 6;

          left: 0;
          right: 0;
          bottom: 0;

          min-height: 124px;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          padding: 0 5vw;

          background:
            rgba(6, 10, 7, 0.88);

          backdrop-filter: blur(18px);

          border-top:
            1px solid
            rgba(255, 255, 255, 0.07);

          opacity: 0;

          transform:
            translateY(20px);

          transition:
            opacity 0.45s ease,
            transform 0.55s ease;
        }

        .benefits.visible {
          opacity: 1;
          transform: none;
        }

        .benefit {
          position: relative;

          display: flex;
          align-items: center;
          gap: 16px;

          padding: 22px 26px;
        }

        .benefit:not(:last-child) {
          border-right:
            1px solid
            rgba(255, 255, 255, 0.09);
        }

        .benefitIcon {
          flex: 0 0 auto;

          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(215, 179, 108, 0.55);

          color: #d7b36c;

          font-family: var(--font-prata);
          font-size: 14px;
        }

        .benefit strong {
          display: block;

          max-width: 180px;

          font-size: 12px;
          font-weight: 500;
          line-height: 1.35;
        }

        .benefit span {
          display: block;

          margin-top: 5px;

          color: #85857e;

          font-size: 9px;
          line-height: 1.4;
        }

        .scrollHint {
          position: absolute;
          z-index: 7;

          left: 5vw;
          bottom: 145px;

          display: flex;
          align-items: center;
          gap: 16px;
        }

        .arrow {
          color: #d7b36c;

          font-size: 24px;
          line-height: 1;
        }

        .scrollHint > div {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .scrollHint i {
          width: 54px;
          height: 1px;

          display: block;

          transform-origin: left;

          background: #d7b36c;
        }

        .scrollHint small {
          color: #97958e;

          font-size: 7px;
          line-height: 1.5;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        @media (max-width: 1050px) {
          .benefit {
            padding-inline: 16px;
          }

          .benefit strong {
            font-size: 10px;
          }
        }

        @media (max-width: 760px) {
          .heroExperience {
            height: 390vh;
          }

          .sticky {
            min-height: 620px;
          }

          .photo {
            inset: 0;

            background-position:
              58% center;
          }

          .overlay {
            background:
              linear-gradient(
                0deg,
                rgba(
                    6,
                    10,
                    7,
                    0.97
                  )
                  0%,
                rgba(
                    6,
                    10,
                    7,
                    0.79
                  )
                  31%,
                rgba(
                    6,
                    10,
                    7,
                    0.16
                  )
                  67%,
                rgba(
                    6,
                    10,
                    7,
                    0.18
                  )
                  100%
              );
          }

          .intro {
            left: 22px;
            right: 22px;

            top: auto;
            bottom: 105px;

            width: auto;

            transform:
              translateY(18px);
          }

          .intro.visible {
            transform: none;
          }

          .eyebrow {
            margin-bottom: 10px;
            font-size: 8px;
          }

          h1 {
            max-width: 380px;

            font-size:
              clamp(
                43px,
                12.2vw,
                62px
              );

            line-height: 0.94;
          }

          .lead {
            max-width: 340px;

            margin-top: 15px;

            font-size: 13px;
          }

          .actions {
            gap: 8px;
            margin-top: 19px;
          }

          .actions a {
            min-height: 46px;
            padding-inline: 14px;
            font-size: 11px;
          }

          .counter {
            top: 106px;
            right: 22px;
          }

          .counter b {
            font-size: 21px;
          }

          .benefits {
            display: none;
          }

          .scrollHint {
            left: 22px;
            bottom: 23px;
          }

          .scrollHint > div {
            gap: 9px;
          }

          .scrollHint i {
            width: 38px;
          }

          .story {
            left: 22px;
            right: 22px;
            bottom: 90px;

            width: auto;

            padding: 20px;
          }

          .story h2 {
            font-size: clamp(
              28px,
              8vw,
              38px
            );
          }

          .story > p {
            font-size: 12px;
          }
        }

        @media (max-width: 390px) {
          .intro {
            bottom: 92px;
          }

          h1 {
            font-size: 40px;
          }

          .actions {
            flex-wrap: wrap;
          }

          .actions a {
            width: 100%;
          }

          .story {
            bottom: 80px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .heroExperience {
            height: 170vh;
          }

          .photo {
            transform: none !important;
            transition: none;
          }

          .intro,
          .story,
          .benefits {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
