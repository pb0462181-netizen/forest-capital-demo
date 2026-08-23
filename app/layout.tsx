import type { Metadata, Viewport } from 'next';
import { Manrope, Prata } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';
import { ConsentAnalytics } from '@/components/ConsentAnalytics';
import { AnalyticsBridge } from '@/components/AnalyticsBridge';
import { MotionControls } from '@/components/MotionControls';

const manrope = Manrope({ subsets:['cyrillic','latin'], variable:'--font-manrope', display:'swap' });
const prata = Prata({ subsets:['cyrillic','latin'], weight:'400', variable:'--font-prata', display:'swap' });

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL || 'https://forestekb.ru';

export const viewport: Viewport = {
  width:'device-width',
  initialScale:1,
  themeColor:'#111310',
  colorScheme:'dark light',
};

export const metadata: Metadata = {
  metadataBase:new URL(siteUrl),
  title:'FOREST capital — строительство загородных домов комфорт+ и бизнес-класса в Екатеринбурге',
  description:'FOREST capital проектирует и строит современные загородные дома под ключ в Екатеринбурге и Свердловской области: архитектура, инженерия, интерьер и благоустройство.',
  alternates:{canonical:'/'},
  openGraph:{
    title:'FOREST capital',
    description:'Современные загородные дома полного цикла в Екатеринбурге и Свердловской области',
    type:'website',
    locale:'ru_RU',
    url:'/',
    siteName:'FOREST capital',
  },
  twitter:{card:'summary_large_image',title:'FOREST capital',description:'Современные загородные дома полного цикла'},
  robots:{index:true,follow:true},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  const schema={
    '@context':'https://schema.org',
    '@type':'HomeAndConstructionBusiness',
    name:site.brand,
    url:siteUrl,
    telephone:site.phone,
    email:site.emails[0],
    address:{
      '@type':'PostalAddress',
      streetAddress:'ул. Чкалова, 18',
      addressLocality:'Екатеринбург',
      addressCountry:'RU'
    },
    areaServed:'Екатеринбург и Свердловская область',
    sameAs:[site.telegram]
  };

  return <html lang="ru"><body className={`${manrope.variable} ${prata.variable}`}>
    {children}
    <AnalyticsBridge/>
    <ConsentAnalytics/>
    <MotionControls/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  </body></html>;
}
