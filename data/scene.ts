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
    { p: 0.00, position: [13.5, 4.4, 17.5], target: [0.3, 1.35, 0] },
    { p: 0.18, position: [9.2, 3.3, 11.8], target: [0.6, 1.4, 0] },
    { p: 0.36, position: [-9.4, 3.1, 8.7], target: [0.0, 1.3, 0] },
    { p: 0.56, position: [5.1, 2.6, 7.0], target: [1.0, 1.35, 1.3] },
    { p: 0.74, position: [1.8, 1.9, 4.0], target: [1.2, 1.45, 2.8] },
    { p: 0.88, position: [0.8, 1.75, 2.5], target: [0.6, 1.45, 4.2] },
    { p: 1.00, position: [11.8, 4.3, 14.2], target: [0.4, 1.35, .3] },
  ],

  labels: [
    { p: .20, text: 'Индивидуальная архитектура' },
    { p: .27, text: 'Панорамное остекление' },
    { p: .34, text: 'Единая концепция дома и ландшафта' },
    { p: .43, text: 'Монолитный фундамент' },
    { p: .50, text: 'Стены и конструктив' },
    { p: .57, text: 'Кровля и фасад' },
    { p: .64, text: 'Инженерные системы' },
    { p: .78, text: 'Переход в интерьер' },
    { p: .92, text: 'Готовый дом и благоустройство' },
  ],

  replacement: {
    note:
      'Демонстрационная геометрия вдохновлена общей архитектурной стилистикой публичного портфолио FOREST capital, но не является копией или реальным проектом FOREST. После получения утверждённой модели положите оптимизированные GLB в public/models и переключите usePlaceholder=false.',
  },
} as const;
