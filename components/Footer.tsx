'use client';
import { site } from '@/data/site';

export function Footer(){
  return <footer className="footer">
    <div className="shell grid">
      <div className="brand">
        <b>FOREST capital</b>
        <p>{site.address}</p>
        <p>{site.hours}</p>
      </div>
      <div>
        <a href={site.phoneHref}>{site.phone}</a>
        <a href={`tel:${site.secondaryPhone.replace(/[^+\d]/g,'')}`}>{site.secondaryPhone}</a>
        <a href={`mailto:${site.emails[0]}`}>{site.emails[0]}</a>
        <a href={`mailto:${site.emails[1]}`}>{site.emails[1]}</a>
      </div>
      <div>
        <a href={site.telegram} target="_blank" rel="noreferrer">Telegram ↗</a>
        <a href="/privacy">Политика конфиденциальности</a>
        <a href="/consent">Согласие на обработку данных</a>
        <a href="/cookies">Политика cookie</a>
        <a href="https://forestekb.ru" target="_blank" rel="noreferrer">Действующий сайт ↗</a>
      </div>
      <div className="legal">
        <span>{site.legal.owner}</span>
        <span>ИНН {site.legal.inn}</span>
        <span>ОГРНИП {site.legal.ogrnip}</span>
        <span>Реестр ОПД: {site.legal.pdRegistry}</span>
      </div>
    </div>
    <div className="shell bottom">
      <span>© {new Date().getFullYear()} FOREST capital</span>
      <span>Production concept · изменяемые данные синхронизируются с CMS</span>
    </div>
    <style jsx>{`
      .footer{padding:60px 0 26px;border-top:1px solid var(--line);background:#090b09}
      .grid{display:grid;grid-template-columns:1.4fr 1fr 1.15fr 1.2fr;gap:36px}
      .grid>div{display:flex;flex-direction:column;gap:9px}.brand b{font-size:18px;letter-spacing:.08em}
      .footer a{font-size:12px;color:#c6c1b8;text-decoration:none}.footer a:hover{color:white}
      .footer p,.legal span{font-size:11px;color:#8f8b83;margin:0;line-height:1.5}
      .bottom{margin-top:40px;padding-top:20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:20px;font-size:10px;color:#77736b}
      @media(max-width:900px){.grid{grid-template-columns:1fr 1fr}}
      @media(max-width:560px){.grid{grid-template-columns:1fr}.bottom{flex-direction:column}}
    `}</style>
  </footer>;
}
