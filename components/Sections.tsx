'use client';

import { useMemo, useState } from 'react';
import { forest170, projects, projectPlaceholders, stages, site } from '@/data/site';
import { verifiedForest } from '@/data/verified';

const services = [
  ['01','Проектирование','Архитектура, конструктив и сценарии жизни формируются как единое решение.'],
  ['02','Строительство','Единый контроль реализации — от подготовки участка до сдачи дома.'],
  ['03','Инженерия','Отопление, вентиляция, водоснабжение, электрика и слаботочные системы.'],
  ['04','Интерьер','Архитектура продолжается внутри — без разрыва между оболочкой и пространством.'],
  ['05','Умный дом','Сценарии света, климата, безопасности и управления инженерными системами.'],
  ['06','Благоустройство','Дом и участок проектируются как одна среда: террасы, сад, свет и маршруты.'],
] as const;

export function CompanyIntro(){
  return <section id="company" className="section company">
    <div className="shell">
      <div className="companyHead">
        <div><p className="eyebrow">FOREST capital · компания полного цикла</p><h2 className="display big">От идеи и участка — до интерьера и готового сада</h2></div>
        <p className="intro">Мы создаём загородный дом как единый проект: архитектура, конструктив, инженерия, интерьер и территория разрабатываются одной командой и реализуются под единым контролем.</p>
      </div>
      <div id="services" className="architectureLine" aria-label="Направления работы FOREST capital">
        {services.map(([n,title,text],i)=><article key={title} className={`service s${i+1}`}>
          <span>{n}</span><div><h3>{title}</h3><p>{text}</p></div>
        </article>)}
      </div>
    </div>
    <style jsx>{`
      .company{background:linear-gradient(180deg,#111310,#151b17)}
      .companyHead{display:grid;grid-template-columns:1.35fr .65fr;gap:60px;align-items:end}
      .big{font-size:clamp(44px,6vw,88px);max-width:1050px;line-height:.96;margin:0}.intro{max-width:620px;color:#c4bfb5;font-size:17px;line-height:1.7;margin:0 0 8px}
      .architectureLine{margin-top:70px;display:grid;grid-template-columns:repeat(12,1fr);gap:0;position:relative;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
      .architectureLine:after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.32;pointer-events:none}
      .service{min-height:220px;padding:24px 22px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid var(--line);position:relative;background:rgba(255,255,255,.012);transition:.35s ease}
      .service:hover{background:rgba(170,139,88,.07);transform:translateY(-5px)}.service span{color:var(--gold);font-size:11px;letter-spacing:.12em}.service h3{font-size:20px;margin:0 0 8px}.service p{font-size:12px;line-height:1.55;color:#aaa69e;margin:0}.s1,.s2,.s3{grid-column:span 4}.s4,.s5,.s6{grid-column:span 4}.s3,.s6{border-right:0}
      @media(max-width:900px){.companyHead{grid-template-columns:1fr;gap:22px}.architectureLine{grid-template-columns:1fr 1fr}.service{grid-column:auto!important;min-height:190px}.service:nth-child(even){border-right:0}}
      @media(max-width:560px){.architectureLine{grid-template-columns:1fr}.service{border-right:0;min-height:155px}}
    `}</style>
  </section>
}

export function Advantages(){
  const a=[
    ['до 15 лет','гарантия на конструктив','Подтверждено действующим сайтом FOREST capital.'],
    ['до 50 лет','материалы и оборудование','Срок службы и гарантии отдельных решений.'],
    ['полный цикл','одна команда','Архитектура, инженерия, интерьер и территория.'],
    ['технадзор','каждый этап','Контроль качества на протяжении строительства.'],
    ['эскроу','безопасная схема','Современный формат расчётов при строительстве.'],
    ['аккредитация','ипотечная сделка','Сопровождение клиента по банковской части.'],
  ];
  return <section className="section adv"><div className="shell"><p className="eyebrow dark">Подтверждённые преимущества</p><div className="advgrid">{a.map(([n,t,d],i)=><article className={`advitem ${i===0?'heroStat':''}`} key={n}><strong>{n}</strong><span>{t}</span><p>{d}</p></article>)}</div><p className="proof">FOREST capital указывает на официальном сайте вхождение в топ-300 строительных компаний России. В production-версии рядом будет размещена ссылка на подтверждающий материал.</p></div><style jsx>{`
    .adv{background:var(--warm);color:var(--graphite)}.dark{color:#6e6b64}.advgrid{display:grid;grid-template-columns:repeat(12,1fr);gap:1px;background:#c9c4b9;margin-top:30px;border:1px solid #c9c4b9}.advitem{grid-column:span 4;background:var(--warm);padding:30px 24px;min-height:210px}.heroStat{grid-column:span 8}.advitem strong{display:block;font-family:var(--font-prata);font-size:clamp(34px,4vw,60px);color:#526052;margin-bottom:28px}.advitem span{font-size:15px;font-weight:700;display:block}.advitem p{font-size:12px;line-height:1.55;color:#77736b;margin:9px 0 0;max-width:320px}.proof{margin:18px 0 0;font-size:11px;color:#77736b;max-width:780px}
    @media(max-width:850px){.advitem,.heroStat{grid-column:span 6}}@media(max-width:560px){.advitem,.heroStat{grid-column:1/-1;min-height:170px}}
  `}</style></section>
}

export function ProjectsShowcase(){
  const cards=[
    ...projects.map(p=>({...p,verified:true})),
    ...projectPlaceholders.map(p=>({...p,href:'#contact',verified:false}))
  ];

  return <section id="projects" className="section projectsSection"><div className="shell">
    <div className="head">
      <div>
        <p className="eyebrow">Избранные проекты</p>
        <h2 className="display title">Не каталог. Коллекция архитектурных сценариев.</h2>
      </div>
      <a className="button" href={site.catalogUrl} target="_blank" rel="noreferrer">Смотреть все проекты</a>
    </div>

    <div className="projects">
      {cards.map((p,i)=><a className={`project project${i+1}`} key={p.name} href={p.href} target={p.verified?'_blank':undefined} rel={p.verified?'noreferrer':undefined}>
        <div className="projectArt">
          <div className="horizon"/>
          <div className="house"><i/><b/><em/></div>
          <div className="number">0{i+1}</div>
          {!p.verified && <div className="unverified">CMS SLOT · БЕЗ ВЫДУМАННЫХ ДАННЫХ</div>}
        </div>
        <div className="projectMeta"><span>{p.status}</span><h3>{p.name}</h3><p>{p.meta}</p></div>
      </a>)}
    </div>
  </div><style jsx>{`
    .projectsSection{background:#0d100e}.head{display:flex;justify-content:space-between;align-items:end;gap:30px}.title{font-size:clamp(42px,5.5vw,78px);line-height:.94;max-width:920px}
    .projects{display:grid;grid-template-columns:1.15fr .85fr;grid-template-rows:460px 400px;gap:16px;margin-top:42px}
    .project{position:relative;border:1px solid var(--line);border-radius:26px;overflow:hidden;text-decoration:none;background:#18211c;transition:.45s cubic-bezier(.2,.8,.2,1)}
    .project:hover{transform:translateY(-6px)}.project1{grid-row:1/3}.projectArt{position:absolute;inset:0;background:radial-gradient(circle at 72% 24%,#596c5e,#26372F 42%,#121713 88%);overflow:hidden}
    .horizon{position:absolute;left:-10%;right:-10%;bottom:24%;height:1px;background:rgba(216,211,200,.25);transform:rotate(-3deg)}
    .house{position:absolute;width:65%;height:36%;right:7%;bottom:18%;filter:drop-shadow(0 28px 28px rgba(0,0,0,.38))}
    .house i{position:absolute;inset:18% 0 0 0;background:#c5beb1}.house b{position:absolute;left:-8%;top:0;width:52%;height:100%;background:#222823}
    .house em{position:absolute;right:10%;bottom:10%;width:42%;height:52%;background:linear-gradient(#789090,#425b57);border:2px solid #18231e}
    .number{position:absolute;right:18px;top:16px;color:rgba(255,255,255,.3);font-size:11px;letter-spacing:.12em}
    .unverified{position:absolute;left:18px;top:16px;font-size:8px;letter-spacing:.1em;color:#c8c3b9;border:1px solid rgba(255,255,255,.14);padding:7px 9px;border-radius:999px;background:rgba(17,19,16,.45)}
    .projectMeta{position:absolute;left:24px;right:24px;bottom:22px}.projectMeta span{font-size:10px;color:var(--gold)}.projectMeta h3{font-size:27px;margin:8px 0 5px}.projectMeta p{margin:0;color:#bbb6ad;font-size:12px}
    @media(max-width:850px){.head{display:block}.head .button{margin-top:18px}.projects{grid-template-columns:1fr;grid-template-rows:none}.project,.project1{min-height:360px;grid-row:auto}}
  `}</style></section>
}

export function DemoHouse(){
  return <section id="demo" className="section demo"><div className="shell"><div className="demoGrid"><div className="copy"><p className="eyebrow">Демонстрационный дом · КП «Лесные улочки»</p><h2 className="display">{forest170.name}</h2><p className="intro">Готовый демонстрационный дом, который можно увидеть вживую и пройти онлайн. В production-версии здесь будут локальные фотографии экстерьера и интерьера, а также официальный 3D-тур.</p><div className="facts">{[forest170.area,forest170.bedrooms,forest170.kitchen,forest170.ceiling,forest170.windows,forest170.terrace,...forest170.extras].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div><div className="actions"><a className="button primary" href="#contact">Записаться на просмотр</a><a className="button" target="_blank" href={site.demoHouseUrl}>Прогуляться по дому онлайн ↗</a></div></div><div className="demoVisual" aria-label="Место для официальной галереи FOREST 170"><div className="frame f1"><span>Экстерьер</span></div><div className="frame f2"><span>Интерьер</span></div><p>OFFICIAL ASSET SLOT · заменить на локальные WebP/AVIF после получения материалов</p></div></div></div><style jsx>{`
    .demo{background:linear-gradient(135deg,#19211c,#101511)}.demoGrid{display:grid;grid-template-columns:.92fr 1.08fr;gap:50px;align-items:center}.copy h2{font-size:clamp(64px,9vw,126px);line-height:.86;margin:0 0 24px}.intro{color:#c1bcb2;line-height:1.65;max-width:640px}.facts{display:grid;grid-template-columns:1fr 1fr;margin:30px 0;border-top:1px solid var(--line)}.facts div{padding:15px 0;border-bottom:1px solid var(--line);display:grid;grid-template-columns:38px 1fr;gap:10px}.facts b{font-size:9px;color:var(--gold)}.facts span{font-size:12px}.actions{display:flex;gap:10px;flex-wrap:wrap}.demoVisual{height:650px;position:relative}.frame{position:absolute;border-radius:24px;border:1px solid var(--line);background:radial-gradient(circle at 65% 28%,#66786a,#2b4136 43%,#101411);box-shadow:0 30px 70px rgba(0,0,0,.28);display:flex;align-items:end;padding:20px}.frame span{font-family:var(--font-prata);font-size:30px}.f1{inset:0 18% 16% 0}.f2{width:46%;height:43%;right:0;bottom:0;background:radial-gradient(circle at 35% 35%,#816f59,#3c3931 50%,#151815)}.demoVisual p{position:absolute;right:0;top:0;width:42%;font-size:9px;color:#8f8b83;letter-spacing:.08em;text-transform:uppercase;line-height:1.5}
    @media(max-width:900px){.demoGrid{grid-template-columns:1fr}.demoVisual{height:520px}}@media(max-width:560px){.facts{grid-template-columns:1fr}.demoVisual{height:390px}.f1{inset:0 8% 12% 0}.f2{width:48%;height:39%}.demoVisual p{display:none}}
  `}</style></section>
}

export function ConstructionStages(){
  return <section id="steps" className="section stages"><div className="shell"><div className="stageHead"><div><p className="eyebrow">Как мы работаем</p><h2 className="display title">Семь этапов — одна ответственность</h2></div><p>В финальной версии линия будет связана с отдельной анимацией: дом постепенно формируется от чертежа до готового объекта.</p></div><div className="timeline">{stages.map((s,i)=><article className="stage" key={s}><b>{String(i+1).padStart(2,'0')}</b><span>{s}</span><i style={{width:`${((i+1)/stages.length)*100}%`}}/></article>)}</div></div><style jsx>{`
    .stages{background:#111310}.stageHead{display:grid;grid-template-columns:1fr .5fr;gap:40px;align-items:end}.stageHead>p{color:#aaa69e;line-height:1.6}.title{font-size:clamp(44px,6vw,84px);max-width:860px;line-height:.95}.timeline{margin-top:50px;border-top:1px solid var(--line)}.stage{display:grid;grid-template-columns:80px 1fr;position:relative;padding:24px 0;border-bottom:1px solid var(--line);font-size:20px;overflow:hidden}.stage b{color:var(--gold);font-size:11px}.stage i{position:absolute;left:0;bottom:-1px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);opacity:.6}.stage span{max-width:720px}@media(max-width:800px){.stageHead{grid-template-columns:1fr}.stage{grid-template-columns:55px 1fr;font-size:16px}}
  `}</style></section>
}

export function TechnologyCutaway(){
  const pts=[
    ['Фундамент', verifiedForest.forest170.technical[0]],
    ['Тёплый пол', verifiedForest.forest170.technical[1]],
    ['Окна', verifiedForest.forest170.technical[2]],
    ['Вентиляция', verifiedForest.forest170.technical[3]],
    ['Кровля', verifiedForest.forest170.technical[4]],
    ['Канализация', verifiedForest.forest170.technical[5]],
    ['Стены FOREST 126 v6.0', verifiedForest.forest126v6.technical[2]],
    ['Утепление FOREST 126 v6.0', verifiedForest.forest126v6.technical[3]],
    ['Армопояс FOREST 126 v6.0', verifiedForest.forest126v6.technical[4]],
    ['Плита FOREST 126 v6.0', verifiedForest.forest126v6.technical[0]],
  ] as const;
  const [active,setActive]=useState(0);

  return <section className="section tech"><div className="shell">
    <div className="techHead">
      <div><p className="eyebrow dark">Качество, которое видно изнутри</p><h2 className="display title">Технические решения — только с привязкой к конкретному дому</h2></div>
      <p>Мы убрали обобщения: характеристики ниже относятся только к FOREST 170 или FOREST 126 v6.0 и в дальнейшем будут храниться вместе с конкретным проектом в CMS.</p>
    </div>
    <div className="cutaway">
      <div className="diagram" role="img" aria-label="Интерактивный технологический разрез дома">
        <div className="roof"/><div className="body"><div className="window"/><div className="core"/></div><div className="foundation"/>
        {pts.map(([p],i)=><button key={p} className={active===i?'active':''} style={{left:`${10+(i%5)*19}%`,top:`${18+Math.floor(i/5)*52}%`}} onClick={()=>setActive(i)} aria-label={p}>{String(i+1).padStart(2,'0')}</button>)}
      </div>
      <aside><span>{String(active+1).padStart(2,'0')}</span><h3>{pts[active][0]}</h3><p>{pts[active][1]}</p><small>{active<6?'FOREST 170':'FOREST 126 v6.0'} · официальная спецификация. В production ссылка на источник хранится в данных проекта.</small></aside>
    </div>
  </div><style jsx>{`
    .tech{background:var(--warm);color:var(--graphite)}.dark{color:#747068}.techHead{display:grid;grid-template-columns:1fr .48fr;gap:40px;align-items:end}.techHead>p{color:#77736b;line-height:1.6}.title{font-size:clamp(40px,5.2vw,74px);max-width:970px;line-height:.95}
    .cutaway{display:grid;grid-template-columns:1.35fr .65fr;margin-top:40px;border:1px solid #cbc5b9;border-radius:28px;overflow:hidden;min-height:580px}.diagram{position:relative;background:linear-gradient(180deg,#e9e5dd,#d8d2c7);overflow:hidden}
    .roof{position:absolute;left:15%;right:10%;top:28%;height:8%;background:#3b473f}.body{position:absolute;left:18%;right:13%;top:36%;bottom:17%;background:#c5beb1;border:2px solid #526052}.window{position:absolute;right:8%;top:16%;width:38%;height:58%;background:#84989a;border:3px solid #526052}.core{position:absolute;left:10%;top:12%;bottom:12%;width:36%;border:2px dashed #798078}.foundation{position:absolute;left:13%;right:8%;bottom:12%;height:5%;background:#6e756c}
    .diagram button{position:absolute;width:42px;height:42px;border-radius:50%;border:1px solid #526052;background:#f2f0ea;color:#526052;cursor:pointer;transition:.25s}.diagram button.active{background:#526052;color:white;transform:scale(1.12)}
    aside{padding:42px;background:#111310;color:white;display:flex;flex-direction:column;justify-content:center}aside span{color:var(--gold);font-size:12px}aside h3{font-family:var(--font-prata);font-size:42px;font-weight:400;margin:15px 0}aside p{color:#d2cdc4;line-height:1.6}aside small{color:#8f8b83;line-height:1.5;margin-top:22px}
    @media(max-width:850px){.techHead,.cutaway{grid-template-columns:1fr}.diagram{min-height:430px}aside{min-height:280px}}@media(max-width:560px){.diagram{min-height:360px}.diagram button{width:34px;height:34px;font-size:10px}}
  `}</style></section>
}

const portfolioTabs = {
  'Готовые дома':['FOREST 126 v2.0 · КП «Заповедник»','FOREST 126 v1 · КП «Заповедник»','FOREST 170 · КП «Лесные улочки»'],
  'Строим сейчас':['Актуальные строительные площадки','Объекты в работе','Отчёты с этапов строительства'],
  'Интерьеры':['FOREST 170 · кухня-гостиная','Интерьерные визуализации','Чистовая отделка объектов'],
  'Благоустройство':['Террасы и маршруты участка','Ландшафтные решения','Архитектурная подсветка'],
} as const;

export function Portfolio(){
  const keys=Object.keys(portfolioTabs) as (keyof typeof portfolioTabs)[];const [tab,setTab]=useState<(typeof keys)[number]>(keys[0]);
  return <section id="portfolio" className="section portfolio"><div className="shell"><div className="head"><div><p className="eyebrow">Реализованные объекты</p><h2 className="display title">Строительство без декораций</h2></div><p>Финальная версия использует локальные фото и видео только из официального портфолио FOREST capital.</p></div><div className="tabs" role="tablist">{keys.map(x=><button role="tab" aria-selected={tab===x} className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div><div className="portfolioGrid">{portfolioTabs[tab].map((x,i)=><article className={`ph ph${i+1}`} key={x}><div className="asset"><span>OFFICIAL MEDIA SLOT</span></div><div><small>{tab}</small><b>{x}</b></div></article>)}</div><a className="button" href="https://forestekb.ru/realizovannye-proekty" target="_blank">Открыть официальное портфолио ↗</a></div><style jsx>{`
    .portfolio{background:#0e110f}.head{display:grid;grid-template-columns:1fr .45fr;gap:40px;align-items:end}.head>p{color:#aaa69e;line-height:1.6}.title{font-size:clamp(44px,6vw,84px);line-height:.94}.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:34px 0}.tabs button{border:1px solid var(--line);border-radius:999px;background:transparent;color:white;padding:11px 15px;cursor:pointer}.tabs button.active{background:var(--warm);color:var(--graphite)}.portfolioGrid{display:grid;grid-template-columns:1.15fr .85fr;grid-template-rows:250px 250px;gap:14px;margin-bottom:25px}.ph{border:1px solid var(--line);border-radius:24px;overflow:hidden;position:relative;background:#18221c}.ph1{grid-row:1/3}.asset{position:absolute;inset:0;background:radial-gradient(circle at 70% 28%,#4c6253,#233128 48%,#111310)}.asset span{position:absolute;top:18px;right:18px;font-size:8px;letter-spacing:.12em;color:#a29d94}.ph>div:last-child{position:absolute;left:22px;right:22px;bottom:20px}.ph small{display:block;color:var(--gold);font-size:10px;margin-bottom:6px}.ph b{font-size:22px}.ph2 .asset{background:radial-gradient(circle at 35% 35%,#62594b,#292d27 52%,#111310)}.ph3 .asset{background:radial-gradient(circle at 60% 30%,#5a695d,#27342c 50%,#111310)}
    @media(max-width:800px){.head{grid-template-columns:1fr}.portfolioGrid{grid-template-columns:1fr;grid-template-rows:none}.ph,.ph1{min-height:280px;grid-row:auto}}
  `}</style></section>
}

export function LocationsMortgageMedia(){
  const locations=['КП «Заповедник»','КП «Родные просторы»','КП «Кадниково»','КП «Лесные улочки»','Сысертский район','Челябинский тракт','Нижний Тагил','Екатеринбург и основные направления области'];
  return <>
    <section className="section locations"><div className="shell locGrid"><div><p className="eyebrow">География строительства</p><h2 className="display title">Там, где город заканчивается и начинается пространство.</h2><div className="chips">{locations.map(x=><span key={x}>{x}</span>)}</div></div><div className="map" aria-label="Стилизованная карта направлений строительства"><div className="ring r1"/><div className="ring r2"/><div className="ring r3"/>{locations.slice(0,6).map((x,i)=><i key={x} style={{left:`${18+(i*13)%67}%`,top:`${20+(i*19)%63}%`}}><b/>{x}</i>)}</div></div></section>
    <section className="section mortgage"><div className="shell mortgageGrid"><div><p className="eyebrow dark">Ипотека и безопасность сделки</p><h2 className="display">Прозрачный путь от решения до договора</h2></div><div className="mortgageItems">{['Строительство с эскроу-счётом','Аккредитация в банках','Консультация ипотечного брокера','Подбор программы','Подготовка документов','Сопровождение сделки'].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div></div></section>
    <section id="media" className="section media"><div className="shell mediaGrid"><div><p className="eyebrow">Медиа и Telegram</p><h2 className="display">Показываем строительство без декораций</h2><p>В Telegram FOREST capital публикует новые проекты, реальные этапы строительства, инженерные решения, интерьеры, благоустройство и полезные материалы для будущих владельцев домов.</p><a className="button primary" href={site.telegram} target="_blank">Перейти в Telegram ↗</a></div><div className="posts">{['Новые проекты','Этапы строительства','Инженерные решения','Интерьеры и благоустройство'].map((x,i)=><article key={x}><span>0{i+1}</span><b>{x}</b><small>Актуальная публикация будет управляться через CMS, без browser-side парсинга Telegram.</small></article>)}</div></div></section>
    <style jsx>{`
      .locations{background:#19211c}.locGrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:45px;align-items:center}.title{font-size:clamp(42px,5.4vw,78px);line-height:.94}.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:30px}.chips span{border:1px solid var(--line);padding:10px 12px;border-radius:999px;font-size:11px}.map{height:540px;border:1px solid var(--line);border-radius:28px;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 50%,#31463b,#1a2520 48%,#101511)}.ring{position:absolute;border:1px solid rgba(216,211,200,.18);border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}.r1{width:26%;aspect-ratio:1}.r2{width:52%;aspect-ratio:1}.r3{width:82%;aspect-ratio:1}.map i{position:absolute;font-style:normal;font-size:9px;color:#d0cbc1;max-width:130px}.map i b{display:block;width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 6px rgba(170,139,88,.12);margin-bottom:7px}
      .mortgage{background:var(--warm);color:var(--graphite)}.mortgageGrid{display:grid;grid-template-columns:.85fr 1.15fr;gap:50px}.mortgage h2{font-size:clamp(42px,5vw,72px);line-height:.96}.dark{color:#77736b}.mortgageItems{border-top:1px solid #c9c4b9}.mortgageItems div{display:grid;grid-template-columns:50px 1fr;padding:18px 0;border-bottom:1px solid #c9c4b9}.mortgageItems b{font-size:10px;color:#677368}.mortgageItems span{font-size:16px}
      .media{background:#111310}.mediaGrid{display:grid;grid-template-columns:.75fr 1.25fr;gap:50px}.media h2{font-size:clamp(44px,5.5vw,78px);line-height:.94}.media p{color:#bbb6ac;line-height:1.65;max-width:620px}.posts{display:grid;grid-template-columns:1fr 1fr;gap:12px}.posts article{min-height:220px;border:1px solid var(--line);border-radius:22px;padding:22px;display:flex;flex-direction:column;background:rgba(255,255,255,.018)}.posts span{color:var(--gold);font-size:10px}.posts b{font-size:20px;margin:auto 0 10px}.posts small{color:#8f8b83;line-height:1.5}
      @media(max-width:900px){.locGrid,.mortgageGrid,.mediaGrid{grid-template-columns:1fr}.map{height:430px}}@media(max-width:560px){.posts{grid-template-columns:1fr}.map{height:340px}}
    `}</style>
  </>
}
