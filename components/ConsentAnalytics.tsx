'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (...args: unknown[]) => void;
  }
}

const KEY = 'forest_cookie_consent';

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.ym === 'function' && process.env.NEXT_PUBLIC_YM_ID) {
    window.ym(Number(process.env.NEXT_PUBLIC_YM_ID), 'reachGoal', name, params);
  }
}

export function ConsentAnalytics() {
  const [choice, setChoice] = useState<'accepted'|'rejected'|null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === 'accepted' || saved === 'rejected') setChoice(saved);
  }, []);

  useEffect(() => {
    if (choice !== 'accepted') return;
    const id = process.env.NEXT_PUBLIC_YM_ID;
    if (!id || document.getElementById('ym-loader')) return;

    const script = document.createElement('script');
    script.id = 'ym-loader';
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.onload = () => {
      window.ym?.(Number(id), 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false,
      });
      trackEvent('consent_analytics_accepted');
    };
    document.head.appendChild(script);
  }, [choice]);

  function decide(value: 'accepted'|'rejected') {
    localStorage.setItem(KEY, value);
    setChoice(value);
  }

  if (choice) return null;

  return (
    <aside className="consent" role="dialog" aria-label="Настройки cookie">
      <p>
        Мы используем необязательную аналитику только после вашего согласия.
        Необходимые cookie для работы сайта могут использоваться без аналитики.
      </p>
      <div>
        <button onClick={() => decide('rejected')}>Только необходимые</button>
        <button className="accept" onClick={() => decide('accepted')}>Разрешить аналитику</button>
      </div>
      <style jsx>{`
        .consent{position:fixed;z-index:100;left:20px;right:20px;bottom:20px;max-width:720px;margin:auto;
          border:1px solid var(--line);border-radius:18px;padding:18px;background:rgba(17,19,16,.96);
          backdrop-filter:blur(18px);box-shadow:0 24px 80px rgba(0,0,0,.35)}
        p{margin:0 0 14px;color:#d8d3c8;font-size:13px;line-height:1.55}
        div{display:flex;gap:10px;flex-wrap:wrap}
        button{border:1px solid var(--line);border-radius:999px;padding:11px 14px;background:transparent;color:white;cursor:pointer}
        .accept{background:var(--warm);color:var(--graphite)}
      `}</style>
    </aside>
  );
}
