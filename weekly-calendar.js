// Calendar date helpers shared by Madison Basketball and Madison Hub.
(function(root){
 'use strict';
 const timeZone='America/Los_Angeles';
 const date=value=>new Date(value+'T12:00:00Z');
 const key=value=>value.toISOString().slice(0,10);
 const addDays=(value,days)=>{const d=date(value);d.setUTCDate(d.getUTCDate()+days);return key(d);};
 const monday=value=>addDays(value,-((date(value).getUTCDay()+6)%7));
 const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const days=start=>Array.from({length:7},(_,i)=>addDays(start,i));
 const format=(value,options)=>date(value).toLocaleDateString('en-US',{...options,timeZone:'UTC'});
 function label(start){
  const end=addDays(start,6);
  if(start.slice(0,4)!==end.slice(0,4))return format(start,{month:'short',day:'numeric',year:'numeric'})+' – '+format(end,{month:'short',day:'numeric',year:'numeric'});
  if(start.slice(0,7)===end.slice(0,7))return format(start,{month:'short',day:'numeric'})+'–'+date(end).getUTCDate()+', '+date(end).getUTCFullYear();
  return format(start,{month:'short',day:'numeric'})+' – '+format(end,{month:'short',day:'numeric',year:'numeric'});
 }
 const endDate=event=>event.endDate||addDays(event.date,event.type==='Tournament'?1:0);
 const occursOn=(event,day)=>event.date<=day&&endDate(event)>=day;
 const inWeek=(event,start)=>event.date<=addDays(start,6)&&endDate(event)>=start;
 function startMinutes(event){
  if(/^\d{2}:\d{2}$/.test(event.startTime||'')){const [h,m]=event.startTime.split(':').map(Number);return h*60+m;}
  const text=String(event.time||event.details||'').split('\n')[0];
  const match=/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\b/i.exec(text);
  if(!match)return 1440;
  const period=(match[3]||text.match(/\b(AM|PM)\b/i)?.[1]||'').toUpperCase();
  let hour=Number(match[1]);if(period)hour=hour%12+(period==='PM'?12:0);
  return hour*60+Number(match[2]||0);
 }
 root.MADISON_WEEKLY_CALENDAR={timeZone,addDays,monday,today,days,format,label,endDate,occursOn,inWeek,startMinutes};
})(window);
