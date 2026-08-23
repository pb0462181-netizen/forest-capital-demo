export const site = {
  brand: 'FOREST capital',
  phone: '+7 (343) 226 42 86',
  phoneHref: 'tel:+73432264286',
  secondaryPhone: '+7 (967) 555-60-94',
  emails: ['dom@forestekb.ru', 'stroy@forestekb.ru'],
  address: 'Екатеринбург, ул. Чкалова, 18',
  hours: 'Пн–Пт 9:00–18:00, Сб–Вс по договорённости',
  telegram: 'https://t.me/forestekb',
  consultationTelegram: 'https://t.me/domaekb',
  demoHouseUrl: 'https://forestekb.ru/demo-dom',
  catalogUrl: 'https://forestekb.ru/catalog',
  portfolioUrl: 'https://forestekb.ru/realizovannye-proekty',
  legal: {
    owner: 'ИП Горяйнов Александр Витальевич',
    inn: '662338500562',
    ogrnip: '317665800034280',
    pdRegistry: '66-25-075072',
  }
};

export const heroSteps = [
  { id: 'arrival', eyebrow: 'Загородные дома комфорт+ и бизнес-класса', title: 'Проектируем, строим и полностью оснащаем дома для жизни', body: 'Екатеринбург и Свердловская область.' },
  { id: 'architecture', eyebrow: 'Архитектура', title: 'Дом раскрывается постепенно', body: 'Индивидуальная архитектура · панорамное остекление · продуманная посадка · единая концепция дома и ландшафта.' },
  { id: 'assembly', eyebrow: 'Как создаётся дом', title: 'От участка до благоустройства', body: 'Фундамент, конструктив, кровля, окна, инженерия, фасад, интерьер и территория — одна последовательная система.' },
  { id: 'engineering', eyebrow: 'Инженерия', title: 'Красивый дом начинается с решений, которые обычно не видны', body: 'Отопление, вентиляция, электрика, водоснабжение и сценарии умного дома.' },
  { id: 'interior', eyebrow: 'Внутри', title: 'Архитектура, интерьер и инженерия — единое пространство для жизни', body: 'Естественный свет, дерево, камень, спокойные фактуры и продуманные сценарии.' },
  { id: 'finale', eyebrow: 'FOREST capital', title: 'Строим дома, в которые хочется возвращаться', body: 'Начнём с вашего участка и образа жизни.' },
] as const;

export const forest170 = {
  name: 'FOREST 170',
  area: '170 м²',
  bedrooms: '3 спальни',
  kitchen: 'Кухня-гостиная 52 м²',
  ceiling: 'Потолки 3,2 м',
  windows: 'Панорамные окна 2,7 м',
  terrace: 'Терраса 60 м²',
  extras: ['Сауна', 'Гардеробная', 'Постирочная'],
  location: 'КП «Лесные улочки»',
};

export const projects = [
  {
    name: 'FOREST 170',
    meta: '170 м² · 3 спальни · терраса 60 м²',
    href: 'https://forestekb.ru/demo-dom',
    status: 'Построен · готовый дом в продаже',
  },
  {
    name: 'FOREST 126 v6.0',
    meta: '125,05 м² · терраса 20,34 м² · без гаража',
    href: 'https://forestekb.ru/catalog/dom-126-v6',
    status: 'Проект',
  },
] as const;

export const projectPlaceholders = [
  { name:'Проект с плоской кровлей', meta:'Выбрать подтверждённый проект из CMS', status:'Ожидает подтверждения' },
  { name:'Проект с гаражом', meta:'Выбрать подтверждённый проект из CMS', status:'Ожидает подтверждения' },
] as const;

export const stages = [
  'Консультация и определение задачи',
  'Анализ или подбор участка',
  'Проектирование и согласование',
  'Расчёт и договор',
  'Подготовка участка',
  'Строительство, инженерия и отделка',
  'Благоустройство и передача ключей'
];
