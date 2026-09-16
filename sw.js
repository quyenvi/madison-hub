/* Increment VERSION whenever you change any app file, including content.js. */
const VERSION = 'v6-math-levels';
const PREFIX = 'madison-hub-' + self.registration.scope;
const CACHE = PREFIX + VERSION;
const APP = ['./','./index.html','./styles.css','./content.js','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache=>Promise.all(APP.map(async path => { const url = new URL(path, self.registration.scope); url.searchParams.set('release', VERSION); const response = await fetch(url, {cache:'reload'}); if(!response.ok) throw new Error('App download failed'); await cache.put(new URL(path, self.registration.scope), response); }))));
  // Let existing app windows finish on their current version. Close all windows to update.
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    // Serve one consistent app version, including the editable starter content.
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    try{return await fetch(event.request);}catch{
      if(event.request.mode==='navigate')return (await cache.match('./index.html')) || Response.error();
      return Response.error();
    }
  })());
});

