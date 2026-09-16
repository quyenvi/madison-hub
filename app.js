'use strict';
const content = window.HUB_CONTENT;
const main = document.querySelector('#main');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
 home:'M3 10 12 3l9 7v10H3z M9 20v-7h6v7',
 math:'M5 4h14v16H5z M8 8h8 M8 12h2 M14 12h2 M8 16h2 M14 16h2',
 basketball:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3v18 M6 5c7 4 7 10 0 14 M18 5c-7 4-7 10 0 14',
 travel:'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2z M9 3v16 M15 5v16',
 school:'M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3z M12 6v15'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
const sections = [
 {id:'math',name:'Math',desc:'Small steps. Stronger skills.',meta:'5-question warm-up'},
 {id:'basketball',name:'Basketball',desc:'Put in the work. Find your game.',meta:'Your practice plan'},
 {id:'travel',name:'Travel',desc:'A little planning. A new adventure.',meta:'Explore & get ready'},
 {id:'school',name:'School',desc:'Clear your mind. Plan your day.',meta:'Your daily checklist'}
];
let state = {}; let storageOK = true;
try { const saved=JSON.parse(localStorage.getItem('madison-hub-v1') || '{}'); if(saved && typeof saved==='object' && !Array.isArray(saved)) state=saved; } catch { storageOK=false; }
function save(){try{localStorage.setItem('madison-hub-v1',JSON.stringify(state));}catch{storageOK=false; const warning=document.querySelector('#storage-warning'); if(warning) warning.hidden=false;}}
let quizIndex=0, quizScore=0, answered=false;
const intro = (label,title,subtitle) => `<div class="intro"><div class="eyebrow">${label}</div><h1>${escapeHTML(title)}</h1><p>${escapeHTML(subtitle)}</p></div>`;
function home(){
 return intro('YOUR EVERYDAY, A LITTLE MORE YOU.',`Hey, ${content.name}.`,'What are you getting into today?') +
 `<section class="hero"><div><div class="eyebrow">A LITTLE DAILY MOMENTUM</div><h2>Give your brain a warm-up.</h2><p>Five questions. A fresh start. Build your confidence, one answer at a time.</p><a class="primary" href="#math">Let’s practice <span aria-hidden="true">↗</span></a></div><div class="hero-mark" aria-hidden="true">5<span style="font-size:.55em">/5</span></div></section>
 <div class="section-heading"><h2>Your spaces</h2><span>Pick a place to start</span></div><div class="cards">${sections.map((s,i)=>`<a class="card ${s.id}" href="#${s.id}"><div class="card-top"><span class="icon-box">${icon(s.id)}</span><span class="number">0${i+1}</span></div><h2>${s.name}</h2><p>${s.desc}</p><div class="card-bottom"><span>${s.meta}</span><span aria-hidden="true">↗</span></div></a>`).join('')}</div>`;
}
function checklist(group,items){
 return `<div class="progress-label" id="${group}-progress" aria-live="polite"></div><progress id="${group}-bar" max="${items.length || 1}" value="0" aria-label="${group} completed"></progress><div class="check-list">${items.map(item=>`<label class="check-row"><input type="checkbox" data-group="${group}" data-id="${escapeHTML(item.id)}" ${state[group+':'+item.id]?'checked':''}><span><strong>${escapeHTML(item.title)}</strong>${item.detail?`<small>${escapeHTML(item.detail)}</small>`:''}</span></label>`).join('')}</div><button class="text-button" data-reset="${group}">Reset checklist</button>`;
}
function updateProgress(){ for(const group of ['basketball','packing','school']){const inputs=[...document.querySelectorAll(`input[data-group="${group}"]`)]; if(!inputs.length)continue; const done=inputs.filter(i=>i.checked).length;document.querySelector(`#${group}-progress`).textContent=`${done} of ${inputs.length} complete`;document.querySelector(`#${group}-bar`).value=done;}}
function math(){return intro('MATH','A little sharper, every day.','Take your time. Every question is a chance to learn.')+`<div class="two-col"><section class="panel" id="quiz" aria-label="Math practice"></section><aside class="panel"><h2>A good way to get unstuck</h2><ol class="steps"><li>Read the question one more time.</li><li>Write down what you know.</li><li>Try one small step, then check it.</li></ol><p class="note">Scratch paper is always welcome. This is practice, so there’s no timer.</p></aside></div>`;}
function drawQuiz(){const target=document.querySelector('#quiz');if(quizIndex>=content.math.length){target.innerHTML=`<div class="eyebrow">PRACTICE COMPLETE</div><h2>Nice work showing up.</h2><p>You got <strong>${quizScore} of ${content.math.length}</strong> correct. Keep building from here.</p><button class="primary" id="restart">Practice again</button>`;document.querySelector('#restart').onclick=()=>{quizIndex=0;quizScore=0;answered=false;drawQuiz();};return;}
 const q=content.math[quizIndex];target.innerHTML=`<div class="progress-label">Question ${quizIndex+1} of ${content.math.length}</div><progress max="${content.math.length}" value="${quizIndex}" aria-label="Questions completed"></progress><h2 class="question">${escapeHTML(q.question)}</h2><div class="choices">${q.choices.map((c,i)=>`<button class="choice" data-answer="${i}">${escapeHTML(c)}</button>`).join('')}</div><div class="feedback" role="status" aria-live="polite"></div>`;
 target.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>{if(answered)return;answered=true;const selected=Number(button.dataset.answer);const correct=selected===q.answer;if(correct)quizScore++;target.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;if(Number(b.dataset.answer)===q.answer)b.classList.add('correct');else if(b===button)b.classList.add('wrong');});target.querySelector('.feedback').innerHTML=`<strong>${correct?'You’ve got it.':'Keep going — here’s how.'}</strong><br>${escapeHTML(q.explanation)}`;const next=document.createElement('button');next.className='primary quiz-next';next.textContent=quizIndex===content.math.length-1?'See how you did':'Next question';next.onclick=()=>{quizIndex++;answered=false;drawQuiz();document.querySelector('#quiz h2').setAttribute('tabindex','-1');document.querySelector('#quiz h2').focus();};target.append(next);});
}
function render(){const route=location.hash.slice(1);const active=sections.some(s=>s.id===route)?route:'home';document.title=`${active==='home'?'Home':sections.find(s=>s.id===active).name} · Madison Hub`;
 document.querySelector('#nav').innerHTML=[{id:'home',name:'Home'},...sections].map(s=>`<a class="nav-link" href="#${s.id}" ${s.id===active?'aria-current="page"':''}>${icon(s.id)}<span>${s.name}</span></a>`).join('');
 if(active==='home') main.innerHTML=home();
 if(active==='math'){quizIndex=0;quizScore=0;answered=false;main.innerHTML=math();drawQuiz();}
 if(active==='basketball')main.innerHTML=intro('BASKETBALL','Make the next rep count.','A simple practice plan for your next time on the court.')+`<div class="two-col"><section class="panel"><h2>Today’s practice <span class="muted">· 15 min</span></h2>${checklist('basketball',content.basketball)}</section><aside class="panel basketball"><div class="eyebrow">YOUR FOCUS</div><h2>Control before speed.</h2><p>Stay balanced. Keep your eyes up. Make each rep intentional.</p><p class="note">Start with your usual warm-up. Take water breaks and follow your coach’s guidance.</p></aside></div>`;
 if(active==='travel')main.innerHTML=intro('TRAVEL','Your next little adventure.',content.trip.subtitle)+`<div class="two-col"><section class="panel"><h2>${escapeHTML(content.trip.title)}</h2>${content.trip.stops.map(s=>`<div class="timeline-item"><time>${escapeHTML(s.time)}</time><div><h3>${escapeHTML(s.title)}</h3><p>${escapeHTML(s.detail)}</p></div></div>`).join('')}</section><section class="panel"><h2>Before you go</h2>${checklist('packing',content.packing)}</section></div>`;
 if(active==='school')main.innerHTML=intro('SCHOOL','A clear plan. A fresh start.','Keep the little things together, so you can focus on what’s next.')+`<div class="two-col"><section class="panel"><h2>Your daily checklist</h2>${checklist('school',content.school)}</section><aside class="panel school"><div class="eyebrow">ONE THING AT A TIME</div><h2>Make a little focus space.</h2><p>Choose one task, clear a spot, and put distractions aside. Take a short break when you finish.</p><a class="primary" href="#math">Try the math warm-up ↗</a></aside></div>`;
 if(['school','travel','basketball'].includes(active)){main.insertAdjacentHTML('beforeend',`<p class="note">Checkmarks are saved on this device. Use Reset checklist when you want a fresh start.</p>`);}
 main.insertAdjacentHTML('beforeend',`<p id="storage-warning" class="storage-warning" ${storageOK?'hidden':''}>This browser can’t save progress right now. You can still use the hub during this visit.</p>`);
 updateProgress();main.querySelectorAll('input[data-group]').forEach(input=>input.onchange=()=>{state[input.dataset.group+':'+input.dataset.id]=input.checked;save();updateProgress();});
 main.querySelectorAll('[data-reset]').forEach(button=>button.onclick=()=>{main.querySelectorAll(`input[data-group="${button.dataset.reset}"]`).forEach(input=>{input.checked=false;delete state[input.dataset.group+':'+input.dataset.id];});save();updateProgress();});
}
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);main.focus();});render();
let deferredInstall;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstall=event;});
document.querySelector('#install').onclick=async()=>{if(deferredInstall){await deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;}else document.querySelector('#install-dialog').showModal();};
function installed(){document.querySelector('#install').hidden=window.matchMedia('(display-mode: standalone)').matches || navigator.standalone===true;}
window.addEventListener('appinstalled',installed);installed();
let offlineReady=false;
function connection(){document.querySelector('#connection').textContent=!navigator.onLine?(offlineReady?'Offline · ready to use':'You’re offline'):(offlineReady?'Ready offline':'Online');}
window.addEventListener('online',connection);window.addEventListener('offline',connection);connection();
if('serviceWorker' in navigator && window.isSecureContext){navigator.serviceWorker.register('./sw.js').then(async registration=>{await navigator.serviceWorker.ready;offlineReady=true;connection();registration.update().catch(()=>{});}).catch(()=>{document.querySelector('#connection').textContent='Online only';});}
