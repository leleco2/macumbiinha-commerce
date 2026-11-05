import InfoPage from '@/components/InfoPage';
import {notFound} from 'next/navigation';
const pages=['sobre','atacado','atendimento','informacoes','privacidade'];
export function generateStaticParams(){return pages.map(info=>({info}))}
export async function generateMetadata({params}:{params:Promise<{info:string}>}){const {info}=await params;const titles:Record<string,string>={sobre:'Sobre a marca',atacado:'Atacado & revenda',atendimento:'Atendimento',informacoes:'Informações de compra',privacidade:'Privacidade'};return {title:`${titles[info]||'Informações'} | Macumbiinha`}}
export default async function Page({params}:{params:Promise<{info:string}>}){const {info}=await params;if(!pages.includes(info))notFound();return <InfoPage slug={info}/>}
