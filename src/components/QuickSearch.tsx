'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useMemo,useState} from 'react';
import {Search,ArrowRight,ArrowUpRight} from 'lucide-react';
import {categories} from '@/data/products';
import {productHref} from '@/lib/catalogBridge';
import {useShop} from './Shop';
import {searchCatalog} from '@/lib/catalogSearch';

/** Accessible, lightweight catalog search; all suggestions come from local store data. */
export default function QuickSearch(){
 const {catalog:products}=useShop();
 const [query,setQuery]=useState('');
 const [focused,setFocused]=useState(false);
 const pathname=usePathname();
 useEffect(()=>{setFocused(false);setQuery('')},[pathname]);
 const matches=useMemo(()=>{
   if(query.trim().length<2)return [];
   return searchCatalog(products,query,Object.fromEntries(categories.map(c=>[c.id,c.name]))).slice(0,4);
 },[query,products]);
 const show=focused&&query.trim().length>=2;
 return <div className="quick-search" onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setFocused(false)}}>
   <form className="header-search" action="/catalogo/" role="search">
     <Search size={18} aria-hidden="true"/>
     <input name="q" autoComplete="off" value={query} onChange={event=>setQuery(event.target.value)} onFocus={()=>setFocused(true)} aria-label="Buscar no catálogo" aria-expanded={show} aria-controls="quick-search-results" placeholder="Buscar produtos, marcas, materiais..."/>
     <button type="submit" aria-label="Buscar no catálogo"><ArrowRight size={19}/></button>
   </form>
   {show&&<div id="quick-search-results" className="quick-search-results">
     <div className="quick-search-heading"><span>RESULTADOS NO CATÁLOGO</span><span>{matches.length?'Prévia':'Nenhum encontrado'}</span></div>
     {matches.map(p=><Link key={p.id} className="quick-result" href={productHref(p)} onClick={()=>setFocused(false)}>
       <span className="quick-result-mark">{p.name.slice(0,1).toUpperCase()}</span>
       <span><strong>{p.name}</strong><small>{categories.find(c=>c.id===p.category)?.name}</small></span>
       <ArrowUpRight size={16}/>
     </Link>)}
     {!matches.length&&<p className="quick-no-results">Tente outro termo ou explore todas as categorias.</p>}
     <Link href={`/catalogo/?q=${encodeURIComponent(query.trim())}`} className="quick-all" onClick={()=>setFocused(false)}>Ver todos os resultados <ArrowRight size={16}/></Link>
   </div>}
 </div>
}
