const DEF={
design:[{n:'10 تصاميم متنوعة',p:1800,t:'شاملة صورة بروفايل مجانية'},{n:'15 تصميم متنوع',p:2600,t:'شاملة صورة بروفايل مجانية'},{n:'20 تصميم متنوع',p:3400,t:'شاملة صورة بروفايل + كفر'},{n:'25 تصميم متنوع',p:4100,t:'شاملة صورة بروفايل + كفر'},{n:'30 تصميم متنوع',p:4800,t:'شاملة صورة بروفايل + كفر'}],
full:[
{n:'باقة بداية (Bedaya)',p:6999,i:['10 تصاميم (1,800 ج.م)','2 ريلز (1,199 ج.م)','1 إعلان ممول + صنع محتوى (1,499 ج.م)','10 ساعات تصوير حصص (2,999 ج.م)']},
{n:'باقة سيلفر (Silver)',p:9699,i:['15 تصميم','3 ريلز','1 إعلان ممول + صنع محتوى','15 ساعة تصوير حصص']},
{n:'باقة جولد (Gold)',p:12400,hot:1,i:['20 تصميم','4 ريلز','1 إعلان ممول + صنع محتوى','20 ساعة تصوير حصص']},
{n:'باقة دايموند (Diamond)',p:13990,i:['30 تصميم','5 ريلز','1 إعلان ممول + صنع محتوى','20 ساعة تصوير حصص']}],
svc:[
{id:'post',n:'بوسترات سوشيال ميديا',p:200,bq:10,bp:1800,h:'10 تصاميم بـ 1,800 ج.م'},
{id:'book',n:'غلاف مذكرة',p:350},{id:'card',n:'كارت حجز',p:200},{id:'cert',n:'شهادة تقدير',p:200},
{id:'thumb',n:'ثمنيل يوتيوب',p:180},{id:'prof',n:'بروفايل وكفر',p:300},
{id:'reel',n:'تصوير ومونتاج ريلز',p:550,bq:2,bp:1199,h:'2 ريلز بـ 1,199 ج.م'},
{id:'cont',n:'كتابة وصناعة محتوى',p:1499},
{id:'hrs',n:'ساعات تصوير حصص بالزقازيق',p:300,bq:10,bp:2999,h:'10 ساعات بـ 2,999 ج.م'}],
cats:['ريلز','السبورة','بوسترات','أغلفة المذكرات'],
work:[],clients:[],places:[],govs:[],
txt:{h1:'GRAVITY Agency',h2:'Build Your Future',p:'نصنع لعلامتك حضورًا رقميًا لا يُنسى: تسويق رقمي، تصميم جرافيك، صناعة محتوى، وإنتاج ميديا باحترافية.',ft:'تواصل معنا على واتساب لأي استفسار'},wa:'201100393632',fb:'https://www.facebook.com/profile.php?id=61569739719353'};
const $=s=>document.querySelector(s);
const BASE=(window.SITE_DATA&&window.SITE_DATA.version)||'0',DRAFT='gravity_draft_v1';
let S=null;
try{const dr=JSON.parse(localStorage.getItem(DRAFT)||'null');if(dr&&dr.base===BASE)S=dr.data}catch(e){}
if(!S)S=window.SITE_DATA||null;
S=Object.assign(JSON.parse(JSON.stringify(DEF)),S||{});S.txt=Object.assign({},DEF.txt,S.txt);
const IND=['book','post','card','cert','thumb','prof'];
function migrate(){S.svc.forEach(s=>{if(s.ind===undefined&&IND.includes(s.id))s.ind=1})}
migrate();
const LOGO=$('nav img').src;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=u=>/^https?:\/\//i.test(u||'')?u:'';
const fm=n=>Number(n).toLocaleString('en-US')+' ج.م';
let cat='الكل',Q={},dirty=false,tab='ov',editId=null;
const keepDraft=()=>{try{localStorage.setItem(DRAFT,JSON.stringify({base:BASE,data:S}));return true}catch(e){return false}};
const save=()=>{dirty=true;const b=$('#pubb');if(b)b.textContent='● تصدير التعديلات';if(!keepDraft()&&!window._qw){window._qw=1;alert('مساحة المتصفح ممتلئة: لن تُحفظ المسودة تلقائيًا. صدّر التعديلات الآن.')}};
addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});

/* export: static hosting has no backend, so edits are exported as data/site-data.js */
function pub(){
 S.version=new Date().toISOString();
 const txt='window.SITE_DATA = '+JSON.stringify(S,null,1).replace(/<\/script/gi,'<\\/script')+';\n';
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/javascript'}));a.download='site-data.js';
 document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),3000);
 dirty=false;keepDraft();const b=$('#pubb');if(b)b.textContent='تصدير التعديلات';
 alert('تم تنزيل الملف site-data.js\nضعه داخل مجلد data/ في المشروع (استبدل القديم) ثم ارفعه على GitHub لتظهر التعديلات للزوار.');
}
function img2url(f,max=1100,q=.78){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',q))};i.onerror=rej;i.src=r.result};r.onerror=rej;r.readAsDataURL(f)})}

/* ---------- public site ---------- */
function embed(u){const m=(u||'').match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m?'https://www.youtube.com/embed/'+m[1]:''}
function renderSite(){
 $('#yr').textContent=new Date().getFullYear();const X=S.txt;$('#h1').innerHTML=esc(X.h1)+'<br><b>'+esc(X.h2)+'</b>';$('#hp').textContent=X.p;$('#ft').textContent=X.ft;
 $('#wal').href='https://wa.me/'+S.wa;$('#fbl').href=safe(S.fb);
 $('#ptabs').innerHTML=['الكل',...S.cats].map(c=>`<button class="tab ${c===cat?'on':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
 const ws=S.work.filter(w=>cat==='الكل'||w.c===cat);
 $('#pgrid').innerHTML=ws.length?ws.map(w=>`<div class="glass work" data-w="${w.id}"><div class="thumb">${w.u?`<img src="${esc(w.u)}" alt="${esc(w.t)}" loading="lazy">`:(w.v?'🎬':'🖼️')}${w.v?'<span class="play">▶</span>':''}</div><div class="in"><span class="tag">${esc(w.c)}</span><h4>${esc(w.t)}</h4></div></div>`).join(''):'<p class="sub">سيتم إضافة الأعمال قريبًا.</p>';
 $('#clients').style.display=S.clients.length?'':'none';
 $('#cgrid').innerHTML=S.clients.map(c=>{const f=safe(c.fb),y=safe(c.yt);return `<div class="glass client">${c.u?`<img src="${esc(c.u)}" alt="${esc(c.n)}" loading="lazy">`:`<div class="ini">${esc((c.n||'?')[0])}</div>`}<b>${esc(c.n)}</b><small>${esc(c.pk)}</small><div class="lk">${f?`<a class="btn sm" target="_blank" rel="noopener" href="${esc(f)}">فيسبوك</a>`:''}${y?`<a class="btn sm red" target="_blank" rel="noopener" href="${esc(y)}">يوتيوب</a>`:''}</div></div>`}).join('');
 $('#branches').style.display=S.govs.length?'':'none';
 $('#bgrid').innerHTML=S.govs.map(g=>{const n=S.places.filter(p=>p.g===g.n).length;return `<div class="gov" data-gv="${g.id}">${g.u?`<img src="${esc(g.u)}" alt="" loading="lazy">`:''}<b>${esc(g.n)}</b><small>${n} ${n===1?'مكان':'أماكن'} ‹</small></div>`}).join('');
 $('#dpk').innerHTML=S.design.map((d,i)=>`<div class="glass pk"><h4>${esc(d.n)}</h4><div class="price">${fm(d.p)}</div><div style="color:var(--mut);flex:1">${esc(d.t)}</div><button class="btn sm" data-pk="design:${i}">اطلب الباقة</button></div>`).join('');
 $('#fpk').innerHTML=S.full.map((f,i)=>`<div class="glass pk ${f.hot?'hot':''}">${f.hot?'<span class="badge">الأكثر طلبًا</span>':''}<h4>${esc(f.n)}</h4><div class="price">${fm(f.p)}<small> / شهريًا</small></div><ul>${f.i.map(i=>`<li>${esc(i)}</li>`).join('')}</ul><button class="btn sm ${f.hot?'':'burg'}" data-pk="full:${i}">اطلب الباقة</button></div>`).join('');
 renderCalc();renderOrder();
}
const cost=(s,q)=>s.bq?Math.floor(q/s.bq)*s.bp+(q%s.bq)*s.p:q*s.p;
function renderCalc(){
 $('#clist').innerHTML=S.svc.map(s=>`<div class="row"><div>${esc(s.n)}<small>${fm(s.p)}${s.h?' • '+esc(s.h):''}</small></div><div class="qty"><button data-q="${s.id}" data-d="-1">−</button><input type="number" min="0" value="${Q[s.id]||0}" data-qi="${s.id}"><button data-q="${s.id}" data-d="1">+</button></div></div>`).join('');
 upd();
}
const items=()=>S.svc.filter(s=>Q[s.id]>0).map(s=>({id:s.id,n:s.n,q:Q[s.id],c:cost(s,Q[s.id])}));
function upd(){
 const it=items(),t=it.reduce((a,b)=>a+b.c,0);
 $('#clines').innerHTML=it.length?it.map(i=>`<div class="line"><span>${esc(i.n)} × ${i.q}</span><span>${fm(i.c)}</span></div>`).join(''):'<div class="sub">لم تختر خدمات بعد</div>';
 $('#ctotal').textContent=fm(t);
}
function openWork(id){
 const w=S.work.find(x=>x.id==id);if(!w)return;
 const e=embed(w.v),l=safe(w.v);
 let m=e?`<iframe src="${esc(e)}" allowfullscreen></iframe>`:(w.u?`<img src="${esc(w.u)}" alt="">`:'');
 if(!e&&l)m+=`<p><a class="btn" target="_blank" rel="noopener" href="${esc(l)}">▶ مشاهدة الفيديو</a></p>`;
 $('#lbc').innerHTML=m+`<h3>${esc(w.t)}</h3><p style="color:var(--mut)">${esc(w.d)}</p>`;$('#lb').classList.add('on');
}
function openGov(id){
 const g=S.govs.find(x=>x.id==id);if(!g)return;
 const ps=S.places.filter(p=>p.g===g.n);
 $('#lbc').innerHTML=`<h2 style="margin:0 0 4px">${esc(g.n)}</h2><p class="sub" style="margin-bottom:6px">الفروع والاستوديوهات المتعاونة</p>`+(ps.length?ps.map(p=>{const tel=(p.ph||'').replace(/[^\d+]/g,''),mp=safe(p.m);return `<div class="pl">${p.u?`<img src="${esc(p.u)}" alt="" style="margin-bottom:10px">`:''}<h3>${esc(p.z)}</h3><div style="font-weight:800;font-size:18px">${esc(p.n)} <span class="tag">(${esc(p.t)})</span></div><div style="color:var(--mut);margin:4px 0 10px">📍 ${esc(p.a)}</div><div style="display:flex;gap:8px;flex-wrap:wrap">${tel?`<a class="btn sm ghost" href="tel:${esc(tel)}">📞 اتصال</a>`:''}${mp?`<a class="btn sm" target="_blank" rel="noopener" href="${esc(mp)}">الموقع على الخريطة</a>`:''}</div></div>`}).join(''):'<p class="sub">لا توجد أماكن مضافة بعد.</p>');
 $('#lb').classList.add('on');
}

/* ---------- individual order section + order form ---------- */
let Q2={},ORD=null;
function renderOrder(){
 const L=S.svc.filter(s=>s.ind);
 $('#order').style.display=L.length?'':'none';
 $('#ogrid').innerHTML=L.map(s=>`<div class="glass pk"><h4>${esc(s.n)}</h4><div class="price">${fm(s.p)}<small> / للوحدة</small></div><div style="color:var(--mut);flex:1;font-size:13px">${s.h?esc(s.h):'&nbsp;'}</div><div class="qty"><button data-q2="${s.id}" data-d="-1">−</button><input type="number" min="0" value="${Q2[s.id]||0}" data-q2i="${s.id}"><button data-q2="${s.id}" data-d="1">+</button></div></div>`).join('');
 upd2();
}
const items2=()=>S.svc.filter(s=>s.ind&&Q2[s.id]>0).map(s=>({id:s.id,n:s.n,q:Q2[s.id],c:cost(s,Q2[s.id])}));
function upd2(){
 const it=items2(),t=it.reduce((a,b)=>a+b.c,0);
 $('#olines').innerHTML=it.length?it.map(i=>`<div class="line"><span>${esc(i.n)} × ${i.q}</span><span>${fm(i.c)}</span></div>`).join(''):'<div class="sub" style="margin:0">لم تختر شيئًا بعد</div>';
 $('#ototal').textContent=fm(t);
}

document.addEventListener('click',e=>{
 if(e.target.id==='lb'){$('#lb').classList.remove('on');return}
 if(e.target.id==='ob'){$('#ob').classList.remove('on');return}
 const t=e.target.closest('[data-act],[data-cat],[data-w],[data-q],[data-q2],[data-pk],[data-wa],[data-gv]');if(!t)return;const D=t.dataset;
 if(D.cat!==undefined){cat=D.cat;renderSite()}
 else if(D.w)openWork(D.w);
 else if(D.gv)openGov(D.gv);
 else if(D.q){Q[D.q]=Math.max(0,(Q[D.q]||0)+ +D.d);renderCalc()}
 else if(D.q2){Q2[D.q2]=Math.max(0,(Q2[D.q2]||0)+ +D.d);renderOrder()}
 else if(D.pk){const [g,i]=D.pk.split(':'),p=S[g][+i];if(p)openOrder([{id:'pkg',n:p.n,q:1,c:p.p}])}
 else if(D.act==='close')$('#lb').classList.remove('on');
 else if(D.act==='order'){const it=items();if(!it.length){alert('اختر خدمة واحدة على الأقل');return}openOrder(it)}
 else if(D.act==='order2'){const it=items2();if(!it.length){alert('اختر خدمة واحدة على الأقل');return}openOrder(it)}
 else if(D.act==='submito')submitOrder();
 else if(D.act==='closeo')$('#ob').classList.remove('on');
 else if(D.act==='admin')openAdmin();
});
document.addEventListener('input',e=>{const d=e.target.dataset;if(d.qi){Q[d.qi]=Math.max(0,parseInt(e.target.value)||0);upd()}if(d.q2i){Q2[d.q2i]=Math.max(0,parseInt(e.target.value)||0);upd2()}if(e.target.id==='f_color')$('#f_colortxt').value=e.target.value});

/* ---------- admin ---------- */
const showAdmin=()=>{$('#root').style.display='none';$('#admin').style.display='block';scrollTo(0,0);renderAdmin()};
const hideAdmin=()=>{$('#admin').style.display='none';$('#root').style.display='block';renderSite()};
const CFG={
 work:{a:'work',h:'إدارة الأعمال (ريلز • سبورة • بوسترات • أغلفة مذكرات)',multi:1,show:x=>x.t+' — '+x.c,F:[['t','عنوان العمل'],['c','القسم','sel',()=>S.cats],['u','صور العمل (ارفع صورة أو عدة صور، وسيُنشأ عمل لكل صورة)','img'],['v','رابط الفيديو (للريلز: يوتيوب أو فيسبوك) – اختياري'],['d','وصف قصير','ta']]},
 cl:{a:'clients',h:'المشتركون معنا (العملاء)',show:x=>x.n+(x.pk?' — '+x.pk:''),F:[['n','اسم المدرس / الصفحة'],['pk','المادة أو الباقة (اختياري)'],['u','صورة بيدج المدرس','img'],['fb','رابط صفحة الفيسبوك'],['yt','رابط قناة اليوتيوب']]},
 gv:{a:'govs',h:'المحافظات (صورة كبيرة لكل محافظة)',show:x=>x.n,F:[['n','اسم المحافظة'],['u','صورة المحافظة الكبيرة','img']]},
 br:{a:'places',h:'الأماكن والاستوديوهات (تظهر عند الضغط على المحافظة)',req:['g'],show:x=>(x.g||'—')+' • '+(x.z||'')+' • '+x.n,F:[['n','اسم المكان'],['g','المحافظة','sel',()=>S.govs.map(x=>x.n)],['z','المنطقة'],['t','النوع','sel',()=>['فرع','استوديو متعاون']],['a','العنوان بالتفصيل'],['ph','رقم الهاتف'],['m','رابط الموقع على خرائط جوجل'],['u','صورة المكان (اختياري)','img']]}
};
function crud(M,key){
 const C=CFG[key],A=S[C.a],cur=A.find(x=>x.id===editId)||{};
 M.innerHTML=`<h2>${C.h}</h2><div class="glass f">${C.F.map(([k,l,ty,o])=>`<label>${l}</label>`+(ty==='sel'?`<select data-k="${k}">${o().map(v=>`<option ${v===(cur[k]||o()[0])?'selected':''}>${esc(v)}</option>`).join('')}</select>`:ty==='img'?`<input type="file" accept="image/*" data-k="${k}" ${C.multi?'multiple':''}>${cur[k]?'<small>توجد صورة محفوظة، اختر ملفًا جديدًا لاستبدالها</small>':''}`:ty==='ta'?`<textarea data-k="${k}" rows="2">${esc(cur[k]||'')}</textarea>`:`<input data-k="${k}" value="${esc(cur[k]||'')}">`)).join('')}<div><button class="btn" id="cs">${editId?'حفظ التعديل':'إضافة'}</button> ${editId?'<button class="btn ghost" id="cx">إلغاء</button>':''} <small id="cm"></small></div></div><div class="glass" style="overflow:auto"><table class="tbl">${A.map(x=>`<tr><td>${x.u?`<img src="${esc(x.u)}" style="height:42px;border-radius:6px">`:''}</td><td>${esc(C.show(x))}</td><td style="white-space:nowrap"><button class="btn sm ghost" data-e="${x.id}">تعديل</button> <button class="btn sm red" data-d="${x.id}">حذف</button></td></tr>`).join('')||'<tr><td>لا توجد عناصر بعد.</td></tr>'}</table></div>`;
 const fk=(C.F.find(f=>f[2]==='img')||[])[0];
 $('#cs').onclick=async()=>{
  const o={};M.querySelectorAll('[data-k]').forEach(el=>{if(el.type!=='file')o[el.dataset.k]=el.value.trim()});
  const fi=M.querySelector('input[type=file]'),fs=fi?[...fi.files]:[],b=$('#cs');
  if(!(o[C.F[0][0]]||(C.multi&&(fs.length||o.v)))){alert('أكمل البيانات المطلوبة');return}
  if(C.req&&C.req.some(k=>!o[k])){alert('أضف محافظة أولًا من تبويب المحافظات ثم اخترها');return}
  b.disabled=true;$('#cm').textContent='جارٍ المعالجة...';
  try{
   if(editId){const it=A.find(x=>x.id===editId);if(C.a==='govs'&&o.n&&o.n!==it.n)S.places.forEach(q=>{if(q.g===it.n)q.g=o.n});Object.assign(it,o);if(fs[0])it[fk]=await img2url(fs[0])}
   else if(C.multi&&fs.length){let n=0;for(const f of fs){n++;A.unshift({...o,id:Date.now()+n,[fk]:await img2url(f),t:o.t?(fs.length>1?o.t+' '+n:o.t):f.name.replace(/\.[^.]+$/,'')})}}
   else A.unshift({...o,id:Date.now(),...(fs[0]?{[fk]:await img2url(fs[0])}:{})});
   editId=null;save();renderAdmin();
  }catch(err){b.disabled=false;$('#cm').textContent='تعذر قراءة الصورة، جرّب صورة أخرى'}
 };
 if(editId)$('#cx').onclick=()=>{editId=null;renderAdmin()};
 M.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{editId=+b.dataset.e;renderAdmin()});
 M.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{if(confirm('تأكيد الحذف؟')){const id=+b.dataset.d,old=A.find(x=>x.id===id);S[C.a]=S[C.a].filter(x=>x.id!==id);if(C.a==='govs'&&old)S.places=S.places.filter(q=>q.g!==old.n);save();renderAdmin()}});
}
function renderAdmin(){
 const A=$('#admin'),T=[['ov','نظرة عامة'],['tx','نصوص الموقع'],['pf','الأعمال'],['cl','المشتركون'],['us','المدرسون'],['od','الطلبات'],['of','العروض'],['jb','الوظائف'],['pt','شركاء عملنا'],['fd','حقول الطلب'],['gv','المحافظات'],['br','الأماكن والاستوديوهات'],['pr','الأسعار والباقات'],['st','الإعدادات']];
 A.innerHTML=`<div class="adm"><aside class="side"><img src="${LOGO}">${T.map(([k,n])=>`<button class="${tab===k?'on':''}" data-t="${k}">${n}</button>`).join('')}<button class="btn" id="pubb" style="justify-content:center;margin-top:10px" data-t="pub">${dirty?'● ':''}تصدير التعديلات</button><small style="color:var(--mut);display:block;margin:6px 4px">صدّر الملف وضعه في مجلد data/ ثم ارفعه على GitHub لتظهر التعديلات للزوار</small><button data-t="site">← عرض الموقع</button></aside><main class="main" id="am"></main></div>`;
 A.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const k=b.dataset.t;if(k==='site')hideAdmin();else if(k==='pub')pub();else{tab=k;editId=null;renderAdmin()}});
 const M=$('#am');
 if(tab==='ov')M.innerHTML=`<h2>نظرة عامة</h2><div class="stats"><div class="glass stat"><b>${S.work.length}</b>أعمال في المعرض</div><div class="glass stat"><b>${S.clients.length}</b>مشتركون</div><div class="glass stat"><b>${S.places.length}</b>فروع واستوديوهات</div><div class="glass stat"><b>${S.design.length+S.full.length}</b>باقات فعّالة</div></div><div class="glass f"><b>طريقة الاستخدام</b><span>1) أضف أعمالك ومشتركيك وأماكنك من القوائم. 2) اضغط «تصدير التعديلات» ثم ضع ملف site-data.js في مجلد data/ وارفعه على GitHub ليراها الزوار. الصور تُضغط تلقائيًا قبل الرفع.</span></div>`;
 if(tab==='pf')crud(M,'work');
 if(tab==='cl')crud(M,'cl');
 if(['us','od','of','jb','pt','fd'].includes(tab))adminTab(M,tab);
 if(tab==='gv')crud(M,'gv');
 if(tab==='br')crud(M,'br');
 if(tab==='tx'){
  M.innerHTML=`<h2>نصوص الموقع</h2><div class="glass f"><label>العنوان الرئيسي</label><input data-x="h1" value="${esc(S.txt.h1)}"><label>الشعار (السطر الملون)</label><input data-x="h2" value="${esc(S.txt.h2)}"><label>الوصف تحت العنوان</label><textarea data-x="p" rows="3">${esc(S.txt.p)}</textarea><label>جملة الفوتر</label><input data-x="ft" value="${esc(S.txt.ft)}"></div>`;
  M.querySelectorAll('[data-x]').forEach(el=>el.onchange=()=>{S.txt[el.dataset.x]=el.value.trim();save()});
 }
 if(tab==='pr'){
  const I=(g,i,f,v,ph,ty)=>{const a=`data-g="${g}" data-i="${i}" data-f="${f}" data-ty="${ty||'t'}"`;
   if(ty==='c')return `<label style="display:flex;gap:4px;align-items:center;font-size:13px"><input type="checkbox" ${v?'checked':''} ${a}>${f==='ind'?'يظهر في قسم الطلب الفردي':'مميزة'}</label>`;
   const inp=ty==='ta'?`<textarea rows="3" placeholder="${ph}" ${a}>${esc(v)}</textarea>`:ty==='n'?`<input type="number" min="0" placeholder="${ph}" value="${v??''}" ${a}>`:`<input placeholder="${ph}" value="${esc(v)}" ${a}>`;
   return `<label class="fl ${ty==='n'?'n':''}"><span>${ph}</span>${inp}</label>`};
  const X=(g,i)=>`<button class="btn sm red" data-del="${g}:${i}">حذف</button>`;
  const sec=(t,g,rows)=>`<div class="glass f"><b>${t}</b>${rows}<div><button class="btn sm" data-add="${g}">+ إضافة</button></div></div>`;
  M.innerHTML=`<h2>الأسعار والباقات</h2>`+
  sec('أسعار الخدمات (تظهر في الحاسبة وقسم الطلب الفردي)','svc',S.svc.map((s,i)=>`<div class="er">${I('svc',i,'n',s.n,'اسم الخدمة')}${I('svc',i,'p',s.p,'السعر','n')}${I('svc',i,'bq',s.bq,'عدد العرض','n')}${I('svc',i,'bp',s.bp,'سعر العرض','n')}${I('svc',i,'h',s.h||'','وصف العرض')}${I('svc',i,'ind',s.ind,'','c')}${X('svc',i)}</div>`).join(''))+
  sec('باقات التصميم','design',S.design.map((s,i)=>`<div class="er">${I('design',i,'n',s.n,'اسم الباقة')}${I('design',i,'p',s.p,'السعر','n')}${I('design',i,'t',s.t,'ملاحظة')}${X('design',i)}</div>`).join(''))+
  sec('الباقات الشاملة (كل سطر = ميزة)','full',S.full.map((s,i)=>`<div class="er">${I('full',i,'n',s.n,'اسم الباقة')}${I('full',i,'p',s.p,'السعر','n')}${I('full',i,'hot',s.hot,'','c')}${I('full',i,'i',s.i.join('\n'),'مكونات الباقة','ta')}${X('full',i)}</div>`).join(''))+
  sec('أقسام المعرض','cats',S.cats.map((c,i)=>`<div class="er"><input value="${esc(c)}" data-ci="${i}">${X('cats',i)}</div>`).join(''));
  M.querySelectorAll('[data-g]').forEach(el=>el.onchange=()=>{const o=S[el.dataset.g][+el.dataset.i],f=el.dataset.f,t=el.dataset.ty;
   if(t==='n'){const v=el.value===''?undefined:Math.max(0,+el.value||0);if(v===undefined)delete o[f];else o[f]=v}
   else if(t==='c')o[f]=el.checked?1:0;
   else if(t==='ta')o[f]=el.value.split('\n').map(x=>x.trim()).filter(Boolean);
   else o[f]=el.value.trim();save()});
  M.querySelectorAll('[data-ci]').forEach(el=>el.onchange=()=>{const i=+el.dataset.ci,old=S.cats[i],nw=el.value.trim();if(!nw){el.value=old;return}S.work.forEach(w=>{if(w.c===old)w.c=nw});S.cats[i]=nw;save()});
  M.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const g=b.dataset.add;
   if(g==='svc')S.svc.push({id:'s'+Date.now(),n:'خدمة جديدة',p:100});
   if(g==='design')S.design.push({n:'باقة جديدة',p:1000,t:''});
   if(g==='full')S.full.push({n:'باقة جديدة',p:5000,i:['ميزة 1']});
   if(g==='cats')S.cats.push('قسم جديد');save();renderAdmin()});
  M.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const [g,i]=b.dataset.del.split(':');if(!confirm('تأكيد الحذف؟'))return;
   if(g==='cats'){const c=S.cats[+i];if(S.work.some(w=>w.c===c)&&!confirm('يوجد أعمال في هذا القسم ستبقى بدون قسم. متابعة؟'))return;S.cats.splice(+i,1)}else S[g].splice(+i,1);save();renderAdmin()});
 }
 if(tab==='st'){
  M.innerHTML=`<h2>الإعدادات</h2><div class="glass f"><label>رقم واتساب (بصيغة دولية بدون +)</label><input id="swa" value="${esc(S.wa)}" dir="ltr"><label>رابط صفحة فيسبوك</label><input id="sfb" value="${esc(S.fb)}" dir="ltr"><div><button class="btn" id="ss">حفظ</button> <button class="btn red" id="sr">إعادة الضبط الافتراضي</button></div></div>`;
  $('#ss').onclick=()=>{S.wa=$('#swa').value.replace(/\D/g,'');S.fb=$('#sfb').value.trim();save();alert('تم الحفظ. اضغط «تصدير التعديلات» ثم ارفع الملف على GitHub لتظهر للزوار.')};
  $('#sr').onclick=()=>{if(confirm('سيتم مسح كل البيانات والأعمال. متأكد؟')){S=JSON.parse(JSON.stringify(DEF));migrate();save();renderAdmin()}};
 }
}
renderSite();

/* ===== Supabase layer: auth, orders, offers, jobs, partners, dynamic order fields ===== */
const CF=window.GRAVITY_CONFIG||{};
const sb=(CF.supabaseUrl&&CF.supabaseKey&&window.supabase)?supabase.createClient(CF.supabaseUrl,CF.supabaseKey):null;
const GOVS=['القاهرة','الجيزة','الإسكندرية','الشرقية','الدقهلية','الغربية','المنوفية','القليوبية','البحيرة','كفر الشيخ','دمياط','بورسعيد','الإسماعيلية','السويس','شمال سيناء','جنوب سيناء','الفيوم','بني سويف','المنيا','أسيوط','سوهاج','قنا','الأقصر','أسوان','البحر الأحمر','الوادي الجديد','مطروح'];
const ST={pending:'قيد الانتظار',processing:'جارٍ التنفيذ',completed:'تم التنفيذ',cancelled:'ملغي'};
const em=p=>{
  const x=String(p)
    .replace(/[٠-٩]/g,d=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/\D/g,'');
  return 'u'+x+'@gravity-mail.com';
};let me=null,GT=[],DB={offers:[],jobs:[],partners:[],fields:[]},gmode='in';

async function loadMe(){
 const {data:{session}}=await sb.auth.getSession();me=null;
 if(session){const {data}=await sb.from('profiles').select('*').eq('id',session.user.id).maybeSingle();
  if(data&&data.active)me=data;else if(data)await sb.auth.signOut()}
 navBtn();
}
async function loadPublic(){
 const q=(t,o)=>sb.from(t).select('*').order(o);
 const [t,o,j,p,f]=await Promise.all([q('public_teachers','name'),q('offers','sort'),q('jobs','sort'),q('partners','sort'),q('order_fields','sort')]);
 GT=t.data||[];DB={offers:o.data||[],jobs:j.data||[],partners:p.data||[],fields:f.data||[]};renderSite();
}
function paintX(){
 const sh=(id,a)=>{$('#'+id).style.display=a.length?'':'none'},act=a=>a.filter(x=>x.active);
 sh('clients',[...S.clients,...GT]);
 $('#cgrid').insertAdjacentHTML('beforeend',GT.map(t=>`<div class="glass client">${t.avatar?`<img src="${esc(t.avatar)}" alt="${esc(t.name)}" loading="lazy">`:`<div class="ini">${esc((t.name||'?')[0])}</div>`}<b>${esc(t.name)}</b><small>${esc(t.subject)}${t.gov?' — '+esc(t.gov):''}</small></div>`).join(''));
 const O=act(DB.offers),J=act(DB.jobs),P=act(DB.partners);sh('offers',O);sh('jobs',J);sh('partners',P);
 $('#ofgrid').innerHTML=O.map(o=>`<div class="glass pk">${o.image?`<div class="thumb" style="aspect-ratio:16/9;border-radius:12px;overflow:hidden"><img src="${esc(o.image)}" alt="" loading="lazy"></div>`:''}<h4>${esc(o.name)}</h4><div style="color:var(--mut);white-space:pre-line">${esc(o.description)}</div><ul>${(o.items||[]).map(i=>`<li>${esc(i)}</li>`).join('')}</ul><div class="price">${o.price_old?`<s style="font-size:18px;color:var(--mut)">${fm(o.price_old)}</s> `:''}${fm(o.price_new)} ${o.discount_pct?`<span class="badge" style="position:static;display:inline-block">وفّر ${o.discount_pct}%</span>`:''}</div><button class="btn sm" data-gvo="${o.id}">اطلب العرض</button></div>`).join('');
 $('#jgrid').innerHTML=J.map(j=>`<div class="glass pk"><h4>${esc(j.title)}</h4><div style="white-space:pre-line">${esc(j.description)}</div><b>المتطلبات</b><div style="color:#ddd;white-space:pre-line">${esc(j.requirements)}</div><b>طريقة التقديم</b><div>${safe(j.apply_method)?`<a class="btn sm" target="_blank" rel="noopener" href="${esc(j.apply_method)}">قدّم الآن</a>`:esc(j.apply_method)}</div></div>`).join('');
 $('#ptgrid').innerHTML=P.map(p=>`<div class="glass client">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`:`<div class="ini">${esc((p.name||'?')[0])}</div>`}<b>${esc(p.name)}</b><small>${esc(p.description)}</small></div>`).join('');
}

/* ---- auth modal: sign in / sign up / my account ---- */
function openM(msg){
 if(!$('#gvm')){document.body.insertAdjacentHTML('beforeend','<div class="modal" id="gvm"><div class="box glass" style="max-width:520px"><button class="btn sm ghost x" id="gvx">✕ إغلاق</button><h3 id="gvt" style="margin-top:0"></h3><div class="of" id="gvf"></div></div></div>');
  $('#gvx').onclick=()=>$('#gvm').classList.remove('on');$('#gvm').onclick=e=>{if(e.target.id==='gvm')e.target.classList.remove('on')}}
 gmode==='me'?acct():form(msg);$('#gvm').classList.add('on');
}
function form(msg){
 const r=gmode==='up';$('#gvt').textContent=r?'إنشاء حساب مدرس':'تسجيل الدخول';
 $('#gvf').innerHTML=(msg?`<small style="color:var(--lime)">${esc(msg)}</small>`:'')+(r?'<label>الاسم *</label><input id="g_n" autocomplete="name"><label>صورة Profile</label><input id="g_a" type="file" accept="image/*"><label>المادة *</label><input id="g_s"><label>المحافظة *</label><select id="g_g">'+GOVS.map(x=>'<option>'+x+'</option>').join('')+'</select><label>Gmail (اختياري)</label><input id="g_m" type="email" dir="ltr">':'')
 +'<label>رقم الهاتف *</label><input id="g_p" type="tel" inputmode="tel" dir="ltr" autocomplete="tel"><label>كلمة المرور *</label><input id="g_w" type="password" autocomplete="'+(r?'new':'current')+'-password">'
 +(r?'<label>تأكيد كلمة المرور *</label><input id="g_w2" type="password" autocomplete="new-password">':'')
 +'<small id="g_e" style="color:#ff7b7b"></small><button class="btn" id="g_go" style="width:100%;justify-content:center">'+(r?'إنشاء الحساب':'دخول')+'</button><button class="btn ghost sm" id="g_sw" style="justify-content:center">'+(r?'عندي حساب بالفعل':'إنشاء حساب جديد')+'</button>'
 +(r?'':`<a class="sub" style="margin:0;text-align:center" target="_blank" rel="noopener" href="https://wa.me/${S.wa}?text=${encodeURIComponent('نسيت كلمة المرور')}">نسيت كلمة المرور؟ تواصل معنا لإعادة تعيينها</a>`);
 $('#g_sw').onclick=()=>{gmode=r?'in':'up';form()};$('#g_go').onclick=go;
}
async function go(){
 const v=id=>$('#'+id).value.trim(),E=t=>{$('#g_e').textContent=t},r=gmode==='up',b=$('#g_go');
 const p=v('g_p'),w=$('#g_w').value;
 if(p.replace(/\D/g,'').length<8)return E('رقم الهاتف غير صحيح');
 if(w.length<6)return E('كلمة المرور 6 أحرف على الأقل');
 b.disabled=true;E('');
 try{
  if(r){
   const n=v('g_n'),s=v('g_s');if(!n||!s)throw 'املأ الاسم والمادة';
   if(w!==$('#g_w2').value)throw 'كلمتا المرور غير متطابقتين';
   const f=$('#g_a').files[0],{data,error}=await sb.auth.signUp({email:em(p),password:w});
   if(error)throw /registered/i.test(error.message)?'رقم الهاتف مسجل بالفعل':error.message;
   if(!data.session)throw 'أوقف خيار Confirm email من إعدادات Supabase';
   const {error:e2}=await sb.from('profiles').insert({id:data.user.id,name:n,phone:p,gmail:v('g_m')||null,subject:s,gov:v('g_g'),avatar:f?await img2url(f,200,.7):null});
   if(e2){await sb.auth.signOut();throw e2.message}
  }else{const {error}=await sb.auth.signInWithPassword({email:em(p),password:w});if(error)throw 'رقم الهاتف أو كلمة المرور غير صحيحة'}
  await loadMe();if(!me)throw 'هذا الحساب موقوف';
  $('#gvm').classList.remove('on');loadPublic();if($('#admin').style.display==='block')renderAdmin();
 }catch(x){E(String(x));b.disabled=false}
}
async function acct(){
 $('#gvt').textContent=me.name;
 const {data}=await sb.from('orders').select('*').eq('user_id',me.id).order('created_at',{ascending:false}).limit(10);
 $('#gvf').innerHTML='<b>طلباتي</b>'+((data||[]).map(o=>`<div class="line"><span>${new Date(o.created_at).toLocaleDateString('ar-EG')} — ${fm(o.total)}</span><span class="tag">${ST[o.status]}</span></div>`).join('')||'<small>لا توجد طلبات بعد</small>')
 +'<b>تغيير كلمة المرور</b><input id="g_w" type="password" placeholder="كلمة المرور الجديدة" autocomplete="new-password"><input id="g_w2" type="password" placeholder="تأكيد كلمة المرور" autocomplete="new-password"><small id="g_e" style="color:#ff7b7b"></small><button class="btn" id="g_cp">حفظ كلمة المرور</button><button class="btn ghost" id="g_lo">تسجيل الخروج</button>';
 $('#g_cp').onclick=async()=>{const w=$('#g_w').value,E=t=>{$('#g_e').textContent=t};
  if(w.length<6)return E('كلمة المرور 6 أحرف على الأقل');if(w!==$('#g_w2').value)return E('كلمتا المرور غير متطابقتين');
  const {error}=await sb.auth.updateUser({password:w});E(error?error.message:'تم تغيير كلمة المرور ✔')};
 $('#g_lo').onclick=async()=>{await sb.auth.signOut();await loadMe();$('#gvm').classList.remove('on');if($('#admin').style.display==='block')hideAdmin()};
}
function navBtn(){
 let b=$('#gv_acc');
 if(!b){b=document.createElement('button');b.id='gv_acc';b.className='btn sm';$('nav [data-act=admin]').before(b);b.onclick=()=>{gmode=me?'me':'in';openM()}}
 b.textContent=me?me.name:'دخول / حساب جديد';
}
async function openAdmin(){
 if(!sb){alert('لوحة التحكم تحتاج إعداد Supabase في js/config.js');return}
 if(me&&me.role==='admin')return showAdmin();
 gmode='in';openM('سجّل الدخول بحساب أدمن');
}

/* ---- orders with dynamic fields (fields come from the order_fields table) ---- */
function fieldHtml(f){
 const a=`data-fid="${f.id}"`,pv=f.key==='name'?me.name:f.key==='phone'?me.phone:f.type==='color'?'#800020':'';
 const c=f.type==='textarea'?`<textarea rows="2" ${a}></textarea>`:f.type==='select'?`<select ${a}>${(f.options||[]).map(o=>`<option>${esc(o)}</option>`).join('')}</select>`:`<input type="${f.type}" ${a} value="${esc(pv)}" ${f.type==='tel'||f.type==='url'?'dir="ltr"':''}>`;
 return `<label>${esc(f.label)}${f.required?' *':''}</label>${c}`;
}
function openOrder(list){
 if(!sb){alert('الطلب غير متاح الآن');return}
 if(!me){gmode='in';openM('سجّل الدخول أولًا لإرسال الطلب');return}
 ORD=list;const tot=list.reduce((a,b)=>a+b.c,0);
 $('#osumm').innerHTML=list.map(i=>`<div class="line"><span>${esc(i.n)}${i.q>1?' × '+i.q:''}</span><span>${fm(i.c)}</span></div>`).join('')+`<div class="line" style="font-weight:800;color:var(--lime)"><span>الإجمالي</span><span>${fm(tot)}</span></div>`;
 $('#ofields').innerHTML=DB.fields.filter(f=>f.active&&(!f.only_svc||list.some(i=>i.id===f.only_svc))).map(fieldHtml).join('');
 $('#f_err').textContent='';$('#ob').classList.add('on');
}
async function submitOrder(){
 const L=ORD||[],E=t=>{$('#f_err').innerHTML=t},ans=[];
 for(const f of DB.fields){const el=document.querySelector(`[data-fid="${f.id}"]`);if(!el)continue;const v=el.value.trim();
  if(f.required&&!v)return E('من فضلك املأ: '+esc(f.label));if(v)ans.push({l:f.label,v})}
 const total=L.reduce((a,b)=>a+b.c,0),{error}=await sb.from('orders').insert({user_id:me.id,items:L.map(({n,q,c})=>({n,q,c})),total,answers:ans});
 if(error)return E(esc(error.message));
 Q={};Q2={};renderCalc();renderOrder();
 E('تم إرسال طلبك ✔ ويمكنك متابعة حالته من حسابك. <a class="btn sm" target="_blank" rel="noopener" href="https://wa.me/'+S.wa+'?text='+encodeURIComponent('طلب جديد من '+me.name+' بإجمالي '+fm(total))+'">أرسل نسخة على واتساب</a>');
}
document.addEventListener('click',e=>{const t=e.target.closest('[data-gvo]');if(!t)return;const o=DB.offers.find(x=>x.id===t.dataset.gvo);if(o)openOrder([{id:'offer',n:o.name,q:1,c:Number(o.price_new)}])});

/* ---- dashboard tabs: teachers, orders, and generic DB-backed CRUD ---- */
const DT={
 of:{t:'offers',h:'العروض',show:x=>x.name+' — '+fm(x.price_new),F:[['name','اسم العرض'],['image','صورة','img'],['description','وصف','ta'],['items','عناصر العرض (كل سطر عنصر)','list'],['price_old','السعر الأساسي','num'],['price_new','السعر بعد الخصم','num'],['discount_pct','نسبة الخصم % (تُحسب تلقائيًا لو تُركت فارغة)','num'],['active','يظهر في الموقع','bool']]},
 jb:{t:'jobs',h:'الوظائف',show:x=>x.title,F:[['title','المسمى الوظيفي'],['description','الوصف','ta'],['requirements','المتطلبات','ta'],['apply_method','طريقة التقديم (رابط أو نص)'],['active','تظهر في الموقع','bool']]},
 pt:{t:'partners',h:'شركاء عملنا',show:x=>x.name,F:[['name','اسم الشريك'],['image','صورة','img'],['description','وصف','ta'],['active','يظهر في الموقع','bool']]},
 fd:{t:'order_fields',h:'حقول نموذج الطلب',show:x=>x.label+' ('+x.type+')'+(x.required?' *':''),F:[['label','اسم الحقل'],['type','النوع','sel',['text','textarea','tel','number','url','color','select']],['options','خيارات النوع select (كل سطر خيار)','list'],['only_svc','يظهر فقط مع خدمة بعينها (اتركه فارغًا للكل، مثال: book)'],['required','مطلوب','bool'],['active','يظهر','bool'],['sort','الترتيب','num']]}
};
function adminTab(M,t){
 if(!sb){M.innerHTML='<h2>غير مفعّل</h2><p class="sub">أضف supabaseUrl و supabaseKey في js/config.js.</p>';return}
 if(!me||me.role!=='admin'){M.innerHTML='<h2>تسجيل الدخول</h2><div class="glass f"><span>سجّل الدخول بحساب أدمن لإدارة البيانات.</span><div><button class="btn" id="g_al">تسجيل الدخول</button></div></div>';$('#g_al').onclick=()=>{gmode='in';openM()};return}
 M.innerHTML='<p class="sub">جارٍ التحميل...</p>';
 t==='us'?adminUsers(M):t==='od'?adminOrders(M):dbCrud(M,t);
}
async function dbCrud(M,k){
 const C=DT[k],r=await sb.from(C.t).select('*').order('sort').order('created_at',{ascending:false});
 if(r.error){M.innerHTML='<p class="sub">'+esc(r.error.message)+'</p>';return}
 const A=r.data,cur=A.find(x=>x.id===editId)||{active:true};
 M.innerHTML=`<h2>${C.h}</h2><div class="glass f">`+C.F.map(([f,l,ty,o])=>`<label>${l}</label>`+(ty==='ta'||ty==='list'?`<textarea rows="3" data-k="${f}">${esc(ty==='list'?(cur[f]||[]).join('\n'):cur[f]||'')}</textarea>`:ty==='img'?`<input type="file" accept="image/*" data-k="${f}">${cur[f]?'<small>توجد صورة محفوظة، اختر ملفًا لاستبدالها</small>':''}`:ty==='bool'?`<input type="checkbox" data-k="${f}" ${cur[f]?'checked':''} style="width:auto">`:ty==='sel'?`<select data-k="${f}">${o.map(v=>`<option ${v===cur[f]?'selected':''}>${v}</option>`).join('')}</select>`:`<input data-k="${f}" ${ty==='num'?'type="number" min="0"':''} value="${esc(cur[f]??'')}">`)).join('')
 +`<div><button class="btn" id="cs">${editId?'حفظ التعديل':'إضافة'}</button> ${editId?'<button class="btn ghost" id="cx">إلغاء</button>':''} <small id="cm"></small></div></div><div class="glass" style="overflow:auto"><table class="tbl">`
 +(A.map(x=>`<tr><td>${x.image?`<img src="${esc(x.image)}" alt="" style="height:42px;border-radius:6px">`:''}</td><td>${esc(C.show(x))}${x.active?'':' <small>(مخفي)</small>'}</td><td style="white-space:nowrap"><button class="btn sm ghost" data-e="${x.id}">تعديل</button> <button class="btn sm red" data-d="${x.id}">حذف</button></td></tr>`).join('')||'<tr><td>لا توجد عناصر بعد.</td></tr>')+'</table></div>';
 const done=()=>{editId=null;dbCrud(M,k);loadPublic()};
 $('#cs').onclick=async()=>{
  const o={};
  for(const el of M.querySelectorAll('[data-k]')){const f=el.dataset.k,ty=(C.F.find(x=>x[0]===f)||[])[2];
   if(ty==='img'){if(el.files[0])o[f]=await img2url(el.files[0],800)}
   else if(ty==='bool')o[f]=el.checked;
   else if(ty==='list')o[f]=el.value.split('\n').map(x=>x.trim()).filter(Boolean);
   else if(ty==='num')o[f]=el.value===''?(f==='sort'?0:null):+el.value;
   else o[f]=el.value.trim()||(f==='only_svc'?null:'')}
  if(!o[C.F[0][0]])return alert('أكمل البيانات المطلوبة');
  if(k==='of'&&!o.discount_pct&&o.price_old&&o.price_new)o.discount_pct=Math.round((1-o.price_new/o.price_old)*100);
  const {error}=editId?await sb.from(C.t).update(o).eq('id',editId):await sb.from(C.t).insert(o);
  error?alert(error.message):done();
 };
 if(editId)$('#cx').onclick=done;
 M.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{editId=b.dataset.e;dbCrud(M,k)});
 M.querySelectorAll('[data-d]').forEach(b=>b.onclick=async()=>{if(!confirm('تأكيد الحذف؟'))return;const {error}=await sb.from(C.t).delete().eq('id',b.dataset.d);error?alert(error.message):done()});
}
async function adminOrders(M){
 const {data,error}=await sb.from('orders').select('*,profiles(name,phone,gmail,subject,gov)').order('created_at',{ascending:false});
 if(error){M.innerHTML='<p class="sub">'+esc(error.message)+'</p>';return}
 M.innerHTML=`<h2>الطلبات (${data.length})</h2>`+(data.map(o=>{const p=o.profiles||{};return `<div class="glass f" data-o="${o.id}"><b>${esc(p.name)} <small>${esc(p.subject)} — ${esc(p.gov)}</small></b><small dir="ltr" style="text-align:start">${esc(p.phone)} ${esc(p.gmail)} · ${new Date(o.created_at).toLocaleString('ar-EG')}</small>`
  +o.items.map(i=>`<div class="line"><span>${esc(i.n)}${i.q>1?' × '+i.q:''}</span><span>${fm(i.c)}</span></div>`).join('')
  +o.answers.map(a=>`<div class="line"><span>${esc(a.l)}</span><span>${esc(a.v)}</span></div>`).join('')
  +`<div class="line" style="font-weight:800;color:var(--lime)"><span>الإجمالي</span><span>${fm(o.total)}</span></div><select data-st>${Object.entries(ST).map(([k,v])=>`<option value="${k}" ${k===o.status?'selected':''}>${v}</option>`).join('')}</select></div>`}).join('')||'<p class="sub">لا توجد طلبات بعد.</p>');
 M.onchange=async e=>{
  if(!e.target.matches('[data-st]'))return;const id=e.target.closest('[data-o]').dataset.o,st=e.target.value;
  const {error}=await sb.from('orders').update({status:st}).eq('id',id);if(error)return alert(error.message);
  if(st==='completed')notify(id);
 };
}
async function notify(id){
 if(!CF.backendUrl)return alert('تم تغيير الحالة. إشعار واتساب غير مفعّل: أضف backendUrl في js/config.js');
 const {data:{session}}=await sb.auth.getSession();
 try{const r=await fetch(CF.backendUrl.replace(/\/$/,'')+'/api/notify-completed',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+session.access_token},body:JSON.stringify({orderId:id})});
  const j=await r.json().catch(()=>({}));alert(r.ok?'تم إرسال إشعار واتساب للعميل':'تعذر إرسال واتساب: '+(j.error||r.status))}
 catch(e){alert('تعذر الوصول للـ Backend')}
}
async function adminUsers(M){
 const {data,error}=await sb.from('profiles').select('*').neq('role','admin').order('created_at',{ascending:false});
 if(error){M.innerHTML='<p class="sub">'+esc(error.message)+'</p>';return}
 M.innerHTML=`<h2>المدرسون (${data.length})</h2><div class="glass f">`+(data.map(u=>`<div class="er" data-u="${u.id}">${u.avatar?`<img src="${esc(u.avatar)}" alt="" style="height:42px;width:42px;border-radius:50%;object-fit:cover">`:''}<input data-f="name" value="${esc(u.name)}"><input data-f="subject" value="${esc(u.subject)}"><input data-f="gov" value="${esc(u.gov)}"><input data-f="phone" dir="ltr" value="${esc(u.phone)}"><input data-f="gmail" dir="ltr" placeholder="Gmail" value="${esc(u.gmail)}"><button class="btn sm ghost" data-a="pw">كلمة المرور</button><button class="btn sm ${u.active?'ghost':''}" data-a="act">${u.active?'تعطيل':'تفعيل'}</button><button class="btn sm red" data-a="del">حذف</button></div>`).join('')||'<span>لا يوجد مدرسون بعد.</span>')+'</div>';
 M.onchange=async e=>{const r=e.target.closest('[data-u]'),f=e.target.dataset.f;if(!r||!f)return;const {error}=await sb.from('profiles').update({[f]:e.target.value.trim()||null}).eq('id',r.dataset.u);if(error)alert(error.message)};
 M.onclick=async e=>{
  const a=e.target.dataset.a,r=e.target.closest('[data-u]');if(!a||!r)return;const id=r.dataset.u;let x;
  if(a==='pw'){const p=prompt('كلمة المرور الجديدة (6 أحرف على الأقل)');if(!p||p.length<6)return;x=await sb.rpc('admin_set_password',{uid:id,pw:p});if(!x.error)alert('تم تغيير كلمة المرور')}
  if(a==='act')x=await sb.rpc('admin_set_active',{uid:id,flag:e.target.textContent==='تفعيل'});
  if(a==='del'){if(!confirm('حذف الحساب نهائيًا؟'))return;x=await sb.rpc('admin_delete_user',{uid:id})}
  if(x&&x.error)return alert(x.error.message);
  if(a!=='pw'){adminUsers(M);loadPublic()}
 };
}
if(sb){const r0=renderSite;renderSite=function(){r0();paintX()};loadMe();loadPublic()}
