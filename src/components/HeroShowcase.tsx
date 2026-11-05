'use client';

import {useRef,useState, type PointerEvent} from 'react';
import Link from 'next/link';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import ProductArt from './ProductArt';

type Mode = 'varejo' | 'atacado';

const highlights = [
  {id:'cases',index:'01',label:'Cases & organização',title:'Tudo no lugar.',note:'Cases e acessórios para quem gosta de organização.',tone:'sage'},
  {id:'dichavadores',index:'02',label:'Dichavadores',title:'O detalhe certo.',note:'Formatos, acabamentos e materiais para descobrir.',tone:'clay'},
  {id:'kits',index:'03',label:'Kits & combinações',title:'Mais de um jeito.',note:'Seleções para combinar acessórios do seu jeito.',tone:'butter'},
] as const;

/** Controlled editorial feature rail: no third-party carousel, timer or layout shifts. */
export default function HeroShowcase({mode}: {mode:Mode}) {
  const [active,setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const current=highlights[active];

  const move = (event:PointerEvent<HTMLDivElement>) => {
    if(event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds=event.currentTarget.getBoundingClientRect();
    const x=(event.clientX-bounds.left)/bounds.width-.5;
    const y=(event.clientY-bounds.top)/bounds.height-.5;
    stage.current?.style.setProperty('--parallax-x',`${(x*15).toFixed(1)}px`);
    stage.current?.style.setProperty('--parallax-y',`${(y*12).toFixed(1)}px`);
  };
  const reset = () => {
    stage.current?.style.setProperty('--parallax-x','0px');
    stage.current?.style.setProperty('--parallax-y','0px');
  };

  return <div ref={stage} className={`showcase showcase--${current.tone}`} onPointerMove={move} onPointerLeave={reset} aria-label="Categorias em destaque">
    <div className="showcase-top">
      <span className="showcase-topline"><span className="showcase-signal"/>EM DESTAQUE <span className="showcase-separator">/</span> MACUMBIINHA EDITION</span>
      <span className="showcase-count">{current.index} <span>/ 03</span></span>
    </div>
    <div className="showcase-canvas" key={current.id}>
      <span className="showcase-oversized" aria-hidden="true">m.</span>
      <div className="showcase-halo" aria-hidden="true"/>
      <div className="showcase-sheet" aria-hidden="true">
        <span className="showcase-sheet-top">MACUMBIINHA <span>NO. {current.index}</span></span>
        <div className="showcase-sheet-art"><ProductArt category={current.id} variant={active} decorative/></div>
        <span className="showcase-sheet-bottom">DETAILS MAKE IT YOURS.</span>
      </div>
      <div className="showcase-stamp" aria-hidden="true"><span>FEITO PRA</span><strong>ESCOLHER</strong><ArrowUpRight size={20}/></div>
      <div className="showcase-tag" aria-hidden="true">VITRINE / {current.index}<br/>ACESSÓRIOS & ESTILO</div>
    </div>
    <div className="showcase-caption" aria-live="polite">
      <div><span className="showcase-kicker">{mode==='atacado'?'IDEIAS PARA SUA VITRINE':'UM PONTO DE PARTIDA'}</span><strong>{current.title}</strong><p>{current.note}</p></div>
      <Link href={`/categoria/${current.id}/`} className="showcase-link" aria-label={`Explorar categoria ${current.label}`}><ArrowUpRight size={21}/></Link>
    </div>
    <div className="showcase-tabs" role="group" aria-label="Selecionar destaque do catálogo">
      {highlights.map((item,index)=><button type="button" key={item.id} aria-pressed={index===active} className={index===active?'is-active':''} onClick={()=>{setActive(index);reset()}}>
        <span>{item.index}</span><span>{item.label}</span><ArrowRight size={14}/>
      </button>)}
    </div>
    <span className="sr-only">Imagens conceituais de categorias. Consulte fotos e características dos produtos com a loja.</span>
  </div>;
}
