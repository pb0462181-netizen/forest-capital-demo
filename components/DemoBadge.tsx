export function DemoBadge(){
  return <div className="demoBadge">
    <b>DEMO CONCEPT</b>
    <span>Авторская демонстрационная архитектура · не копия проекта FOREST</span>
    <style jsx>{`
      .demoBadge{position:fixed;z-index:44;left:18px;bottom:18px;display:flex;align-items:center;gap:10px;
        padding:9px 12px;border:1px solid rgba(242,240,234,.14);border-radius:999px;
        background:rgba(17,19,16,.68);backdrop-filter:blur(14px);color:#d8d3c8}
      b{font-size:9px;letter-spacing:.14em;color:#AA8B58}span{font-size:9px}
      @media(max-width:700px){.demoBadge{left:12px;bottom:58px;max-width:260px}span{display:none}}
    `}</style>
  </div>;
}
