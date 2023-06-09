const minutes = document.querySelector(".timer .minute");
const seconds = document.querySelector(".timer .seconds");

let timeCounter;
let tempo;
let timeoutID = undefined;

const controls = {
  play: document.querySelector(".play"),
  stop: document.querySelector(".stop"),
  pause: document.querySelector(".pause"),
  set: document.querySelector(".set"),

  active() {
    controls.play.classList.add("hide");
    controls.set.classList.add("hide");
    controls.pause.classList.remove("hide");
    controls.stop.classList.remove("hide");
  },
  stopEvent() {
    controls.play.classList.remove("hide");
    controls.set.classList.remove("hide");
    controls.stop.classList.add("hide");
    controls.pause.classList.add("hide");

    timeCounter = 0;
    minutes.innerHTML = `00`;
    seconds.innerHTML = `00`;
    clearTimeout(timeoutID);
  },
  pauseEvent() {
    controls.play.classList.remove("hide");
    controls.pause.classList.add("hide");
  },
  default() {
    controls.play.classList.remove("hide");
    controls.set.classList.remove("hide");
    controls.pause.classList.add("hide");
    controls.stop.classList.add("hide");
  },
};

function setTiming() {
  if (timeCounter == 0) {
    return;
  }
  return setTimeout(timing, 1000);
}

let timetotal;
let minutosTotal;
let secondsTotal;

const timing = () => {
  minutosTotal = Math.floor(timeCounter / 60);
  secondsTotal = Math.floor(timeCounter % 60);
  if (timeCounter <= secondsTotal) {
    minutes.innerHTML = `${minutosTotal}`;
    seconds.innerHTML = `${secondsTotal}`;
  }
  if (secondsTotal || minutosTotal <= 0) {
    seconds.innerHTML = `${secondsTotal}`;
    minutes.innerHTML = `00`;
  }
  if (minutosTotal < 10) {
    minutes.innerHTML = `0${minutosTotal}`;
    seconds.innerHTML = `${secondsTotal}`;
    if (secondsTotal < 10) {
      seconds.innerHTML = `0${secondsTotal}`;
    }
    if (secondsTotal < 0) {
      seconds.innerHTML = `0${secondsTotal}`;
    }
  }

  timeoutID = setTimeout(function () {
    timeCounter--;
    return timing();
  }, 1000);

  console.log(timeCounter);
  console.log(`minutos: ${minutosTotal} segundos: ${secondsTotal} total: ${timeCounter}`);

  controls.active();

  if (minutosTotal === 0 && secondsTotal === 0) {
    controls.stopEvent();
  }
};

const showTime = () => {
  tempo = prompt("?");

  timeCounter = tempo;
  minutosTotal = Math.floor(timeCounter / 60);
  secondsTotal = timeCounter % 60;

  console.log(`minutos: ${minutosTotal} segundos: ${secondsTotal} total: ${timeCounter}`);

  if (secondsTotal < 59) {
    if (minutosTotal || secondsTotal > 9) {
      minutes.innerHTML = `${minutosTotal}`;
      seconds.innerHTML = `0${secondsTotal}`;
    }
    if (secondsTotal > 9) {
      seconds.innerHTML = `${secondsTotal}`;
    } else {
      seconds.innerHTML = `0${secondsTotal}`;
    }
  }
  if (minutosTotal < 9) {
    minutes.innerHTML = `0${minutosTotal}`;
  }
};

const pausefunction = () => {
  clearTimeout(timeoutID);
  console.log("pause");
};

controls.play.addEventListener("click", setTiming);
controls.set.addEventListener("click", showTime);
controls.pause.addEventListener("click", () => {
  controls.pauseEvent();
  pausefunction();
});
controls.stop.addEventListener("click", () => {
  controls.stopEvent();
});
