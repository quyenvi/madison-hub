'use strict';
// Earliest point where a swipe segment enters a target rectangle (0..1).
function fruitIntersection(a,b,r){
 let lo=0,hi=1;const dx=b.x-a.x,dy=b.y-a.y;
 for(const [p,q] of [[-dx,a.x-r.left],[dx,r.right-a.x],[-dy,a.y-r.top],[dy,r.bottom-a.y]]){
  if(p===0){if(q<0)return null;}else{const t=q/p;if(p<0)lo=Math.max(lo,t);else hi=Math.min(hi,t);if(lo>hi)return null;}
 }return lo;
}
function mountFruit(target,q,selector){
 const choices=target.querySelector('.choices');const answers=[...target.querySelectorAll(selector)];
 const letters=['A','B','C','D'];const fruits=['🍎','🍊','🥝','🫐'];
 answers.forEach((b,i)=>{b.innerHTML='<strong class="answer-letter">'+letters[i]+'</strong> '+escapeHTML(q.choices[i]);});
 const controls=document.createElement('div');controls.className='fruit-controls';
 controls.innerHTML='<label>Play style <select aria-label="Play style"><option value="fruit">Fruit swipe</option><option value="classic">Classic quiz</option></select></label><button type="button" class="small-button fruit-motion">Pause fruit</button>';
 choices.before(controls);
 const game=document.createElement('div');game.className='fruit-game';
 game.innerHTML='<p class="fruit-instructions">Read A–D above, then swipe through one fruit. You can also tap a fruit or an answer. No timer—take your time.</p><div class="fruit-arena" role="group" aria-label="Swipe answer arena"><span class="fruit-arena-title" aria-hidden="true">SLICE YOUR ANSWER</span>'+letters.map((letter,i)=>'<button type="button" class="answer-fruit fruit-'+i+'" aria-label="Slice '+letter+': '+escapeHTML(q.choices[i])+'"><span class="fruit-art" aria-hidden="true">'+fruits[i]+'</span><strong>'+letter+'</strong></button>').join('')+'<span class="swipe-trail" aria-hidden="true"></span></div><p class="fruit-result" role="status"></p>';
 choices.after(game);
 const arena=game.querySelector('.fruit-arena'),buttons=[...game.querySelectorAll('.answer-fruit')],mode=controls.querySelector('select'),motion=controls.querySelector('.fruit-motion');
 let locked=false,pointer=null,previous=null,origin=null;
 let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function updateMotion(){arena.classList.toggle('paused',paused);motion.textContent=paused?'Float fruit':'Pause fruit';motion.setAttribute('aria-pressed',String(paused));}
 function updateMode(){const playing=mode.value==='fruit';game.hidden=!playing;motion.hidden=!playing;choices.classList.toggle('fruit-key',playing);}
 mode.value=state.quizPlayStyle==='classic'?'classic':'fruit';updateMode();updateMotion();
 mode.onchange=()=>{state.quizPlayStyle=mode.value;save();updateMode();};motion.onclick=()=>{paused=!paused;updateMotion();};
 function finish(i){if(locked)return;locked=true;arena.classList.add('settled');buttons.forEach((b,j)=>{b.disabled=true;if(j===q.answer)b.classList.add('fruit-correct');if(j===i){b.classList.add('sliced');if(j!==q.answer)b.classList.add('fruit-wrong');}});game.querySelector('.fruit-result').textContent=i===q.answer?'Nice slice! '+letters[i]+' is correct.':'Good try. The correct answer is '+letters[q.answer]+'. Read the explanation below.';motion.disabled=true;}
 function choose(i){if(locked)return;answers[i].click();}
 // Both fruit and ordinary answer buttons use the quiz's existing scoring handler.
 answers.forEach((b,i)=>b.addEventListener('click',()=>finish(i)));
 buttons.forEach((b,i)=>b.onclick=()=>choose(i));
 arena.onpointerdown=e=>{if(locked||pointer!==null||!e.isPrimary||e.button!==0)return;pointer=e.pointerId;previous=origin={x:e.clientX,y:e.clientY};arena.setPointerCapture(pointer);};
 arena.onpointermove=e=>{
  if(e.pointerId!==pointer||locked)return;const now={x:e.clientX,y:e.clientY};
  if(Math.hypot(now.x-origin.x,now.y-origin.y)<10)return;
  const hits=buttons.map((b,i)=>({i,t:fruitIntersection(previous,now,b.getBoundingClientRect())})).filter(h=>h.t!==null).sort((a,b)=>a.t-b.t);
  const r=arena.getBoundingClientRect(),trail=arena.querySelector('.swipe-trail');trail.style.left=(previous.x-r.left)+'px';trail.style.top=(previous.y-r.top)+'px';trail.style.width=Math.hypot(now.x-previous.x,now.y-previous.y)+'px';trail.style.transform='rotate('+Math.atan2(now.y-previous.y,now.x-previous.x)+'rad)';trail.classList.add('visible');
  previous=now;if(hits.length)choose(hits[0].i);
 };
 function release(e){if(e.pointerId!==pointer)return;if(!locked&&e.type==='pointerup'&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)<10){const i=buttons.findIndex(b=>{const r=b.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;});if(i>=0)choose(i);}pointer=null;previous=null;arena.querySelector('.swipe-trail').classList.remove('visible');}
 arena.onpointerup=release;arena.onpointercancel=release;arena.onlostpointercapture=()=>{pointer=null;previous=null;};
}
