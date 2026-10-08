// Status no fuso de Gaspar e checklist de serviços que monta a mensagem do WhatsApp.
(function(){
  var W={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}, p={};
  new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});
  var d=W[p.weekday], m=(+p.hour)*60+(+p.minute), util=d>=1&&d<=5;
  var txt=!util?'Fechado hoje · abre seg 7h30':(m>=450&&m<720)||(m>=810&&m<1080)?'Aberto agora':(m>=720&&m<810)?'Almoço · volta 13h30':'Fechado agora · seg a sex 7h30–18h';
  var el=document.getElementById('status'), t=document.getElementById('status-txt');
  if(el&&t){el.classList.add(txt==='Aberto agora'?'aberto':'fechado');t.textContent=txt;}
  var tr=document.querySelector('.horario tr[data-d="'+d+'"]'); if(tr) tr.classList.add('hoje');

  var NUM='5547997564758', f=document.getElementById('checklist'), prev=document.getElementById('previa');
  function msg(){
    var s=[].slice.call(f.querySelectorAll('input:checked')).map(function(i){return i.value;});
    return 'Olá! Quero orçamento de: '+(s.length?s.join(', ')+'.':'');
  }
  if(f){
    f.addEventListener('change',function(){prev.textContent='Mensagem: “'+(msg().replace(/: $/,': …'))+'”';});
    f.addEventListener('submit',function(e){e.preventDefault();window.open('https://wa.me/'+NUM+'?text='+encodeURIComponent(msg()),'_blank','noopener');});
  }
})();
