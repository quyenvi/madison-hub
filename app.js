'use strict';
const content = window.HUB_CONTENT;
const main = document.querySelector('#main');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
 ela:'M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3z M12 6v15 M6 8h3 M15 8h3 M6 12h3 M15 12h3',
 ai:'M9 3h6v3h3v12H6V6h3z M9 10h.01 M15 10h.01 M9 14h6 M3 9v6 M21 9v6 M9 18v3 M15 18v3',
 calendar:'M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4 M8 14h2 M14 14h2 M8 18h2',
 home:'M3 10 12 3l9 7v10H3z M9 20v-7h6v7',
 math:'M5 4h14v16H5z M8 8h8 M8 12h2 M14 12h2 M8 16h2 M14 16h2',
 history:'M6 20h12 M8 20V9 M16 20V9 M5 9h14 M9 9V5h6v4',
 basketball:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3v18 M6 5c7 4 7 10 0 14 M18 5c-7 4-7 10 0 14',
 travel:'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2z M9 3v16 M15 5v16',
 school:'M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3z M12 6v15'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
const sections = [
 {id:'ai',name:'AI',desc:'Explore how AI works.',meta:'Eight weekly lessons'},
 {id:'ela',name:'ELA',desc:'Read closely. Write clearly.',meta:'5-question practice'},
 {id:'math',name:'Math',desc:'Small steps. Stronger skills.',meta:'5-question warm-up'},
 {id:'history',name:'History',desc:'State a claim. Back it up.',meta:'5-question practice'},
 {id:'basketball',name:'Basketball',desc:'Put in the work. Find your game.',meta:'Your practice plan'},
 {id:'travel',name:'Travel',desc:'A little planning. A new adventure.',meta:'Explore & get ready'},
 {id:'school',name:'School',desc:'Clear your mind. Plan your day.',meta:'Grade 7 classes'}
];
const mainSections=sections.filter(s=>!['basketball','school'].includes(s.id));
mainSections.splice(mainSections.findIndex(s=>s.id==='travel'),0,{id:'calendar',name:'Calendar',desc:'Basketball and school, each in its own panel.',meta:'Two separate calendars'});
function calendarRoute(hash){
 const route=hash.replace(/^#/,'');
 if(['calendar','calendar/basketball','basketball'].includes(route))return {active:'basketball',nav:'calendar'};
 if(['calendar/school','school'].includes(route))return {active:'school',nav:'calendar'};
 const active=sections.some(s=>s.id===route)?route:'home';return {active,nav:active};
}
function calendarSubnav(active){
 return '<nav class="calendar-subnav" aria-label="Calendar panels"><a href="#calendar/basketball" '+(active==='basketball'?'aria-current="page"':'')+'>'+icon('basketball')+'<span>Basketball</span></a><a href="#calendar/school" '+(active==='school'?'aria-current="page"':'')+'>'+icon('school')+'<span>School</span></a></nav>';
}
function basketballTheme(team){
 const name=String(team||'').toLowerCase().replace(/[^a-z0-9]/g,'');
 if(['aces','vfwaces'].includes(name))return 'aces';
 if(['ocr','ocrpink','ocrhythm','ocrhythmpink','ocrhythm7pink'].includes(name))return 'ocr';
 return name==='all'?'mixed':'neutral';
}
let state = {}; let storageOK = true;
try { const saved=JSON.parse(localStorage.getItem('madison-hub-v1') || '{}'); if(saved && typeof saved==='object' && !Array.isArray(saved)) state=saved; } catch { storageOK=false; }
function save(){try{localStorage.setItem('madison-hub-v1',JSON.stringify(state));}catch{storageOK=false; const warning=document.querySelector('#storage-warning'); if(warning) warning.hidden=false;}}
let quizIndex=0, quizScore=0, answered=false, quizQuestions=[];
let mathLevel=content.mathLevels.some(level=>level.id===state.mathLevel)?state.mathLevel:'stretch';
const mathQueues={};
function startQuiz(){
 const level=content.mathLevels.find(level=>level.id===mathLevel);
 let queue=mathQueues[mathLevel]||[];
 const picked=[];
 while(picked.length<Math.min(5,level.questions.length)){
  if(!queue.length){queue=level.questions.filter(q=>!picked.includes(q));for(let i=queue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[queue[i],queue[j]]=[queue[j],queue[i]];}}
  picked.push(queue.pop());
 }
 mathQueues[mathLevel]=queue;quizQuestions=picked;quizIndex=0;quizScore=0;answered=false;
}
function selectMathLevel(value){
 mathLevel=value;state.mathLevel=mathLevel;save();startQuiz();
 document.querySelector('#math-level').value=mathLevel;
 document.querySelector('#math-description').textContent=content.mathLevels.find(l=>l.id===mathLevel).description;
 drawQuiz();
}
function bindMath(){
 document.querySelector('#ltq-practice').onclick=()=>{selectMathLevel('ltq2');const heading=document.querySelector('#quiz h2');heading.setAttribute('tabindex','-1');heading.focus();};
 document.querySelector('#math-level').onchange=event=>selectMathLevel(event.target.value);
 document.querySelector('#new-set').onclick=()=>{startQuiz();drawQuiz();};
}
const intro = (label,title,subtitle) => `<div class="intro"><div class="eyebrow">${label}</div><h1>${escapeHTML(title)}</h1><p>${escapeHTML(subtitle)}</p></div>`;
function home(){
 return intro('YOUR EVERYDAY, A LITTLE MORE YOU.',`Hey, ${content.name}.`,'What are you getting into today?') +
 `<section class="hero"><div><div class="eyebrow">A LITTLE DAILY MOMENTUM</div><h2>Give your brain a warm-up.</h2><p>Five questions. A fresh start. Build your confidence, one answer at a time.</p><a class="primary" href="#math">Let’s practice <span aria-hidden="true">↗</span></a></div><div class="hero-mark" aria-hidden="true">5<span style="font-size:.55em">/5</span></div></section>
 <div class="section-heading"><h2>Your spaces</h2><span>Pick a place to start</span></div><div class="cards">${mainSections.map((s,i)=>`<a class="card ${s.id}" href="#${s.id}"><div class="card-top"><span class="icon-box">${icon(s.id)}</span><span class="number">0${i+1}</span></div><h2>${s.name}</h2><p>${s.desc}</p><div class="card-bottom"><span>${s.meta}</span><span aria-hidden="true">↗</span></div></a>`).join('')}</div>`;
}
function checklist(group,items){
 return `<div class="progress-label" id="${group}-progress" aria-live="polite"></div><progress id="${group}-bar" max="${items.length || 1}" value="0" aria-label="${group} completed"></progress><div class="check-list">${items.map(item=>`<label class="check-row"><input type="checkbox" data-group="${group}" data-id="${escapeHTML(item.id)}" ${state[group+':'+item.id]?'checked':''}><span><strong>${escapeHTML(item.title)}</strong>${item.detail?`<small>${escapeHTML(item.detail)}</small>`:''}</span></label>`).join('')}</div><button class="text-button" data-reset="${group}">Reset checklist</button>`;
}
function updateProgress(){ for(const group of ['basketball','packing','school']){const inputs=[...document.querySelectorAll(`input[data-group="${group}"]`)]; if(!document.querySelector('#'+group+'-progress'))continue; const done=inputs.filter(i=>i.checked).length;document.querySelector(`#${group}-progress`).textContent=`${done} of ${inputs.length} complete`;document.querySelector(`#${group}-bar`).value=done;}}
function math(){return intro('MATH','A little sharper, every day.','Choose your level. Build confidence, then stretch yourself.')+`<section class="panel team-schedule" aria-labelledby="ltq-title"><div class="eyebrow">MATH 7 · ALDANA · PARENTSQUARE OCTOBER 2, 2026</div><h2 id="ltq-title">Unit 1 assessment · Thursday Oct 8 and Friday Oct 9</h2><p><strong>Thursday, October 8:</strong> Learning Targets 1.1 through 1.5.</p><p><strong>Friday, October 9:</strong> Learning Targets 1.6 through 1.9.</p><p><strong>Review</strong> is Monday through Wednesday, October 5–7. The extra practice packet from the start of the unit is due <strong>Friday, October 9</strong> and will not be accepted late. No tutorial that week because those are minimum days.</p><p>The questions below are the older LTQ #2 set. <strong>This set covers Targets 1.4–1.6 only</strong> (add, multiply, and divide positive and negative fractions), not the whole unit.</p><button class="primary" id="ltq-practice">Practice Targets 1.4–1.6 only (add, multiply, and divide positive and negative fractions), not the whole unit</button></section><div class="trip-toolbar"><label for="math-level">Practice level<select id="math-level">${content.mathLevels.map(l=>`<option value="${l.id}" ${l.id===mathLevel?'selected':''}>${l.name}</option>`).join('')}</select></label><button class="small-button" id="new-set">Start new set</button></div><p class="muted" id="math-description">${escapeHTML(content.mathLevels.find(l=>l.id===mathLevel).description)}</p><p class="note">${content.mathLevels.reduce((total,level)=>total+level.questions.length,0)} questions across ${content.mathLevels.length} practice options. Each set has five questions. Changing levels or starting a new set resets this score.</p><div class="two-col"><section class="panel" id="quiz" aria-label="Math practice"></section><aside class="panel"><h2>A good way to get unstuck</h2><ol class="steps"><li>Read the question one more time.</li><li>Write down what you know.</li><li>Try one small step, then check it.</li></ol><p class="note">Scratch paper is always welcome. This is practice, so there’s no timer.</p></aside></div>`;}
function drawQuiz(){const target=document.querySelector('#quiz');if(quizIndex>=quizQuestions.length){target.innerHTML=`<div class="eyebrow">PRACTICE COMPLETE</div><h2>Nice work showing up.</h2><p>You got <strong>${quizScore} of ${quizQuestions.length}</strong> correct. Keep building from here.</p><button class="primary" id="restart">Try another set</button>`;document.querySelector('#restart').onclick=()=>{startQuiz();drawQuiz();};return;}
 const q=quizQuestions[quizIndex];target.innerHTML=`<div class="progress-label">Question ${quizIndex+1} of ${quizQuestions.length}</div><progress max="${quizQuestions.length}" value="${quizIndex}" aria-label="Questions completed"></progress><div class="eyebrow">${escapeHTML(q.topic)}</div><h2 class="question">${escapeHTML(q.question)}</h2><div class="choices">${q.choices.map((c,i)=>`<button class="choice" data-answer="${i}">${escapeHTML(c)}</button>`).join('')}</div><div class="feedback" role="status" aria-live="polite"></div>`;
 target.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>{if(answered)return;answered=true;const selected=Number(button.dataset.answer);const correct=selected===q.answer;if(correct)quizScore++;target.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;if(Number(b.dataset.answer)===q.answer)b.classList.add('correct');else if(b===button)b.classList.add('wrong');});target.querySelector('.feedback').innerHTML=`<strong>${correct?'You’ve got it.':'Keep going — here’s how.'}</strong><br>${escapeHTML(q.explanation)}`;const next=document.createElement('button');next.className='primary quiz-next';next.textContent=quizIndex===quizQuestions.length-1?'See how you did':'Next question';next.onclick=()=>{quizIndex++;answered=false;drawQuiz();document.querySelector('#quiz h2').setAttribute('tabindex','-1');document.querySelector('#quiz h2').focus();};target.append(next);});
 mountFruit(target,q,'[data-answer]');
}

const TRIP_TEMPLATES = [
  {
    "id": "disneyland",
    "title": "Disneyland day",
    "details": "Before you go: plan the day with your family.\nMorning: choose a few favorite attractions.\nAfternoon: take a lunch and rest break.\nEvening: pick one last activity together.",
    "items": [
      "Comfortable walking shoes",
      "Refillable water bottle",
      "Hat",
      "Sunscreen",
      "Light jacket",
      "Portable charger"
    ]
  },
  {
    "id": "beach",
    "title": "Beach day",
    "details": "Morning: find a spot with your family.\nAfternoon: enjoy a picnic, beach games, and a shoreline walk.\nBefore leaving: gather your things and leave the beach clean.",
    "items": [
      "Swimsuit",
      "Beach towel",
      "Sunscreen",
      "Hat",
      "Sandals",
      "Dry clothes",
      "Water bottle"
    ]
  },
  {
    "id": "tournament",
    "title": "Basketball tournament",
    "details": "Before leaving: confirm game times and the court with your family or coach.\nBefore each game: warm up with your team.\nBetween games: refill water, have a snack, and rest.",
    "items": [
      "Team uniform",
      "Basketball shoes",
      "Extra socks",
      "Water bottle",
      "Snacks",
      "Warm-up layer",
      "Change of clothes"
    ]
  },
  {
    "id": "camping",
    "title": "Camping weekend",
    "details": "Arrival: help your family set up camp.\nDaytime: choose a short walk or a campsite game.\nEvening: have dinner together and get ready for a night outdoors.",
    "items": [
      "Sleeping bag",
      "Sleeping pad",
      "Flashlight",
      "Warm layers",
      "Rain jacket",
      "Insect repellent",
      "Toiletries",
      "Water bottle"
    ]
  },
  {
    "id": "city",
    "title": "City adventure",
    "details": "Morning: choose a museum, park, or neighborhood to explore.\nAfternoon: stop for lunch and try one new activity.\nBefore heading home: check that everyone has their things.",
    "items": [
      "Comfortable walking shoes",
      "Small backpack",
      "Water bottle",
      "Light jacket",
      "Portable charger",
      "Snacks"
    ]
  }
];
function travelTrips(){
 if(!Array.isArray(state.trips)){
  state.trips=[{id:'sample',title:content.trip.title,subtitle:content.trip.subtitle,stops:content.trip.stops,items:content.packing.map(item=>({...item}))}];
 }
 return state.trips;
}
function currentTrip(){const trips=travelTrips();return trips.find(t=>t.id===state.selectedTrip)||trips[0];}
function travelPage(){const trips=travelTrips(),trip=currentTrip();return intro('TRAVEL','Your next little adventure.','Plan a trip. Make a list. Get ready to go.')+
 '<div class="trip-toolbar"><label for="trip-select">Your trips<select id="trip-select" '+(!trip?'disabled':'')+'>'+(!trip?'<option>No trips yet</option>':'')+trips.map(t=>'<option value="'+escapeHTML(t.id)+'" '+(t.id===trip.id?'selected':'')+'>'+escapeHTML(t.title)+'</option>').join('')+'</select></label><button class="primary" id="add-trip">+ Add trip</button></div>'+
 (trip?'<div class="two-col"><section class="panel"><button class="text-button delete-trip" id="delete-trip">Delete trip</button><h2>'+escapeHTML(trip.title)+'</h2><p class="muted trip-notes">'+escapeHTML(trip.subtitle||'Your next adventure starts here.')+'</p>'+trip.stops.map(s=>'<div class="timeline-item"><time>'+escapeHTML(s.time)+'</time><div><h3>'+escapeHTML(s.title)+'</h3><p>'+escapeHTML(s.detail)+'</p></div></div>').join('')+'</section><section class="panel"><h2>Before you go</h2>'+checklist('packing',trip.items)+
 '<form id="item-form" class="item-form"><label for="item-name">New packing item</label><div class="item-controls"><input id="item-name" name="item" required maxlength="100" placeholder="e.g. Basketball shoes" autocomplete="off"><button class="primary" type="submit">Add item</button></div></form><p id="item-message" class="note" role="status"></p></section></div>':'<section class="panel"><h2>No trips yet</h2><p>Add a trip to start a new packing list.</p></section>')+'<p class="note">Your trips and lists stay on this device. They aren’t shared with other visitors or synced between phones.</p>'+
 '<dialog id="delete-dialog" aria-labelledby="delete-title" aria-describedby="delete-description"><h2 id="delete-title">Delete this trip?</h2><p id="delete-description">Delete “'+escapeHTML(trip?.title||'')+'” and its packing list from this device? This can’t be undone.</p><div class="form-actions"><button class="small-button" id="keep-trip" autofocus>Keep trip</button><button class="primary danger-button" id="confirm-delete-trip">Delete trip</button></div></dialog><dialog id="trip-dialog" aria-labelledby="trip-dialog-title"><h2 id="trip-dialog-title">Where are you headed?</h2><form id="trip-form" class="trip-form"><label for="trip-template">Start with a template<select id="trip-template"><option value="">Blank trip</option>'+TRIP_TEMPLATES.map(t=>'<option value="'+t.id+'">'+escapeHTML(t.title)+'</option>').join('')+'</select></label><label for="trip-name">Trip name<input id="trip-name" name="title" required maxlength="100" placeholder="e.g. Weekend in San Diego"></label><label for="trip-details">Trip details <span class="muted">(optional)</span><textarea id="trip-details" name="details" maxlength="2000" rows="4" placeholder="Dates, places to visit, or a plan for the day"></textarea></label><div id="template-items" class="note" aria-live="polite"></div><p class="note">Choose a starter trip or begin with a blank list. Change the name and details to make it yours, then add packing items anytime.</p><div class="form-actions"><button type="button" class="small-button" id="cancel-trip">Cancel</button><button type="submit" class="primary">Create trip</button></div></form></dialog>';
}
function bindTravel(){
 const deleteButton=document.querySelector('#delete-trip');
 if(deleteButton){
  const deleteDialog=document.querySelector('#delete-dialog');
  deleteButton.onclick=()=>deleteDialog.showModal();
  document.querySelector('#keep-trip').onclick=()=>deleteDialog.close();
  document.querySelector('#confirm-delete-trip').onclick=()=>{
   const trip=currentTrip();
   for(const item of trip.items)delete state['packing:'+item.id];
   state.trips=travelTrips().filter(t=>t.id!==trip.id);
   state.selectedTrip=state.trips[0]?.id||null;
   save();deleteDialog.close();render();document.querySelector('#add-trip').focus();
  };
 }
 document.querySelector('#trip-select').onchange=event=>{state.selectedTrip=event.target.value;save();render();document.querySelector('#trip-select').focus();};
 const dialog=document.querySelector('#trip-dialog');
 document.querySelector('#trip-template').onchange=event=>{
  const template=TRIP_TEMPLATES.find(t=>t.id===event.target.value);
  document.querySelector('#trip-name').value=template?.title||'';
  document.querySelector('#trip-name').setCustomValidity('');
  document.querySelector('#trip-details').value=template?.details||''; document.querySelector('#template-items').textContent=template?'Packing list: '+template.items.join(', ')+'.':'Your packing list starts empty.';
 };

 document.querySelector('#add-trip').onclick=()=>dialog.showModal();
 document.querySelector('#cancel-trip').onclick=()=>dialog.close();
 document.querySelector('#trip-form').onsubmit=event=>{
  event.preventDefault();const field=document.querySelector('#trip-name'),title=field.value.trim();
  if(!title){field.setCustomValidity('Enter a trip name.');field.reportValidity();return;}
  const id=crypto.randomUUID();
  travelTrips().push({id,title,subtitle:document.querySelector('#trip-details').value.trim(),stops:[],items:(TRIP_TEMPLATES.find(t=>t.id===document.querySelector('#trip-template').value)?.items||[]).map((title,index)=>({id:id+'-'+index,title}))});
  state.selectedTrip=id;save();dialog.close();render();document.querySelector('#trip-select').focus();
 };
 document.querySelector('#trip-name').oninput=event=>event.target.setCustomValidity('');
 if(!currentTrip())return;
 document.querySelector('#item-name').oninput=event=>event.target.setCustomValidity('');
 document.querySelector('#item-form').onsubmit=event=>{
  event.preventDefault();const field=document.querySelector('#item-name'),title=field.value.trim();
  if(!title){field.setCustomValidity('Enter an item name.');field.reportValidity();return;}
  currentTrip().items.push({id:crypto.randomUUID(),title});save();render();document.querySelector('#item-message').textContent=title+' added.';document.querySelector('#item-name').focus();
 };
}


const calendar=window.MADISON_WEEKLY_CALENDAR;
let scheduleTeam='all',scheduleWeek=calendar.monday(calendar.today());
function validSchedule(raw){
 if(!raw||raw.format!=='madison-hub-schedule'||raw.version!==1||!Array.isArray(raw.events)||raw.events.length>5000)throw Error('Choose a Madison Hub schedule JSON file.');
 const dateOK=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;
 const textOK=(v,max)=>typeof v==='string'&&v.length<=max;
 if(!dateOK(raw.coverageStart)||!dateOK(raw.coverageEnd)||raw.coverageStart>raw.coverageEnd||!textOK(raw.exportedAt,50)||Number.isNaN(Date.parse(raw.exportedAt)))throw Error('This schedule has invalid date information.');
 const events=raw.events.map((e,i)=>{
  if(!e||!dateOK(e.date)||!dateOK(e.endDate)||e.endDate<e.date||e.date<raw.coverageStart||e.date>raw.coverageEnd||!textOK(e.team,100)||!e.team.trim()||!textOK(e.title,200)||!e.title.trim()||!textOK(e.details,3000))throw Error('This schedule contains an invalid event. The previous schedule has been kept.');
  return {id:String(i),date:e.date,endDate:e.endDate,team:e.team,title:e.title,details:e.details};
 });
 return {format:raw.format,version:1,source:typeof raw.source==='string'?raw.source.slice(0,100):'Team calendar',timezone:'America/Los_Angeles',exportedAt:raw.exportedAt,coverageStart:raw.coverageStart,coverageEnd:raw.coverageEnd,events};
}
function calendarDate(date){return new Date(date+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});}
const officialAcesGames=[
 {id:'vfw-2026-aces-sabers-swish',date:'2026-10-10',startTime:'11:00',time:'11:00 AM Pacific',title:'vs. Sabers Swish',opponent:'Sabers Swish',side:'Away'},
 {id:'vfw-2026-aces-tigers-spirit',date:'2026-10-10',startTime:'14:00',time:'2:00 PM Pacific',title:'vs. Tigers Spirit',opponent:'Tigers Spirit',side:'Home'},
 {id:'vfw-2026-aces-tigers-wonder-girls',date:'2026-10-11',startTime:'12:00',time:'12:00 PM Pacific',title:'vs. Tigers Wonder Girls',opponent:'Tigers Wonder Girls',side:'Away'}
].map(e=>({...e,endDate:e.date,team:'aces',type:'Game',timeZone:'America/Los_Angeles',tournament:'VFW Invitational',venue:'Cypress High School - Main gym (front gym)',note:'VFW Invitational - Girls 7th Grade Silver - '+e.side+' team. Verified from the official TeamSnap schedule screenshots. Start time only; end time not provided.',sourceUrl:'https://events.teamsnap.com/events/50755/results',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination=Cypress%20High%20School'}));
const officialAcesSocial={
  "id": "vfw-social-2026-10-10",
  "date": "2026-10-10",
  "endDate": "2026-10-10",
  "team": "VFW Aces",
  "title": "VFW Tournament Social",
  "type": "Social",
  "startTime": "17:00",
  "endTime": "22:00",
  "timeZone": "America/Los_Angeles",
  "details": "5-10 PM Pacific - Dave & Buster's - Irvine Spectrum\n651 Spectrum Centre Drive, Irvine, CA 92618\nTeens (grades 7-12): dinner 6-9 PM on the outside patio.\nTeen raffle starts at 9 PM. Submit raffle tickets by 8:45 PM in the Showroom's Teens' Prize section. Winners must be present. Dance until 10 PM."
};
function isOfficialAcesSocialImport(e){
 const team=String(e.team||'').toLowerCase().replace(/[^a-z0-9]/g,'');
 return e.date==='2026-10-10'&&(e.id===officialAcesSocial.id||(/\bsocial\b/i.test(e.title)&&(['aces','vfwaces'].includes(team)||/\bvfw\b/i.test(e.title))));
}
function isOfficialAcesImport(e){
 const normalize=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
 if(!['aces','vfwaces'].includes(normalize(e.team))||e.date>'2026-10-11'||(e.endDate||e.date)<'2026-10-10')return false;
 if(/practice|social/i.test(e.title))return false;
 if(/vfw|invitational/i.test(e.title)&&/tournament|invitational/i.test(e.title))return true;
 return officialAcesGames.some(game=>game.date===e.date&&(e.id===game.id||normalize(e.title).includes(normalize(game.opponent))));
}
// Beginner after-school sessions; Pacific wall times survive the November DST change.
const startupStars=['2026-10-13','2026-10-20','2026-10-27','2026-11-03','2026-11-10','2026-11-17'].map(date=>({
 id:'startup-stars-beginner-'+date,date,endDate:date,team:'Startup Stars',title:'Beginner after-school session',
 startTime:'15:15',endTime:'16:15',timeZone:'America/Los_Angeles',
 details:'3:15-4:15 PM Pacific - Room P29\nGrades 6-8. Beginner Tuesdays. Bengal Marketplace date TBD.'
}));
const isStartupProgramEvent=e=>/\bstartup\s*stars\b/i.test(e.team+' '+e.title);
function scheduleEvents(){
 const weekly=window.OCR_WEEKLY_SCHEDULE.eventsBetween(scheduleWeek,calendar.addDays(scheduleWeek,6)).map(e=>({
  id:e.id,date:e.date,endDate:e.endDate,team:'OCR Pink',title:e.title,startTime:e.startTime,
  details:e.time+' · '+e.venue+'\n'+e.note
 }));
 // Keep the imported snapshot intact; show each matching weekly session only once.
 const key=e=>{
  let team=e.team.toLowerCase().replace(/[^a-z0-9]/g,'');
  if(['ocr','ocrpink','ocrhythm','ocrhythmpink','ocrhythm7pink'].includes(team))team='ocrpink';
  let title=e.title.toLowerCase().replace(/ocr\s*pink|oc\s*rhythm(?:\s*(?:7\s*)?pink)?/g,'').replace(/[^a-z0-9]/g,'');
  if(title==='academy')title='basketballacademy';
  return e.date+'|'+team+'|'+title;
 };
 const weeklyKeys=new Set(weekly.map(key));
 // One-week team update; imported device data stays untouched.
 const isChangedWestsidePractice=e=>e.date>='2026-10-05'&&e.date<='2026-10-11'
  &&/^westside(?:united)?$/.test(e.team.toLowerCase().replace(/[^a-z0-9]/g,''))
  &&/\bpractice\b/i.test(e.title);
 const acesGames=officialAcesGames.map(e=>({...e,team:'VFW Aces',details:e.time+' - '+e.venue+'\nGirls 7th Grade Silver - '+e.side+' team. Start time only; end time not provided.'}));
 const westsideUpdate={
  id:'westside-practice-2026-10-07',date:'2026-10-07',endDate:'2026-10-07',
  team:'Westside United',title:'Practice',startTime:'18:00',endTime:'19:30',timeZone:'America/Los_Angeles',
  details:'6:00-7:30 PM Pacific - Portola\nOnly Westside practice this week (October 5-11). Limited gym availability.'
 };
 return [...(state.teamSchedule?.events||[]).filter(e=>!weeklyKeys.has(key(e))&&!isChangedWestsidePractice(e)&&!isStartupProgramEvent(e)&&!isOfficialAcesImport(e)&&!isOfficialAcesSocialImport(e)),...weekly,westsideUpdate,...acesGames,officialAcesSocial];
}
function teamSchedule(){
 const schedule=state.teamSchedule;
 const teams=[...new Set(['OCR Pink','Westside United','VFW Aces',...(schedule?.events||[]).filter(e=>!isStartupProgramEvent(e)).map(e=>e.team)])].sort();
 if(!teams.includes(scheduleTeam))scheduleTeam='all';
 return '<section class="panel team-schedule" aria-labelledby="schedule-title"><div class="section-heading"><h2 id="schedule-title">Team schedule</h2><label class="small-button schedule-upload" for="schedule-file">Import schedule<input id="schedule-file" type="file" accept=".json,application/json"></label></div><p class="note">OCR Pink weekly sessions, the verified October 10-11 Aces games, and the October 10 VFW social are included. Import a schedule to add other team events. Importing a new file replaces the previous imported schedule on this device.</p><p id="schedule-message" role="status"></p>'+
 (schedule?'<p class="note">'+escapeHTML(schedule.source)+' · Imported snapshot from '+calendarDate(schedule.exportedAt.slice(0,10))+'<br>Imported coverage: '+calendarDate(schedule.coverageStart)+' – '+calendarDate(schedule.coverageEnd)+'</p>':'')+
 '<div class="hub-week-toolbar"><div class="week-control"><button id="schedule-prev-week" class="small-button" aria-label="Previous week">←</button><h3 id="schedule-week-label" aria-live="polite">'+calendar.label(scheduleWeek)+'</h3><button id="schedule-next-week" class="small-button" aria-label="Next week">→</button></div><button id="schedule-this-week" class="small-button">This week</button></div><div class="schedule-filters"><label>Team<select id="schedule-team"><option value="all">All teams</option>'+teams.map(team=>'<option '+(team===scheduleTeam?'selected ':'')+'value="'+escapeHTML(team)+'">'+escapeHTML(team)+'</option>').join('')+'</select></label><p class="note">Monday–Sunday · All times Pacific</p></div><div id="schedule-events" class="weekly-grid" aria-live="polite"></div>'+
 '<p class="note">Confirm changes with your team. <a class="text-button" href="https://events.teamsnap.com/events/50755/results" target="_blank" rel="noopener noreferrer">Official VFW tournament schedule</a> <a class="text-button" href="https://madison27.tomongo.chatgpt.site/#schedule" target="_blank" rel="noopener noreferrer">Open original calendar (sign-in required)</a></p></section>';
}
function drawSchedule(){
 const target=document.querySelector('#schedule-events');if(!target)return;
 main.dataset.jerseyTheme=basketballTheme(scheduleTeam);
 document.querySelector('#schedule-week-label').textContent=calendar.label(scheduleWeek);
 const today=calendar.today();
 const events=scheduleEvents().filter(e=>(scheduleTeam==='all'||e.team===scheduleTeam)&&calendar.inWeek(e,scheduleWeek));
 target.innerHTML=calendar.days(scheduleWeek).map(day=>{
  const dayEvents=events.filter(e=>calendar.occursOn(e,day)).sort((a,b)=>calendar.startMinutes(a)-calendar.startMinutes(b));
  return '<section class="weekly-day'+(day===today?' is-today':'')+'" aria-labelledby="hub-day-'+day+'"><h4 id="hub-day-'+day+'"><span>'+calendar.format(day,{weekday:'long'})+'</span><time datetime="'+day+'"'+(day===today?' aria-current="date"':'')+'>'+calendar.format(day,{month:'short',day:'numeric'})+(day===today?' · Today':'')+'</time></h4><div class="weekly-day-events">'+(dayEvents.length?dayEvents.map(e=>'<article class="weekly-event" data-jersey="'+basketballTheme(e.team)+'"><span class="weekly-team">'+escapeHTML(e.team)+'</span><h5>'+escapeHTML(e.title)+'</h5><p class="trip-notes">'+escapeHTML(e.details)+'</p></article>').join(''):'<p class="weekly-empty">No events</p>')+'</div></section>';
 }).join('');
}
function bindSchedule(){
 drawSchedule();
 const team=document.querySelector('#schedule-team');
 if(team)team.onchange=event=>{scheduleTeam=event.target.value;drawSchedule();};
 document.querySelector('#schedule-prev-week').onclick=()=>{scheduleWeek=calendar.addDays(scheduleWeek,-7);drawSchedule();};
 document.querySelector('#schedule-next-week').onclick=()=>{scheduleWeek=calendar.addDays(scheduleWeek,7);drawSchedule();};
 document.querySelector('#schedule-this-week').onclick=()=>{scheduleWeek=calendar.monday(calendar.today());drawSchedule();};
 document.querySelector('#schedule-file').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  const message=document.querySelector('#schedule-message');
  try{
   if(file.size>2*1024*1024)throw Error('Choose a schedule file smaller than 2 MB.');
   const next=validSchedule(JSON.parse(await file.text()));
   // Persist before replacing the active schedule; a failed save leaves previous data intact.
   localStorage.setItem('madison-hub-v1',JSON.stringify({...state,teamSchedule:next}));
   state.teamSchedule=next;scheduleTeam='all';scheduleWeek=calendar.monday(calendar.today());render();
   const feedback=document.querySelector('#schedule-message');
   if(feedback){feedback.textContent=next.events.length+' events imported and saved on this device.';feedback.setAttribute('tabindex','-1');feedback.focus();}
  }catch(error){if(message.isConnected)message.textContent=error instanceof SyntaxError?'This file is not valid JSON. Your previous schedule is unchanged.':error.name==='QuotaExceededError'?'This browser has no room to save the schedule. Your previous schedule is unchanged.':error.message||'Could not import the schedule.';}
  event.target.value='';
 };
}


function acesSkills(){
 const drills=[
  {title:'Layup Drill',category:'Shooting',detail:'Sibelle Zambie · Two-ball Mikan drill. Aim for 10 reps without dropping the ball.',url:'https://www.youtube.com/shorts/zg3ikuRmufA'},
  {title:'Driving Angle Skill/Concept',category:'Other',detail:'Danny Cooper · Opens at 6:03 in the full lesson: arm position, quick second dribble, and closing the gap.',url:'https://www.youtube.com/watch?v=wBlDWb10RKg&t=363s'},
  {title:'Wall Form Shooting Drill',category:'Shooting',detail:'Dolan Tierney · Practice a straight shooting motion at the wall, then move to the hoop.',url:'https://www.youtube.com/shorts/A4OSjuwors0'}
 ];
 return '<section class="panel" aria-labelledby="aces-skills-heading"><div class="eyebrow">LEARN. PRACTICE. GROW.</div><h2 id="aces-skills-heading">VFW Aces Skills</h2><p>Drills from your team, ready for your next practice.</p><div class="two-col">'+drills.map(d=>'<article class="panel"><div class="eyebrow">'+escapeHTML(d.category)+'</div><h3>'+escapeHTML(d.title)+'</h3>'+(d.detail?'<p>'+escapeHTML(d.detail)+'</p>':'')+'<a class="primary" href="'+escapeHTML(d.url)+'" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></article>').join('')+'</div><p class="note">Drills selected from the Aces Skills page. Links open the original creators’ YouTube videos; the driving-angle video starts at the matching section of a longer lesson. No Instagram account needed.</p></section>';
}

function periodLabel(period){
 const value=String(period??'').trim();
 return /^\d+$/.test(value)?'P'+value:value;
}
function pointsLabel(value){
 const n=Number(value);
 return Number.isFinite(n)?String(n):String(value);
}
function classGrade(item){
 const parts=[];
 if(item.avg!=null&&item.avg!=='')parts.push(Number(item.avg).toFixed(1));
 if(item.mark)parts.push(String(item.mark));
 return parts.join(' ');
}
function assignmentList(items,emptyLabel){
 const list=Array.isArray(items)?items:[];
 if(!list.length)return `<p class="class-empty">${escapeHTML(emptyLabel)}</p>`;
 return `<ul class="assignment-list">${list.map(item=>{
  const when=item.due?`<time datetime="${escapeHTML(item.due)}">${escapeHTML(/^\d{4}-\d{2}-\d{2}$/.test(item.due)?calendarDate(item.due):String(item.due))}</time>`:'';
  const score=item.score==null||item.score===''?'':`<span class="assignment-score">${escapeHTML(pointsLabel(item.score))}</span>`;
  return `<li class="assignment-row"><span><strong>${escapeHTML(item.title||'Assignment')}</strong>${when}</span>${score}</li>`;
 }).join('')}</ul>`;
}
function schoolRoster(){
 const classes=Array.isArray(content.classes)?content.classes:[];
 if(!classes.length)return '';
 const meta=content.schoolMeta||{};
 const asOf=/^\d{4}-\d{2}-\d{2}$/.test(meta.asOf||'')?calendarDate(meta.asOf):'';
 const sourceBits=[meta.source,meta.note].filter(Boolean).map(value=>escapeHTML(value));
 const cards=classes.map(item=>{
  const published=item.topic&&String(item.topic).trim().toLowerCase()!=='not published';
  const grade=classGrade(item);
  const quarter=item.quarter?`<span>Q${escapeHTML(String(item.quarter))}</span>`:'';
  const gradeHtml=grade?`<p class="class-mark">${quarter}${escapeHTML(grade)}</p>`:`<p class="class-mark class-mark-empty">No average</p>`;
  const formative=item.formative!=null&&item.formative!==''?`<p class="class-formative">Formative ~${escapeHTML(pointsLabel(item.formative))}</p>`:'';
  const updated=published&&/^\d{4}-\d{2}-\d{2}$/.test(item.lastUpdated||'')?`Last updated ${calendarDate(item.lastUpdated)}.`:'Last updated from Weekly Progress 2026-09-21.';
  const practice=item.id==='math'?'<a class="text-button" href="#math">Practice this topic in Math</a>':item.id==='world-history'?'<a class="text-button" href="#history">Practice this topic</a>':'';
  return `<article class="panel class-card" id="class-${escapeHTML(item.id||'class')}"><div class="class-card-top"><div><div class="eyebrow">${escapeHTML(periodLabel(item.period))}</div><h2>${escapeHTML(item.course||'Class')}</h2><p class="class-teacher">${escapeHTML([item.teacher,item.room].filter(Boolean).join(' · '))}</p></div><div class="class-grade">${gradeHtml}${formative}</div></div><p class="class-topic"><span class="class-label">Current topic</span> ${published?escapeHTML(item.topic):'<span class="muted">not published</span>'}</p>${practice}<h3>Recent</h3>${assignmentList(item.recent,'None listed in this update.')}<h3>Upcoming</h3>${assignmentList(item.upcoming,'not published')}<p class="note">${escapeHTML(updated)}</p></article>`;
 }).join('');
 return `<section class="class-roster" aria-labelledby="class-roster-heading"><div class="section-heading"><h2 id="class-roster-heading">Beacon Park · Grade 7</h2>${asOf?`<span>As of ${escapeHTML(asOf)}</span>`:''}</div>${sourceBits.length?`<p class="roster-source">${sourceBits.join(' ')}</p>`:''}<div class="class-grid">${cards}</div></section>`;
}

const schoolDateGroups=[
  {
    "id": "math-unit-1",
    "title": "Math 7 - Unit 1 assessment",
    "context": "No tutorial that week because those are minimum days. The hub practice set covers Targets 1.4-1.6 only (add, multiply, and divide positive and negative fractions), not the whole unit.",
    "source": "Math assessment teacher announcement, October 2, 2026.",
    "events": [
      {
        "id": "math-review-2026-10-05",
        "date": "2026-10-05",
        "endDate": "2026-10-07",
        "title": "Math Unit 1 review",
        "details": "Review Monday-Wednesday, October 5-7."
      },
      {
        "id": "math-assessment-2026-10-08",
        "date": "2026-10-08",
        "title": "Math Unit 1 assessment - Targets 1.1-1.5",
        "details": "Learning Targets 1.1 through 1.5."
      },
      {
        "id": "math-assessment-2026-10-09",
        "date": "2026-10-09",
        "title": "Math Unit 1 assessment - Targets 1.6-1.9",
        "details": "Learning Targets 1.6 through 1.9."
      },
      {
        "id": "math-packet-2026-10-09",
        "date": "2026-10-09",
        "title": "Math extra practice packet due",
        "details": "The extra practice packet from the start of the unit is due Friday, October 9 and will not be accepted late."
      }
    ]
  },
  {
    "id": "avid-fair",
    "title": "AVID - College & Career Fair",
    "context": "Explore college and career options and bring your questions. Mrs. Aldana encourages AVID students to attend; this is an optional event.",
    "source": "AVID fair teacher announcement, September 2, 2026.",
    "events": [
      {
        "id": "avid-fair-2026-10-05",
        "date": "2026-10-05",
        "title": "Optional AVID College & Career Fair",
        "startTime": "17:00",
        "endTime": "19:00",
        "timeLabel": "5-7 p.m. Pacific",
        "details": "Portola High School Gym."
      }
    ]
  },
  {
    "id": "angels-trip",
    "title": "AVID - Angels Stadium field trip",
    "context": "Tour the stadium and learn about careers in sports. Bring your lunch, or arrange a cafeteria lunch with your teacher ahead of time. Attend Zero Period and Extended Day as usual if they are on your schedule. Make up work missed in Periods 2-5.",
    "source": "Angels Stadium trip teacher announcement, October 1, 2026.",
    "events": [
      {
        "id": "angels-forms-2026-10-09",
        "date": "2026-10-09",
        "title": "Angels permission slip and stadium waiver due",
        "details": "Return both your signed permission slip and stadium waiver by Friday, October 9. The forms were sent home; ask your teacher if you need another copy."
      },
      {
        "id": "angels-trip-2026-10-20",
        "date": "2026-10-20",
        "title": "Angels Stadium field trip",
        "details": "Tuesday, October 20, 2026."
      }
    ]
  },
  {
    "id": "disney-trip",
    "title": "AVID + ASB - Disney Imagination Campus field trip",
    "context": "The planned course is Leadership and Teamwork the Disney Way, with a visit to California Adventure. Return your signed permission slip to Mrs. Aldana or Ms. Cassese. Make up any classwork missed that day. Confirm the final schedule with your teacher before the trip.",
    "source": "Disney trip teacher announcement, September 22, 2026.",
    "events": [
      {
        "id": "disney-payment-2026-10-01",
        "date": "2026-10-01",
        "title": "Disney trip payment deadline (historical)",
        "details": "The trip payment deadline was October 1; check with your parent that your trip arrangements are complete. Payment status is not recorded."
      },
      {
        "id": "disney-trip-2026-12-14",
        "date": "2026-12-14",
        "title": "Disney Imagination Campus field trip",
        "details": "Monday, December 14, 2026."
      }
    ]
  },
  {
    "id": "no-school",
    "title": "School schedule",
    "context": "",
    "source": "School newsletter, October 2, 2026.",
    "events": [
      {
        "id": "no-school-2026-10-12",
        "date": "2026-10-12",
        "title": "No school",
        "details": "No school Monday, October 12."
      }
    ]
  }
];
function schoolDateLabel(event){
 const options={weekday:'long',month:'long',day:'numeric',year:'numeric'};
 return calendar.format(event.date,options)+(event.endDate&&event.endDate!==event.date?' - '+calendar.format(event.endDate,options):'')+(event.timeLabel?' - '+event.timeLabel:'');
}
function schoolCalendarEvents(){
 return [...startupStars,...schoolDateGroups.flatMap(group=>group.events.map(event=>({...event,endDate:event.endDate||event.date,team:group.title,timeZone:'America/Los_Angeles',details:[event.timeLabel||'Date only - time not provided.',event.details,group.context,group.source].filter(Boolean).join('\n')})))];
}
function schoolWeeklyUpdate(){
 return '<section class="panel team-schedule" aria-labelledby="weekly-school-heading"><div class="eyebrow">CHECKED OCTOBER 4, 2026</div><h2 id="weekly-school-heading">Class dates to keep in mind</h2>'+schoolDateGroups.map(group=>'<article><h3>'+escapeHTML(group.title)+'</h3>'+group.events.map(event=>'<p><strong>'+escapeHTML(schoolDateLabel(event))+'</strong><br>'+escapeHTML(event.title)+'<br>'+escapeHTML(event.details)+'</p>').join('')+(group.context?'<p>'+escapeHTML(group.context)+'</p>':'')+'<p class="note">'+escapeHTML(group.source)+'</p></article>').join('')+'</section>';
}
let schoolCalendarWeek=calendar.monday(calendar.today());
function schoolProgramCalendar(){
 return '<section class="panel team-schedule" aria-labelledby="school-calendar-title"><div class="section-heading"><h2 id="school-calendar-title">School calendar</h2></div><p>Class dates, deadlines, field trips, and Startup Stars.</p><div class="hub-week-toolbar"><div class="week-control"><button id="school-calendar-prev" class="small-button" aria-label="Previous school calendar week">Previous</button><h3 id="school-calendar-week" aria-live="polite">'+calendar.label(schoolCalendarWeek)+'</h3><button id="school-calendar-next" class="small-button" aria-label="Next school calendar week">Next</button></div><button id="school-calendar-today" class="small-button">This week</button></div><p class="note">Monday-Sunday - All times Pacific</p><div id="school-calendar-events" class="weekly-grid" aria-live="polite"></div></section>';
}
function drawSchoolProgramCalendar(){
 const target=document.querySelector('#school-calendar-events');if(!target)return;
 document.querySelector('#school-calendar-week').textContent=calendar.label(schoolCalendarWeek);
 const today=calendar.today();
 target.innerHTML=calendar.days(schoolCalendarWeek).map(day=>{
  const events=schoolCalendarEvents().filter(e=>calendar.occursOn(e,day)).sort((a,b)=>(a.startTime?calendar.startMinutes(a):-1)-(b.startTime?calendar.startMinutes(b):-1));
  return '<section class="weekly-day'+(day===today?' is-today':'')+'" aria-labelledby="school-program-day-'+day+'"><h4 id="school-program-day-'+day+'"><span>'+calendar.format(day,{weekday:'long'})+'</span><time datetime="'+day+'"'+(day===today?' aria-current="date"':'')+'>'+calendar.format(day,{month:'short',day:'numeric'})+'</time></h4><div class="weekly-day-events">'+(events.length?events.map(e=>'<article class="weekly-event"><span class="weekly-team">'+escapeHTML(e.team)+'</span><h5>'+escapeHTML(e.title)+'</h5><p class="trip-notes">'+escapeHTML(e.details)+'</p></article>').join(''):'<p class="weekly-empty">No events</p>')+'</div></section>';
 }).join('');
}
function bindSchoolProgramCalendar(){
 drawSchoolProgramCalendar();
 document.querySelector('#school-calendar-prev').onclick=()=>{schoolCalendarWeek=calendar.addDays(schoolCalendarWeek,-7);drawSchoolProgramCalendar();};
 document.querySelector('#school-calendar-next').onclick=()=>{schoolCalendarWeek=calendar.addDays(schoolCalendarWeek,7);drawSchoolProgramCalendar();};
 document.querySelector('#school-calendar-today').onclick=()=>{schoolCalendarWeek=calendar.monday(calendar.today());drawSchoolProgramCalendar();};
}
function schoolPage(){
 return intro('BEACON PARK BENGALS','A clear plan. A fresh start.','Beacon Park Grade 7 is here, then the little things that keep the day moving.')+schoolProgramCalendar()+schoolWeeklyUpdate()+schoolRoster()+`<div class="two-col"><section class="panel"><h2>Your daily checklist</h2>${checklist('school',content.school||[])}</section><aside class="panel school"><div class="eyebrow">ONE THING AT A TIME</div><h2>Make a little focus space.</h2><p>Choose one task, clear a spot, and put distractions aside. Take a short break when you finish.</p><a class="primary" href="#math">Try the math warm-up ↗</a></aside></div>`;
}
function render(){const {active,nav:navigation}=calendarRoute(location.hash);document.title=(navigation==='calendar'?'Calendar - '+(active==='school'?'School':'Basketball'):active==='home'?'Home':sections.find(s=>s.id===active).name)+' - Madison Hub';
 main.dataset.calendarPanel=navigation==='calendar'?active:'';
 main.dataset.jerseyTheme=active==='basketball'?basketballTheme(scheduleTeam):'';
 document.querySelector('#nav').innerHTML=[{id:'home',name:'Home'},...mainSections].map(s=>`<a class="nav-link" href="#${s.id}" ${s.id===navigation?'aria-current="page"':''}>${icon(s.id)}<span>${s.name}</span></a>`).join('');
 if(active==='home') main.innerHTML=home();
 if(active==='ela'){main.innerHTML=elaPage();bindELA();}
 if(active==='ai'){main.innerHTML=aiPage();bindAI();}
 if(active==='math'){startQuiz();main.innerHTML=math();bindMath();drawQuiz();}
 if(active==='history'){main.innerHTML=historyPage();bindHistory();}
 if(active==='basketball')main.innerHTML=intro('BASKETBALL','Your next game. Your next rep.','Keep your team schedule and your practice plan together.')+teamSchedule()+acesSkills()+`<div class="two-col"><section class="panel"><h2>Today’s practice <span class="muted">· 15 min</span></h2>${checklist('basketball',content.basketball)}</section><aside class="panel basketball"><div class="eyebrow">YOUR FOCUS</div><h2>Control before speed.</h2><p>Stay balanced. Keep your eyes up. Make each rep intentional.</p><p class="note">Start with your usual warm-up. Take water breaks and follow your coach’s guidance.</p></aside></div>`;
 if(active==='travel')main.innerHTML=travelPage();
 if(active==='school')main.innerHTML=schoolPage();
 if(navigation==='calendar')main.insertAdjacentHTML('afterbegin',calendarSubnav(active));
 if(['school','travel','basketball'].includes(active)){main.insertAdjacentHTML('beforeend',`<p class="note">Checkmarks are saved on this device. Use Reset checklist when you want a fresh start.</p>`);}
 main.insertAdjacentHTML('beforeend',`<p id="storage-warning" class="storage-warning" ${storageOK?'hidden':''}>This browser can’t save progress right now. You can still use the hub during this visit.</p>`);
 if(active==='travel')bindTravel();
 if(active==='basketball')bindSchedule();
 if(active==='school')bindSchoolProgramCalendar();
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
