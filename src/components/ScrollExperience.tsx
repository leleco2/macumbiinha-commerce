'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

/** Progressive enhancement: all content stays visible without JS or under reduced-motion. */
export default function ScrollExperience(){
 const pathname=usePathname();
 useEffect(()=>{
   if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const targets=Array.from(document.querySelectorAll<HTMLElement>(
     '.section-heading, .brand-line, .benefits > div, .category-card, .buying-guide, .editorial, .wholesale-banner, .about-strip, .faq, .catalog-hero, .info-hero'
   ));
   const observer=new IntersectionObserver(entries=>{
     for(const entry of entries)if(entry.isIntersecting){
       entry.target.classList.add('is-revealed');
       observer.unobserve(entry.target);
     }
   },{threshold:.08,rootMargin:'0px 0px -35px 0px'});
   for(const [index,element] of targets.entries()){
     // Never conceal content already within the initial viewport.
     if(element.getBoundingClientRect().top<window.innerHeight*.9)continue;
     element.classList.add('reveal-on-scroll');
     element.style.setProperty('--reveal-order',String(index%4));
     observer.observe(element);
   }
   return ()=>observer.disconnect();
 },[pathname]);
 return null;
}
