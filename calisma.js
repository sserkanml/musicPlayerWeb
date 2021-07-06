let container=document.querySelector(".container");
let musicName=document.querySelector(".name");
let musicSinger=document.querySelector(".singer");
let musicImage=document.querySelector(".img-container img");
let mainaudio=document.querySelector("#main-audio");
let playPausebtn=document.querySelector(".play-pause");
let nextbtn=document.querySelector("#nextbtn");
let prvbtn=document.querySelector("#prevbtn");
let progressbar=document.querySelector(".progress-bar");
let progressarea=document.querySelector(".progress-area");
let degis=document.querySelector("#degis");
let music_list=document.querySelector(".music-list");
let showbtn=document.querySelector("#showbtn");
let closeebtn=document.querySelector("#closebtn");
let music_acik_kapali=document.querySelector("#mus");
let progress_volume_bar=document.querySelector(".progress-volume-bar");
let progress_volume_ileri=document.querySelector(".progress-volume-ileri");


var mainaudio_al="";
var width_al="";


let musicIndex=Math.floor(Math.random() * musicList.length);

window.addEventListener("load",()=>{
    loadmusic(musicIndex);
    playLoopMusic();
   
})


function loadmusic(sayii){
  musicName.innerText=musicList[sayii].name;
  musicSinger.innerText=musicList[sayii].singer;
  musicImage.src=`image/${musicList[sayii].img}.jpg`;
  mainaudio.src=`songs/${musicList[sayii].audioSrc}.mp3`;
}
//sarkı baslatma fonksıyonu
function playSong(){
  container.classList.add("pause1");
  mainaudio.play();
  document.querySelector(".play-pause i").innerText="pause";
 
}
//sarkı durdurma
function playPause(){
container.classList.remove("pause1");
mainaudio.pause();
document.querySelector(".play-pause i").innerText="play_arrow";

}

//bir önceki müzige gecme
prvbtn.addEventListener("click",function(event){
  musicIndex--;
  musicIndex < 0 ? musicIndex=musicList.length-1 :musicIndex=musicIndex
   loadmusic(musicIndex);
   playSong();
   playLoopMusic()
})

//btn basıp muzıkı baslatma
playPausebtn.addEventListener("click",function(event){
let cevap=container.classList.contains("pause1");
cevap ?  playPause() : playSong();
});

// bir sonra ki muzige geçme
nextbtn.addEventListener("click",function(){
  musicIndex++;
  musicIndex >= musicList.length ? musicIndex = 0 : musicIndex=musicIndex;
   
   loadmusic(musicIndex);
   playLoopMusic()
   playSong();
 
})



mainaudio.addEventListener("timeupdate",function(event){
  
  let currentbb=document.querySelector("#currente");
  let durationbb=document.querySelector("#duratione");

  //cubugun ilerlemesi
  let time1=event.target.currentTime;
  let dur=event.target.duration;
  let proggresWidth=(time1/dur)*100;
  
  progressbar.style.width=proggresWidth+"%";
  
  
  
  
  //şimdiki zamanı ayarlama
  let simdiki_zamani_al_dakika=Math.floor((time1 / 60));
  let simdiki_zamani_al_saniye=Math.floor((time1 % 60));
  if(simdiki_zamani_al_saniye<10){
    simdiki_zamani_al_saniye=`0${simdiki_zamani_al_saniye}`;
  }
  currentbb.innerText=`${simdiki_zamani_al_dakika}:${simdiki_zamani_al_saniye}`;
   


 
  mainaudio.addEventListener("loadeddata",function(event){
    //total süre uzunlugu
    let audioduration=mainaudio.duration;
 
    let dakika_al=Math.floor((audioduration/60));
    let saniye_al=Math.floor((audioduration%60));
    
    if(saniye_al<10){
      saniye_al=`0${saniye_al}`;
    }
 durationbb.innerText=`${dakika_al}:${saniye_al}`;

  });
  
});

progressarea.addEventListener("click",function(event){
  if(container.classList.contains("pause1")){
    let progresareaclientwidth=progressarea.clientWidth;
    let offsetX_al=event.offsetX;
    document.querySelector(".play-pause i").innerText="pause";
    let auidodur1=mainaudio.duration;  
    mainaudio.currentTime=(offsetX_al/progresareaclientwidth)*auidodur1;
    playSong();
  }
  else{  
    mainaudio.pause();
    let progresareaclientwidth=progressarea.clientWidth;
    let offsetX_al=event.offsetX;
    document.querySelector(".play-pause i").innerText="play_arrow";
    let auidodur1=mainaudio.duration;  
    mainaudio.currentTime=(offsetX_al/progresareaclientwidth)*auidodur1;
  }
  
  
});
//cubugu surukleme kodu
progressarea.addEventListener("mousedown",function(event){

  mainaudio.pause();
  document.querySelector(".play-pause i").innerText="play_arrow";
progressarea.addEventListener("mousemove",surukle);

});


function surukle(event){
let x_al=event.offsetX;
let progresareaclientwidth=progressarea.clientWidth;
mainaudio.currentTime=(x_al/progresareaclientwidth)*mainaudio.duration;

}


progressarea.addEventListener("mouseup",function(event){

progressarea.removeEventListener("mousemove",surukle);


})
//burada bitti




degis.addEventListener("click",function(event){

  let get_degis_al=degis.innerText;
  switch(get_degis_al){
   case "repeat":
     degis.innerText="repeat_one";
     degis.setAttribute("title","Song Looped");
     break;
   case "repeat_one":
     degis.innerText="shuffle";
     degis.setAttribute("title","Playlist Shuffle");
     break;
   case "shuffle":
     degis.innerText="repeat";
     degis.setAttribute("title","Playlist Looped");
     break;
  }
})
//sarkı bitince butonlardan hangısı acıksa o calıcak
mainaudio.addEventListener("ended",function(){
  let get_degis_al=degis.innerText;
  switch(get_degis_al){
      case "repeat":   
       nextbtn.click();
        break;
      case "repeat_one":
        mainaudio.currentTime=0;
        playSong();
        break;
      case "shuffle":
        let rastgele_sayi=Math.floor(Math.random()*musicList.length);
        musicIndex=rastgele_sayi;
        loadmusic(musicIndex);
        playSong();
        playLoopMusic();
        break;   
  }
});
//music listi acma
showbtn.addEventListener("click",function(event){

 music_list.classList.toggle("show")
})
// kapama
closeebtn.addEventListener("click",function(event){
showbtn.click();

});

 let ul_al=document.querySelector("ul");
  
for(let i=0;i< musicList.length; i++){
  let li_al=`<li>
  <div class="row">
      <i class="material-icons">music_note</i>
      <span class="song-name class="renk">${musicList[i].name}</span>
      <br>
      <i class="material-icons">person</i>
       <span class="singer" class="renk">${musicList[i].singer}</span>
       <p></p>
  </div>
  <audio class="${musicList[i].audioSrc}"  src="songs/${musicList[i].audioSrc}.mp3"></audio>
  <span class="audio-duration" id="${musicList[i].audioSrc}"></span>
</li>`;

ul_al.insertAdjacentHTML("beforeend",li_al);

let audio_tag=document.querySelector(`.${musicList[i].audioSrc}`);
let spanaudio_tag=document.querySelector(`#${musicList[i].audioSrc}`);


audio_tag.addEventListener("loadeddata",function(event){

    let audioduration=audio_tag.duration;
 
    let dakika_al=Math.floor((audioduration/60));
    let saniye_al=Math.floor((audioduration%60));
    
    if(saniye_al<10){
      saniye_al=`0${saniye_al}`;
    }
 spanaudio_tag.innerText=`${dakika_al}:${saniye_al}`;
 spanaudio_tag.setAttribute("t-duration",`${dakika_al}:${saniye_al}`)

});

}
let li_tag=document.querySelectorAll("ul li");
let span_taglar=document.querySelectorAll("li span");


for(let i=0;i<li_tag.length;i++){

  li_tag[i].setAttribute("music_index",`${i}`)
  li_tag[i].setAttribute("onclick","clicked(this,event)");
} 


//music Listesinin içini degistirme
function playLoopMusic(){
  let j=0;

for(let i=0;i<span_taglar.length;i=i+3){
span_taglar[i].setAttribute("music_index",`${j}`)
span_taglar[i+1].setAttribute("music_index",`${j}`);
span_taglar[i+2].setAttribute("music_index",`${j}`);

j++;
}
 

  for(let i=0;i<span_taglar.length;i++){
  
    if(span_taglar[i].classList.contains("song-singer-playing")){
      span_taglar[i].classList.remove("song-singer-playing");

      if(span_taglar[i].classList.contains("audio-duration")){
         span_taglar[i].innerText=span_taglar[i].getAttribute("t-duration");
      }
    }


    if(span_taglar[i].getAttribute("music_index")==musicIndex){
      span_taglar[i].classList.add("song-singer-playing");

      if(span_taglar[i].classList.contains("audio-duration")){
        span_taglar[i].innerText="Playing";
      }
    }
    
  }

}
//music liste tıklanınca
function clicked(tii){ 
  let tii_al=tii.getAttribute("music_index");
  musicIndex=tii_al;
  loadmusic(musicIndex);
  playSong();
  playLoopMusic();
}

music_acik_kapali.addEventListener("click",function(){
  let is_kapali=music_acik_kapali.classList.contains("kapali");
  is_kapali ? musickapa() : musicac() ;

})

function musicac(){

music_acik_kapali.classList.add("kapali");  
music_acik_kapali.innerText="volume_up";
mainaudio.volume=mainaudio_al;
progress_volume_ileri.style.width=width_al;
if(mainaudio_al==0){
  mainaudio.volume=1;
  progress_volume_ileri.style.width="100%";
}

} 
function musickapa(){
music_acik_kapali.classList.remove("kapali");
music_acik_kapali.innerText="volume_off";
mainaudio.volume=0;
progress_volume_ileri.style.width=0;

} 

progress_volume_bar.addEventListener("mousedown",function(event){
  
  let clientWidth=event.target.clientWidth;
  let offsetX=event.offsetX;
  mainaudio_al=mainaudio.volume=(offsetX/clientWidth) < 0 ? 0 : (offsetX/clientWidth);
  width_al=progress_volume_ileri.style.width=(offsetX/clientWidth)*100+"%";
  progress_volume_bar.addEventListener("mousemove",kksurukle);
  if(!music_acik_kapali.classList.contains("kapali")){
    music_acik_kapali.innerText="volume_up";
    music_acik_kapali.classList.add("kapali");
  }
 
}) 


function kksurukle(event){
    let al_genis=event.currentTarget.clientWidth;
    let x_al=event.offsetX;
    mainaudio_al=mainaudio.volume=(x_al/al_genis) < 0 ? 0 : (x_al/al_genis);
    music_acik_kapali.innerText="volume_up";
    width_al=progress_volume_ileri.style.width=(x_al/al_genis)*100+"%";
    if(getComputedStyle(progress_volume_ileri).width=="0px"){
      music_acik_kapali.innerText="volume_off";
    }

}


progress_volume_bar.addEventListener("mouseup",function(event){
  progress_volume_bar.removeEventListener("mousemove",kksurukle)
  mainaudio.volume=event.offsetX/event.currentTarget.clientWidth;
  progress_volume_ileri.style.width=(event.offsetX/event.currentTarget.clientWidth)*100;

})








