import Catalog from '@/components/Catalog';
import {categories} from '@/data/products';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return categories.map(c=>({slug:c.id}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${categories.find(c=>c.id===slug)?.name||'Categoria'} | Macumbiinha`}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!categories.some(c=>c.id===slug))notFound();return <Catalog category={slug}/>}
