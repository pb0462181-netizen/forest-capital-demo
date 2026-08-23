'use client';

import { useEffect } from 'react';
import { trackEvent } from './ConsentAnalytics';

export function AnalyticsBridge() {
  useEffect(() => {
    trackEvent('view_home');

    const seen = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return;
      const pct = Math.round((scrollY / max) * 100);
      [25,50,75,100].forEach(mark => {
        if (pct >= mark && !seen.has(mark)) {
          seen.add(mark);
          trackEvent(`scroll_${mark}`);
        }
      });
    };

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a,button') as HTMLElement | null;
      if (!target) return;
      const href = target instanceof HTMLAnchorElement ? target.href : '';
      const text = (target.textContent || '').trim().slice(0, 80);
      if (href.startsWith('tel:')) trackEvent('click_phone');
      if (href.includes('t.me/')) trackEvent('click_telegram');
      if (href.includes('/demo-dom')) trackEvent('open_forest_170');
      if (/консультац|Обсудить/i.test(text)) trackEvent('open_lead_form');
    };

    document.addEventListener('click', onClick);
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('click', onClick);
      removeEventListener('scroll', onScroll);
    };
  }, []);
  return null;
}
