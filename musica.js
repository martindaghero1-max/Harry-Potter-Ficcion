const VIDEO_ID='reeajtRmbcU';
const KEY='hp-musica';
let player,listo=false,sonando=false;
const btn=document.getElementById('musica'),estado=document.getElementById('estado');
function leer(){try{return JSON.parse(sessionStorage.getItem(KEY))||{on:false,t:0}}catch(e){return{on:false,t:0}}}
function guardar(on,t){try{sessionStorage.setItem(KEY,JSON.stringify({on:on,t:t}))}catch(e){}}
function ui(on){sonando=on;btn.textContent=on?'🔊 Pausar música':'🔇 Activar música';btn.setAttribute('aria-pressed',on)}
function onYouTubeIframeAPIReady(){
  player=new YT.Player('yt',{events:{
    onReady:function(){
      listo=true;const g=leer();
      if(g.on){ui(true);player.seekTo(g.t,true);player.playVideo();
        setTimeout(function(){const s=player.getPlayerState();
          if(s!==1&&s!==3){ui(false);guardar(false,g.t);estado.textContent='Tocá el botón para continuar la música.';}},2500);}
    },
    onError:function(){estado.innerHTML='No se pudo reproducir acá. <a href="https://www.youtube.com/watch?v='+VIDEO_ID+'" target="_blank" rel="noopener">Escuchar en YouTube</a>';}
  }});
}
btn.addEventListener('click',function(){
  if(!listo){estado.textContent='Cargando la música, probá de nuevo en un momento…';return;}
  estado.textContent='';
  if(sonando){player.pauseVideo();guardar(false,player.getCurrentTime());ui(false);}
  else{player.playVideo();guardar(true,player.getCurrentTime());ui(true);}
});
window.addEventListener('pagehide',function(){if(listo&&sonando)guardar(true,player.getCurrentTime());});
const tag=document.createElement('script');tag.src='https://www.youtube.com/iframe_api';document.head.appendChild(tag);
