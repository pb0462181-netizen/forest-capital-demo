export const sceneConfig = {
  usePlaceholder: true,
  demoMode: true,

  models: {
    desktop: '/models/forest-170.glb',
    mobile: '/models/forest-170-mobile.glb',
  },

  modelTransform: {
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1,
  },

  quality: {
    desktop: { treeCount: 34, dpr: 1.5, shadows: true },
    mobile: { treeCount: 16, dpr: 1.15, shadows: false },
    low: { treeCount: 8, dpr: 1, shadows: false },
  },

  cameraPath: [
    {
      p: 0.00,
      position: [12.8, 4.6, 16.8],
      target: [0.2, 1.35, 0.4],
    },

    {
      p: 0.16,
      position: [10.6, 4.0, 13.6],
      target: [0.2, 1.35, 0.6],
    },

    {
      p: 0.32,
      position: [-11.8, 4.1, 11.2],
      target: [-0.2, 1.3, 0.4],
    },

    {
      p: 0.48,
      position: [-8.6, 3.6, 10.8],
      target: [0.2, 1.35, 0.8],
    },

    {
      p: 0.64,
      position: [9.8, 3.7, 10.6],
      target: [0.8, 1.4, 0.8],
    },

    {
      p: 0.78,
      position: [7.4, 3.1, 8.8],
      target: [1.0, 1.4, 1.6],
    },

    {
      p: 0.90,
      position: [-7.8, 3.2, 8.6],
      target: [-0.2, 1.35, 1.2],
    },

    {
      p: 1.00,
      position: [12.2, 4.5, 15.2],
      target: [0.3, 1.35, 0.5],
    },
  ],

  labels: [
    { p: 0.20, text: 'Индивидуальная архитектура' },
    { p: 0.27, text: 'Панорамное остекление' },
    { p: 0.34, text: 'Единая концепция дома и ландшафта' },
    { p: 0.43, text: 'Монолитный фундамент' },
    { p: 0.50, text: 'Стены и конструктив' },
    { p: 0.57, text: 'Кровля и фасад' },
    { p: 0.64, text: 'Инженерные системы' },
    { p: 0.78, text: 'Переход в интерьер' },
    { p: 0.92, text: 'Готовый дом и благоустройство' },
  ],

  replacement: {
    note:
      'Демонстрационная геометрия вдохновлена общей архитектурной стилистикой публичного портфолио FOREST capital, но не является копией или реальным проектом FOREST. После получения утверждённой модели положите оптимизированные GLB в public/models и переключите usePlaceholder=false.',
  },
} as const;
