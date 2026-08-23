'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { MobileMenu } from './MobileMenu';

const links = [
  ['Проекты', '#projects'],
  ['Строительство', '#services'],
  ['Технологии', '#technology'],
  ['О компании', '#company'],
  ['Локации', '#locations'],
  ['Контакты', '#contact'],
] as const;

export function Header() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => {
      setCompact(window.scrollY > 28);
    };

    update();

    window.addEventListener('scroll', update, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <header className={`hdr ${compact ? 'compact' : ''}`}>
      <a
        className="brand"
        href="#top"
        aria-label="FOREST capital — на главную"
      >
        <span className="mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <span className="brandText">
          <b>FOREST</b>
          <em>capital</em>
        </span>
      </a>

      <nav aria-label="Основная навигация">
        {links.map(([name, href]) => (
          <a key={href} href={href}>
            {name}
          </a>
        ))}
      </nav>

      <div className="right">
        <div className="phone">
          <a href={site.phoneHref}>
            {site.phone}
          </a>

          <span>
            Ежедневно с 9:00 до 21:00
          </span>
        </div>

        <a
          className="cta"
          href="#contact"
        >
          Обсудить проект
        </a>
      </div>

      <div className="mobile">
        <MobileMenu />
      </div>

      <style jsx>{`
        .hdr {
          position: fixed;
          z-index: 50;
          inset: 0 0 auto;
          height: 86px;
          display: grid;
          grid-template-columns: minmax(190px, 1fr) auto minmax(240px, 1fr);
          align-items: center;
          gap: 28px;
          padding: 0 3.6vw;
          transition:
            height 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease,
            backdrop-filter 0.3s ease;
          background:
            linear-gradient(
              180deg,
              rgba(10, 13, 11, 0.74) 0%,
              rgba(10, 13, 11, 0.2) 72%,
              transparent 100%
            );
          border-bottom: 1px solid transparent;
        }

        .hdr.compact {
          height: 70px;
          background: rgba(10, 13, 11, 0.9);
          backdrop-filter: blur(18px);
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        .brand {
          justify-self: start;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          color: #f2f0ea;
          text-decoration: none;
        }

        .mark {
          position: relative;
          width: 20px;
          height: 31px;
          display: inline-block;
          flex: 0 0 auto;
        }

        .mark i {
          position: absolute;
          left: 50%;
          width: 1px;
          background: #d3c098;
          transform-origin: bottom;
        }

        .mark i:nth-child(1) {
          bottom: 0;
          height: 30px;
          transform: translateX(-50%);
        }

        .mark i:nth-child(2) {
          bottom: 7px;
          height: 20px;
          transform:
            translateX(-50%)
            rotate(28deg);
        }

        .mark i:nth-child(3) {
          bottom: 7px;
          height: 20px;
          transform:
            translateX(-50%)
            rotate(-28deg);
        }

        .brandText {
          display: flex;
          align-items: baseline;
          gap: 6px;
          white-space: nowrap;
        }

        .brandText b {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .brandText em {
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #d6d1c7;
        }

        nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(18px, 2vw, 30px);
        }

        nav a {
          position: relative;
          color: #d7d2c8;
          font-size: 10px;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        nav a::after {
          content: '';
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -7px;
          height: 1px;
          background: #aa8b58;
          transition: right 0.25s ease;
        }

        nav a:hover {
          color: #fff;
        }

        nav a:hover::after {
          right: 0;
        }

        .right {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .phone {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .phone a {
          color: #f2f0ea;
          font-size: 11px;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
        }

        .phone span {
          color: #858078;
          font-size: 7px;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .cta {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 17px;
          border: 1px solid rgba(170, 139, 88, 0.5);
          border-radius: 2px;
          background: rgba(17, 19, 16, 0.24);
          color: #f3efe7;
          font-size: 10px;
          text-decoration: none;
          white-space: nowrap;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .cta:hover {
          background: #aa8b58;
          border-color: #aa8b58;
          color: #10130f;
        }

        .mobile {
          display: none;
        }

        @media (max-width: 1180px) {
          .hdr {
            grid-template-columns: minmax(180px, 1fr) auto minmax(180px, 1fr);
            gap: 18px;
          }

          nav {
            gap: 14px;
          }

          nav a {
            font-size: 9px;
          }

          .phone {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .hdr,
          .hdr.compact {
            height: 88px;
            grid-template-columns: 1fr auto;
            padding: 0 20px;
            background: rgba(14, 18, 15, 0.9);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          nav,
          .right {
            display: none;
          }

          .mobile {
            display: block;
            justify-self: end;
          }

          .brandText b,
          .brandText em {
            font-size: 16px;
          }

          .mark {
            width: 18px;
            height: 28px;
          }
        }

        @media (max-width: 390px) {
          .hdr,
          .hdr.compact {
            padding: 0 16px;
          }

          .brand {
            gap: 9px;
          }

          .brandText b,
          .brandText em {
            font-size: 14px;
          }
        }
      `}</style>
    </header>
  );
}
