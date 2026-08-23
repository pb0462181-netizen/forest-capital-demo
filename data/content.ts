export const contentConfig = {
  advantages: [
    { value:'до 15 лет', label:'гарантия на конструктив', verified:true },
    { value:'до 50 лет', label:'срок службы и гарантии отдельных материалов', verified:true },
    { value:'полный цикл', label:'одна команда и единая ответственность', verified:true },
    { value:'технадзор', label:'контроль каждого этапа', verified:true },
    { value:'эскроу', label:'безопасная схема расчётов', verified:true },
    { value:'аккредитация', label:'сопровождение ипотечной сделки', verified:true },
  ],
  mutable: {
    prices: null,
    currentMortgageRate: null,
    buildCount: null,
    top300ReferenceUrl: null,
  }
} as const;
