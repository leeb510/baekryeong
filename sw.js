// 백령호텔: 온라인이면 항상 최신 파일, 오프라인이면 저장해 둔 파일로 실행
const C='baekryeong-v3';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.registration.scope))return;
  e.respondWith(fetch(r,/\.(html|webmanifest)$|\/$/.test(new URL(r.url).pathname)?{cache:'no-store'}:{}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./baekryeong.html'))));
});
