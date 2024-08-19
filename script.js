// get songs info from the songs folder in link format 
async function getsongs(){
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith("mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

async function main(){
    // Get the list of the Songs
    let songs =await  getsongs();

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
              <img class="invert" src="music.svg" alt="">
              <div class="info">
                <div>${song.replaceAll("%20"," ")}</div>
              </div>
              <img class="invert" src="play.svg" alt="">
            </li>`
    }
    //play the first song 
    var audio = new Audio(songs[0])
    audio.play();
}
main()