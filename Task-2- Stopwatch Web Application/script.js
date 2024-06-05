let timerDisplay = document.querySelector(".timerDisplay");
let stopBtn = document.getElementById("stopBtn");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let lapList = document.querySelector(".lapList");
const lapSound = document.getElementById("lapSound");
const startSound = document.getElementById("startSound");

let msec = 00;
let secs = 00;
let mins = 00;
let timerId = null;
let lapCount = 1;
let isRunning = false; 

startBtn.addEventListener("click", function () {
  if (!isRunning) {
    timerId = setInterval(startTimer, 10);
    isRunning = true;
    startSound.play();
  }
  saveState();
});

stopBtn.addEventListener("click", function () {
  clearInterval(timerId);
  isRunning = false;
  startSound.pause();
  startSound.currentTime = 0; 
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerId);
  timerDisplay.innerHTML = `00 : 00 : 00`;
  msec = secs = mins = 0;
  lapList.innerHTML = "";
  lapCount = 1;
  isRunning = false;
  startSound.pause();
  startSound.currentTime = 0;
});

function startTimer() {
  msec++;
  if (msec == 100) {
    msec = 0;
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
  }

  let msecString = msec < 10 ? `0${msec}` : msec;
  let secsString = secs < 10 ? `0${secs}` : secs;
  let minsString = mins < 10 ? `0${mins}` : mins;

  timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}

lapBtn.addEventListener("click", function () {
  if (timerId !== null) {
    let lapTime = timerDisplay.innerHTML;
    let lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
    lapSound.play();
  }
});
loadState();

function saveState() {
    const stopwatchState = {
        msec,
        secs,
        mins,
        lapCount,
        isRunning
    };

    localStorage.setItem("stopwatchState", JSON.stringify(stopwatchState));
}

function loadState() {
    const savedState = localStorage.getItem("stopwatchState");
    
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        msec = parsedState.msec;
        secs = parsedState.secs;
        mins = parsedState.mins;
        lapCount = parsedState.lapCount;
        isRunning = parsedState.isRunning;

        if (isRunning) {
            timerId = setInterval(startTimer, 10);
        }

    }
}
