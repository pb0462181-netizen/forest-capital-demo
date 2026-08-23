import { Header } from '@/components/Header';
import { HeroExperience } from '@/components/HeroExperience';
import { CompanyIntro, Advantages, ProjectsShowcase, DemoHouse, ConstructionStages, TechnologyCutaway, Portfolio, LocationsMortgageMedia } from '@/components/Sections';
import { LeadForm } from '@/components/LeadForm';
import { Footer } from '@/components/Footer';
export default function Page(){return <><Header/><main><HeroExperience/><CompanyIntro/><Advantages/><ProjectsShowcase/><DemoHouse/><ConstructionStages/><TechnologyCutaway/><Portfolio/><LocationsMortgageMedia/><section id="contact" className="section"><div className="shell leadgrid"><div><p className="eyebrow">Консультация архитектора</p><h2 className="display">Начнём с вашего участка и образа жизни</h2><p className="muted">За 30 минут обсудим будущий дом, предложим направление по планировке и определим ориентир по бюджету.</p></div><LeadForm/></div></section></main><Footer/><style>{`.leadgrid{display:grid;grid-template-columns:.85fr 1.15fr;gap:50px}.leadgrid h2{font-size:clamp(42px,5vw,76px);line-height:.98}@media(max-width:900px){.leadgrid{grid-template-columns:1fr}}`}</style></>}
