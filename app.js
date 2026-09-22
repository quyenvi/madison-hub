'use strict';
const content = window.HUB_CONTENT;
const main = document.querySelector('#main');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
 ai:'M9 3h6v3h3v12H6V6h3z M9 10h.01 M15 10h.01 M9 14h6 M3 9v6 M21 9v6 M9 18v3 M15 18v3',
 home:'M3 10 12 3l9 7v10H3z M9 20v-7h6v7',
 math:'M5 4h14v16H5z M8 8h8 M8 12h2 M14 12h2 M8 16h2 M14 16h2',
 basketball:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3v18 M6 5c7 4 7 10 0 14 M18 5c-7 4-7 10 0 14',
 travel:'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2z M9 3v16 M15 5v16',
 school:'M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3z M12 6v15'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
const sections = [
 {id:'ai',name:'AI',desc:'Explore how AI works.',meta:'Eight weekly lessons'},
 {id:'math',name:'Math',desc:'Small steps. Stronger skills.',meta:'5-question warm-up'},
 {id:'basketball',name:'Basketball',desc:'Put in the work. Find your game.',meta:'Your practice plan'},
 {id:'travel',name:'Travel',desc:'A little planning. A new adventure.',meta:'Explore & get ready'},
 {id:'school',name:'School',desc:'Clear your mind. Plan your day.',meta:'Your daily checklist'}
];
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
 <div class="section-heading"><h2>Your spaces</h2><span>Pick a place to start</span></div><div class="cards">${sections.map((s,i)=>`<a class="card ${s.id}" href="#${s.id}"><div class="card-top"><span class="icon-box">${icon(s.id)}</span><span class="number">0${i+1}</span></div><h2>${s.name}</h2><p>${s.desc}</p><div class="card-bottom"><span>${s.meta}</span><span aria-hidden="true">↗</span></div></a>`).join('')}</div>`;
}
function checklist(group,items){
 return `<div class="progress-label" id="${group}-progress" aria-live="polite"></div><progress id="${group}-bar" max="${items.length || 1}" value="0" aria-label="${group} completed"></progress><div class="check-list">${items.map(item=>`<label class="check-row"><input type="checkbox" data-group="${group}" data-id="${escapeHTML(item.id)}" ${state[group+':'+item.id]?'checked':''}><span><strong>${escapeHTML(item.title)}</strong>${item.detail?`<small>${escapeHTML(item.detail)}</small>`:''}</span></label>`).join('')}</div><button class="text-button" data-reset="${group}">Reset checklist</button>`;
}
function updateProgress(){ for(const group of ['basketball','packing','school']){const inputs=[...document.querySelectorAll(`input[data-group="${group}"]`)]; if(!document.querySelector('#'+group+'-progress'))continue; const done=inputs.filter(i=>i.checked).length;document.querySelector(`#${group}-progress`).textContent=`${done} of ${inputs.length} complete`;document.querySelector(`#${group}-bar`).value=done;}}
function math(){return intro('MATH','A little sharper, every day.','Choose your level. Build confidence, then stretch yourself.')+`<section class="panel team-schedule" aria-labelledby="ltq-title"><div class="eyebrow">MATH 7 · ALDANA · SEPTEMBER 18 ANNOUNCEMENT</div><h2 id="ltq-title">LTQ #2 · Tuesday, September 22, 2026</h2><p><strong>LT 1.4–1.6:</strong> Add, multiply, and divide fractions with positive (+) and negative (−) numbers.</p><p><strong>Prepare:</strong> Extra Practice Packet through <strong>page 13</strong>.</p><p><strong>Optional second try:</strong> LT 1.1 and LT 1.3 on the same day. Review your class materials for those targets.</p><button class="primary" id="ltq-practice">Practice LTQ #2 fractions</button></section><div class="trip-toolbar"><label for="math-level">Practice level<select id="math-level">${content.mathLevels.map(l=>`<option value="${l.id}" ${l.id===mathLevel?'selected':''}>${l.name}</option>`).join('')}</select></label><button class="small-button" id="new-set">Start new set</button></div><p class="muted" id="math-description">${escapeHTML(content.mathLevels.find(l=>l.id===mathLevel).description)}</p><p class="note">${content.mathLevels.reduce((total,level)=>total+level.questions.length,0)} questions across ${content.mathLevels.length} practice options. Each set has five questions. Changing levels or starting a new set resets this score.</p><div class="two-col"><section class="panel" id="quiz" aria-label="Math practice"></section><aside class="panel"><h2>A good way to get unstuck</h2><ol class="steps"><li>Read the question one more time.</li><li>Write down what you know.</li><li>Try one small step, then check it.</li></ol><p class="note">Scratch paper is always welcome. This is practice, so there’s no timer.</p></aside></div>`;}
function drawQuiz(){const target=document.querySelector('#quiz');if(quizIndex>=quizQuestions.length){target.innerHTML=`<div class="eyebrow">PRACTICE COMPLETE</div><h2>Nice work showing up.</h2><p>You got <strong>${quizScore} of ${quizQuestions.length}</strong> correct. Keep building from here.</p><button class="primary" id="restart">Try another set</button>`;document.querySelector('#restart').onclick=()=>{startQuiz();drawQuiz();};return;}
 const q=quizQuestions[quizIndex];target.innerHTML=`<div class="progress-label">Question ${quizIndex+1} of ${quizQuestions.length}</div><progress max="${quizQuestions.length}" value="${quizIndex}" aria-label="Questions completed"></progress><div class="eyebrow">${escapeHTML(q.topic)}</div><h2 class="question">${escapeHTML(q.question)}</h2><div class="choices">${q.choices.map((c,i)=>`<button class="choice" data-answer="${i}">${escapeHTML(c)}</button>`).join('')}</div><div class="feedback" role="status" aria-live="polite"></div>`;
 target.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>{if(answered)return;answered=true;const selected=Number(button.dataset.answer);const correct=selected===q.answer;if(correct)quizScore++;target.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;if(Number(b.dataset.answer)===q.answer)b.classList.add('correct');else if(b===button)b.classList.add('wrong');});target.querySelector('.feedback').innerHTML=`<strong>${correct?'You’ve got it.':'Keep going — here’s how.'}</strong><br>${escapeHTML(q.explanation)}`;const next=document.createElement('button');next.className='primary quiz-next';next.textContent=quizIndex===quizQuestions.length-1?'See how you did':'Next question';next.onclick=()=>{quizIndex++;answered=false;drawQuiz();document.querySelector('#quiz h2').setAttribute('tabindex','-1');document.querySelector('#quiz h2').focus();};target.append(next);});
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


let scheduleTeam='all', scheduleView='upcoming';
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
function scheduleEvents(){
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const through=new Date(today+'T12:00:00Z');through.setUTCFullYear(through.getUTCFullYear()+1);
 const weekly=window.OCR_WEEKLY_SCHEDULE.eventsBetween(window.OCR_WEEKLY_SCHEDULE.startDate,through.toISOString().slice(0,10)).map(e=>({
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
 return [...(state.teamSchedule?.events||[]).filter(e=>!weeklyKeys.has(key(e))),...weekly];
}
function teamSchedule(){
 const schedule=state.teamSchedule;
 const teams=[...new Set(scheduleEvents().map(e=>e.team))].sort();
 if(!teams.includes(scheduleTeam))scheduleTeam='all';
 return '<section class="panel team-schedule" aria-labelledby="schedule-title"><div class="section-heading"><h2 id="schedule-title">Team schedule</h2><label class="small-button schedule-upload" for="schedule-file">Import schedule<input id="schedule-file" type="file" accept=".json,application/json"></label></div><p class="note">OCR Pink weekly sessions are included. Import a schedule to add games and other team events. Importing a new file replaces the previous imported schedule on this device.</p><p id="schedule-message" role="status"></p><p class="note">All event times Pacific</p>'+
 (schedule?'<p class="note">'+escapeHTML(schedule.source)+' · Imported snapshot from '+calendarDate(schedule.exportedAt.slice(0,10))+'<br>Imported coverage: '+calendarDate(schedule.coverageStart)+' – '+calendarDate(schedule.coverageEnd)+'</p>':'')+
 '<div class="schedule-filters"><label>Team<select id="schedule-team"><option value="all">All teams</option>'+teams.map(team=>'<option '+(team===scheduleTeam?'selected ':'')+'value="'+escapeHTML(team)+'">'+escapeHTML(team)+'</option>').join('')+'</select></label><label>Show<select id="schedule-view"><option value="upcoming" '+(scheduleView==='upcoming'?'selected':'')+'>Upcoming</option><option value="all" '+(scheduleView==='all'?'selected':'')+'>All events</option></select></label></div><div id="schedule-events"></div>'+
 '<p class="note">Confirm changes with your team. <a class="text-button" href="https://madison27.tomongo.chatgpt.site/#schedule" target="_blank" rel="noopener noreferrer">Open original calendar (sign-in required)</a></p></section>';
}
function drawSchedule(){
 const target=document.querySelector('#schedule-events');if(!target)return;
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const events=scheduleEvents().filter(e=>(scheduleTeam==='all'||e.team===scheduleTeam)&&(scheduleView==='all'||e.endDate>=today)).sort((a,b)=>a.date.localeCompare(b.date)||(a.startTime||'').localeCompare(b.startTime||'')||a.team.localeCompare(b.team));
 target.innerHTML=events.length?events.map(e=>'<article class="schedule-event"><div class="eyebrow">'+escapeHTML(e.team)+'</div><h3>'+escapeHTML(e.title)+'</h3><p><strong>'+calendarDate(e.date)+(e.endDate!==e.date?' – '+calendarDate(e.endDate):'')+'</strong></p><p class="trip-notes">'+escapeHTML(e.details)+'</p></article>').join(''):'<p class="note">No events match this view. Choose another team, show all events, or import a newer schedule.</p>';
}
function bindSchedule(){
 drawSchedule();
 const team=document.querySelector('#schedule-team'),view=document.querySelector('#schedule-view');
 if(team)team.onchange=event=>{scheduleTeam=event.target.value;drawSchedule();};
 if(view)view.onchange=event=>{scheduleView=event.target.value;drawSchedule();};
 document.querySelector('#schedule-file').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  const message=document.querySelector('#schedule-message');
  try{
   if(file.size>2*1024*1024)throw Error('Choose a schedule file smaller than 2 MB.');
   const next=validSchedule(JSON.parse(await file.text()));
   // Persist before replacing the active schedule; a failed save leaves previous data intact.
   localStorage.setItem('madison-hub-v1',JSON.stringify({...state,teamSchedule:next}));
   state.teamSchedule=next;scheduleTeam='all';scheduleView='upcoming';render();
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

function render(){const route=location.hash.slice(1);const active=sections.some(s=>s.id===route)?route:'home';document.title=`${active==='home'?'Home':sections.find(s=>s.id===active).name} · Madison Hub`;
 document.querySelector('#nav').innerHTML=[{id:'home',name:'Home'},...sections].map(s=>`<a class="nav-link" href="#${s.id}" ${s.id===active?'aria-current="page"':''}>${icon(s.id)}<span>${s.name}</span></a>`).join('');
 if(active==='home') main.innerHTML=home();
 if(active==='ai'){main.innerHTML=aiPage();bindAI();}
 if(active==='math'){startQuiz();main.innerHTML=math();bindMath();drawQuiz();}
 if(active==='basketball')main.innerHTML=intro('BASKETBALL','Your next game. Your next rep.','Keep your team schedule and your practice plan together.')+teamSchedule()+acesSkills()+`<div class="two-col"><section class="panel"><h2>Today’s practice <span class="muted">· 15 min</span></h2>${checklist('basketball',content.basketball)}</section><aside class="panel basketball"><div class="eyebrow">YOUR FOCUS</div><h2>Control before speed.</h2><p>Stay balanced. Keep your eyes up. Make each rep intentional.</p><p class="note">Start with your usual warm-up. Take water breaks and follow your coach’s guidance.</p></aside></div>`;
 if(active==='travel')main.innerHTML=travelPage();
 if(active==='school')main.innerHTML=intro('SCHOOL','A clear plan. A fresh start.','Keep the little things together, so you can focus on what’s next.')+`<div class="two-col"><section class="panel"><h2>Your daily checklist</h2>${checklist('school',content.school)}</section><aside class="panel school"><div class="eyebrow">ONE THING AT A TIME</div><h2>Make a little focus space.</h2><p>Choose one task, clear a spot, and put distractions aside. Take a short break when you finish.</p><a class="primary" href="#math">Try the math warm-up ↗</a></aside></div>`;
 if(['school','travel','basketball'].includes(active)){main.insertAdjacentHTML('beforeend',`<p class="note">Checkmarks are saved on this device. Use Reset checklist when you want a fresh start.</p>`);}
 main.insertAdjacentHTML('beforeend',`<p id="storage-warning" class="storage-warning" ${storageOK?'hidden':''}>This browser can’t save progress right now. You can still use the hub during this visit.</p>`);
 if(active==='travel')bindTravel();
 if(active==='basketball')bindSchedule();
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
