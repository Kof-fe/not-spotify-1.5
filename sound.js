const audioElement = document.getElementById('myAudio');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const volumeUpButton = document.getElementById('volumeUpButton');
const volumeDownButton = document.getElementById('volumeDownButton');
let play = [];

const next = document.getElementById('next');
const back = document.getElementById('back');

pauseButton.addEventListener('click', () => {
  audioElement.pause();
});

const currentTimeDisplay = document.getElementById('currentTime');

// Update the current time display
function updateCurrentTime() {
  const minutes = Math.floor(audioElement.currentTime / 60);
  const seconds = Math.floor(audioElement.currentTime % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  currentTimeDisplay.textContent = formattedTime;
}

// Update the time display as the audio plays
audioElement.addEventListener('timeupdate', updateCurrentTime);

const volumePercentageDisplay = document.getElementById('volume');

// Update the volume percentage display
function updateVolumePercentage() {
  const volume = Math.round(audioElement.volume * 100);
  volumePercentageDisplay.textContent = `${volume}%`;
}

// Update the volume percentage when the volume changes
audioElement.addEventListener('volumechange', updateVolumePercentage);


const musicSelect = document.getElementById('musicSelect');
const audioSource = document.getElementById('audioSource');
const playList = document.getElementById('playlist');
let myPlayList = document.getElementById('myPlayList');
let currentSongIndex = 0;

// Add to play list button
playList.onclick = () => {
  // audioElement.pause();
  myPlayList.innerHTML = '';
  const selected = musicSelect.value;
  if(selected===""){
    myPlayList.innerHTML = 'invaild!';
  }else{
    play.push(selected);

    for(let x=0; x<play.length; x++){
      const music = play[x];
      myPlayList.innerHTML = myPlayList.innerHTML  + `<li><b>${music}</b></li>`;
    }
    const marker = myPlayList.children[currentSongIndex];
    marker.classList.add('text-info');
}
}

// Modified buttons for playlist
playButton.addEventListener('click', () => {
  if(play.length>0){
    audioSource.src = play[currentSongIndex];
    audioElement.load();
    audioElement.play();
  }
  
});

next.onclick = () => {
  if(currentSongIndex==play.length-1){
    audioSource.src = play[play.length-1];
    audioElement.load();
    audioElement.play();
  }else{
    currentSongIndex++;
    audioSource.src = play[currentSongIndex];
    audioElement.load();
    audioElement.play();
  }
}

back.onclick = () => {
  if(currentSongIndex == 0){
    audioSource.src = play[0];
    audioElement.load();
    audioElement.play();
  }else{
    currentSongIndex--;
    audioSource.src = play[currentSongIndex];
    audioElement.load();
    audioElement.play();
  }

}

const reset = document.getElementById('reset');
reset.onclick = () => {
  audioElement.pause();
  currentSongIndex = 0;
  play = [];
  myPlayList.innerHTML = '';
}

// Play next song automatically
audioElement.addEventListener('ended', () => {
  currentSongIndex++;
  if(currentSongIndex>play.length-1){
    currentSongIndex = 0;
    audioSource.src = play[currentSongIndex];
    audioElement.load();
    audioElement.play();
  }else{
    audioSource.src = play[currentSongIndex];
    audioElement.load();
    audioElement.play();
  }
})

// Update the audio volume based on the slider value
const volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('input', () => {
  audioElement.volume = volumeSlider.value;
});


const timeSlider = document.getElementById('timeSlider');
// Update audio time based on slider value
timeSlider.addEventListener('input', () => {
  const newPosition = audioElement.duration * (timeSlider.value / 100);
  audioElement.currentTime = newPosition;
});

// timeSlider animation
audioElement.addEventListener('timeupdate', () => {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;
  const currentTimePercentage = (currentTime / duration) * 100;
  timeSlider.value = currentTimePercentage;
});

const muteButton = document.getElementById('muteButton');
let isMuted = false;
// Toggle mute/unmute on button click
muteButton.addEventListener('click', () => {
  if (isMuted) {
    audioElement.isMuted = false;
    audioElement.volume = 0.25;
    volumeSlider.value = audioElement.volume;
    muteButton.textContent = 'Mute';
  } else {
    audioElement.isMuted = true;
    audioElement.volume = 0;
    muteButton.textContent = 'Unmute';
  }
  isMuted = !isMuted;
});

// High Light Animation
audioElement.addEventListener('play', () => {
  for (let i = 0; i < myPlayList.children.length; i++) {
    myPlayList.children[i].classList.remove('text-info');
  }
  const marker = myPlayList.children[currentSongIndex];
  marker.classList.add('text-info');
  
})

// Upload songs
const fileInput = document.getElementById('fileInput');
const addTrackButton = document.getElementById('add');

addTrackButton.addEventListener('click', () => {
  fileInput.click(); // Trigger the file input click
});

fileInput.addEventListener('change', () => {
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const trackName = selectedFile.name;
    const trackUrl = URL.createObjectURL(selectedFile); // Create a temporary URL for the local file
    play.push(trackUrl);
    myPlayList.innerHTML = '';
    for(let x=0; x<play.length; x++){
      const music = play[x];
      myPlayList.innerHTML = myPlayList.innerHTML  + `<li><b>${music}</b></li>`;
    }
    const marker = myPlayList.children[currentSongIndex];
    marker.classList.add('text-info');
  }
});





