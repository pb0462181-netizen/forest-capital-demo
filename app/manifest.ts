import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:'FOREST capital',
    short_name:'FOREST',
    description:'Строительство загородных домов комфорт+ и бизнес-класса в Екатеринбурге',
    start_url:'/',
    display:'standalone',
    background_color:'#111310',
    theme_color:'#111310',
    icons:[],
  };
}
