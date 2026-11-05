'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import ProductClient from '../produto/[id]/ProductClient';

/** Static export compatible route for CRM products added after deployment. */
export default function DynamicProduct(){
 const [slug,setSlug]=useState<string|null>(null);
 useEffect(()=>{setSlug(new URLSearchParams(window.location.search).get('sku')||'')},[]);
 if(slug===null)return <main id="conteudo" className="wrap detail-page"><p>Carregando detalhes do catálogo…</p></main>;
 if(!slug)return <main id="conteudo" className="wrap detail-page"><h1>Produto não informado.</h1><Link href="/catalogo/">Voltar ao catálogo</Link></main>;
 return <ProductClient id={slug}/>;
}
