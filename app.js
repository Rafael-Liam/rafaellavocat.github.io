const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const u=s=>encodeURI(s);
const seq=(b,e,k)=>[b+'.'+e,...Array.from({length:k},(_,i)=>`${b} ${i+1}.${e}`)];

/* ===== DONNÉES : ajoute ici tes futures réalisations ===== */
const CATS={
 reseaux:{t:'Réseaux sociaux',d:"Carrousels et posts Instagram, publications LinkedIn : du contenu pensé pour être lu, sauvegardé et partagé.",s:['Carrousels','Battles','LinkedIn']},
 ecole:{t:'Projets école',d:"Des entreprises fictives (Trip & Chill, Netflix) mais des exigences réelles : identité de marque, ton, formats courts.",s:['Vidéos','Carrousels','Posts']},
 ecommerce:{t:'E-commerce',d:"Deux boutiques Shopify créées de zéro et une refonte UX du site Zara.",s:['Boutiques','Refonte UX']}
};
const P=[
{cat:'reseaux',sub:'Carrousels',tag:'Instagram / carrousel',title:"L'ascension de Drake",desc:"Carrousel retraçant le parcours et la montée en puissance de l'artiste.",imgs:seq('drake','jpeg',3),r:'4/5'},
{cat:'reseaux',sub:'Carrousels',tag:'Instagram / immobilier',title:'Appartement à vendre',desc:"Découvrez chaque pièce avant de planifier votre visite. La dernière slide invite à contacter l'agent immobilier.",imgs:seq('immo','jpg',5),r:'4/5'},
{cat:'reseaux',sub:'Carrousels',tag:'Instagram / carrousel',title:'Top streamers Spotify',desc:"Les artistes les plus écoutés sur Spotify : classement et chiffres clés.",imgs:seq('spotify','jpeg',3),r:'4/5'},
{cat:'reseaux',sub:'Carrousels',tag:'Instagram / carrousel',title:"Le retour d'Indila",desc:"Carrousel annonçant et célébrant le grand retour de l'artiste.",imgs:seq('indila','jpeg',3),r:'4/5'},
{cat:'reseaux',sub:'Battles',tag:'Instagram / post comparatif',title:'Luidji vs Zamdane',desc:"Comparatif chiffré : écoutes mensuelles, nombre d'albums et autres statistiques.",imgs:['battle luidgi.jpeg']},
{cat:'reseaux',sub:'Battles',tag:'Instagram / post comparatif',title:'Travis Scott vs Playboi Carti',desc:"Comparatif chiffré : écoutes mensuelles, nombre d'albums et autres statistiques.",imgs:['battle travis.jpeg']},
{cat:'reseaux',sub:'LinkedIn',tag:'LinkedIn / post professionnel',title:'My Music Ads',desc:"Post rédigé pour le compte du CEO de My Music Ads.",imgs:['linkedin mika 1.jpeg']},
{cat:'reseaux',sub:'LinkedIn',tag:'LinkedIn / post professionnel',title:'My Music Ads',desc:"Post rédigé pour le compte du CEO de My Music Ads.",imgs:['linkedin mika 2.jpeg']},
{cat:'reseaux',sub:'LinkedIn',tag:'LinkedIn / post professionnel',title:'Decupler, agence SEO',desc:"Post de réflexion professionnelle autour de l'IA et de ses enjeux actuels.",imgs:['linkedin nathan.jpeg']},
{cat:'ecole',sub:'Vidéos',tag:'Trip & Chill / TikTok',title:'Voyage à Venise',desc:"Vidéo TikTok pour une offre de voyage étudiant à Venise.",yt:'SlumHJwt-K8'},
{cat:'ecole',sub:'Vidéos',tag:'Trip & Chill / story Instagram',title:'Teasing offre étudiante',desc:"Format story pour annoncer une offre de voyage à prix réduit.",yt:'boIuB-nyfwg'},
{cat:'ecole',sub:'Carrousels',tag:'Projet fictif / carrousel',title:'Netflix',desc:"Carrousel créatif imaginé pour Netflix dans le cadre d'un exercice.",imgs:[...seq('netflix','jpeg',4),'netflix 5.jpg'],r:'1/1'},
{cat:'ecole',sub:'Posts',tag:'X / post fictif',title:'Netflix, tweet',desc:"Post X imaginé pour la marque Netflix dans le cadre d'un exercice créatif.",imgs:['twitter.jpeg']},
{cat:'ecommerce',sub:'Boutiques',tag:'Projet perso / Shopify',title:'Montessia',desc:"Boutique de boîtes de montre haut de gamme : identité visuelle, boutique Shopify, catalogue produit et stratégie de contenu.",imgs:['montessia.jpeg']},
{cat:'ecommerce',sub:'Boutiques',tag:'Projet perso / Shopify',title:'FlorifyHome',desc:"Décoration intérieure autour de la nature et du vert : branding, mise en page produits et contenu lifestyle végétal.",imgs:['florify.jpeg']},
{cat:'ecommerce',sub:'Refonte UX',tag:'Projet école / UX',title:'Refonte Zara',desc:"Parcours e-commerce repensé, de la navigation à la fiche produit : audit UX, benchmark, maquettes et présentation vidéo.",yt:'p9ZdyU1eOnQ',r:'16/9',wide:1}
];

/* ===== STRUCTURE COMMUNE (nav, curseur, footer, lightbox) ===== */
const pg=location.pathname.split('/').pop()||'index.html';
const NAV=[['index.html','accueil'],['index.html#ia','ia'],['reseaux.html','réseaux'],['ecole.html','école'],['ecommerce.html','e-commerce'],['index.html#contact','contact']];
document.body.insertAdjacentHTML('afterbegin',`<canvas id="bg"></canvas><div class="pb"></div><div class="cur"></div><div class="cur2"></div><nav><a class="logo" href="index.html">RLD<b>/</b>AI</a><ul>${NAV.map(([h,l])=>`<li><a href="${h}"${h===pg?' class="on"':''}>${l}</a></li>`).join('')}</ul></nav>`);
document.body.insertAdjacentHTML('beforeend',`<footer><span>© 2026 Rafael Lavocat-Dubuis</span><span>Business et Nouvelles Technologies</span></footer><div class="lb"><button class="x">✕</button><button class="p">←</button><img alt=""><button class="nx">→</button><span></span></div>`);

/* ===== LIGHTBOX ===== */
const lb=$('.lb');let L=[],li=0;
const lbShow=()=>{$('img',lb).src=u(L[li]);$('span',lb).textContent=(li+1)+' / '+L.length;$('.p',lb).style.display=$('.nx',lb).style.display=L.length>1?'block':'none'};
const lbGo=d=>{li=(li+d+L.length)%L.length;lbShow()};
const lbOpen=(imgs,i)=>{L=imgs;li=i;lbShow();lb.classList.add('on')};
$('.x',lb).onclick=()=>lb.classList.remove('on');$('.p',lb).onclick=()=>lbGo(-1);$('.nx',lb).onclick=()=>lbGo(1);
lb.onclick=e=>{if(e.target===lb)lb.classList.remove('on')};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')lbGo(-1);if(e.key==='ArrowRight')lbGo(1)});

/* ===== SOUS-PAGES : cartes + tri ===== */
const card=(p,i)=>{
 const d=document.createElement('article');d.className='gl card pop'+(p.wide?' wide':'');d.style.animationDelay=i*70+'ms';
 let m;
 if(p.yt){m=`<div class="media" style="aspect-ratio:${p.r||'9/16'}"><iframe src="https://www.youtube.com/embed/${p.yt}" title="${p.title}" loading="lazy" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`}
 else{d.dataset.tilt='';const n=p.imgs.length;
  m=`<div class="media z"${p.r?` style="aspect-ratio:${p.r}"`:''}><img src="${u(p.imgs[0])}" alt="${p.title}">${n>1?`<span class="bdg">${n} slides</span>`:''}</div>`+(n>1?`<div class="th">${p.imgs.map((s,k)=>`<img src="${u(s)}" data-k="${k}" class="${k?'':'on'}" alt="">`).join('')}</div>`:'')}
 d.innerHTML=m+`<div class="cb"><div class="tg">${p.tag}</div><h3>${p.title}</h3><p>${p.desc}</p></div>`;
 if(!p.yt){let cur=0;const main=$('.media img',d);
  $$('.th img',d).forEach(t=>t.onclick=()=>{cur=+t.dataset.k;main.src=t.src;$$('.th img',d).forEach(x=>x.classList.toggle('on',x===t))});
  $('.media',d).onclick=()=>lbOpen(p.imgs,cur)}
 return d};
const cat=document.body.dataset.cat;
if(cat){
 const C=CATS[cat],items=P.filter(p=>p.cat===cat);
 $('#main').innerHTML=`<section class="sec head"><a class="back" href="index.html#work">cd ..</a><p class="prompt">~/realisations/${cat}</p><h1 class="h1" data-decode>${C.t}</h1><p class="lead">${C.d}</p><div class="f"></div><div class="grid"></div><div class="more"><span>autres univers :</span>${Object.keys(CATS).filter(k=>k!==cat).map(k=>`<a class="btn ghost" href="${k}.html">${CATS[k].t}</a>`).join('')}</div></section>`;
 const grid=$('.grid'),bar=$('.f');
 const show=s=>{grid.innerHTML='';items.filter(p=>s==='Tous'||p.sub===s).forEach((p,i)=>grid.append(card(p,i)));$$('button',bar).forEach(b=>b.classList.toggle('on',b.textContent===s))};
 ['Tous',...C.s].forEach(s=>{const b=document.createElement('button');b.textContent=s;b.onclick=()=>show(s);bar.append(b)});
 show('Tous');
}

/* ===== COMPTEURS ===== */
$$('[data-n]').forEach(e=>e.textContent=P.filter(p=>p.cat===e.dataset.n).length+' projets');
$$('[data-count="all"]').forEach(e=>e.dataset.count=P.length);
const mq=$('.mq');if(mq){const t=mq.textContent.trim()+'   ///   ';mq.innerHTML='<div>'+t.repeat(8)+'</div>'}

/* ===== EFFETS ===== */
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
(()=>{ // réseau neuronal interactif
 const c=$('#bg'),x=c.getContext('2d');let W,H,pts=[];const m={x:-999,y:-999};
 const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight;pts=Array.from({length:Math.min(90,W/16|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))};
 rs();addEventListener('resize',rs);addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY});
 const ln=(a,b,w,col)=>{x.strokeStyle=col;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()};
 const f=()=>{x.clearRect(0,0,W,H);
  for(const p of pts){if(!RM){p.x+=p.vx;p.y+=p.vy}if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
   const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy);if(d<170){p.x+=dx*.012;p.y+=dy*.012}
   x.fillStyle='rgba(110,243,255,.85)';x.fillRect(p.x-1,p.y-1,2.2,2.2);
   if(d<190)ln(p,m,1,`rgba(110,243,255,${(1-d/190)*.6})`)}
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<130)ln(a,b,1,`rgba(138,92,255,${(1-d/130)*.35})`)}
  if(!RM)requestAnimationFrame(f)};f()})();

const cur=$('.cur'),ring=$('.cur2');let mx=0,my=0,rx=0,ry=0;
addEventListener('pointermove',e=>{
 mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx}px,${my}px)`;
 ring.classList.toggle('h',!!e.target.closest('a,button,.z'));
 const el=e.target.closest('.gl');if(el){const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
  el.style.setProperty('--mx',px*100+'%');el.style.setProperty('--my',py*100+'%');
  if(el.dataset.tilt!==undefined)el.style.transform=`perspective(900px) rotateY(${(px-.5)*12}deg) rotateX(${(.5-py)*12}deg)`}});
document.addEventListener('pointerout',e=>{const el=e.target.closest&&e.target.closest('[data-tilt]');if(el&&!el.contains(e.relatedTarget))el.style.transform=''});
(function t(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(t)})();
addEventListener('scroll',()=>{$('.pb').style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});

const G='01<>/\\{}#$%&*+=?';
const decode=el=>{const t=el.dataset.d||el.textContent;el.dataset.d=t;if(RM)return;let f=0;const n=28;const iv=setInterval(()=>{el.textContent=[...t].map((c,i)=>c===' '||i<f*t.length/n?c:G[Math.random()*G.length|0]).join('');if(++f>n){el.textContent=t;clearInterval(iv)}},40)};
const count=el=>{const T=+el.dataset.count,t0=performance.now();(function s(n){const k=Math.min((n-t0)/1400,1);el.textContent=Math.round(T*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(s)})(t0)};
const type=el=>{const lines=['$ whoami','rafael_lavocat_dubuis','','$ cat formation.txt','Business et Nouvelles Technologies (3e année)','','$ cat objectif.txt','Alternance dès septembre 2026','','$ ./status','> ouvert aux opportunités ▌'].join('\n');let i=0;(function s(){el.textContent=lines.slice(0,++i);if(i<lines.length)setTimeout(s,RM?0:32)})()};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);
 el.classList.add('in');if('decode' in el.dataset)decode(el);if(el.dataset.count)count(el);if(el.id==='term')type(el)}),{threshold:.25});
$$('.rv,[data-decode],[data-count],#term').forEach(e=>io.observe(e));

/* ===== TRANSITIONS DE PAGE ===== */
const pt=document.createElement('div');pt.className='pt';document.body.append(pt);
requestAnimationFrame(()=>requestAnimationFrame(()=>pt.classList.add('out')));
$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(/^(https?:|mailto:|#)/.test(h)||(a.pathname===location.pathname&&a.hash))return;
 a.addEventListener('click',e=>{e.preventDefault();pt.className='pt rst';pt.offsetHeight;pt.className='pt in';setTimeout(()=>location.href=a.href,560)})});
addEventListener('pageshow',e=>{if(e.persisted)pt.className='pt out'});
