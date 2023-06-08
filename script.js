const minutes = document.querySelector(".timer .minute");
const seconds = document.querySelector(".timer .seconds");

let timeCounter = 0;
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
};

function setTiming() {
  if (timeCounter == 0) {
    return;
  }
  return setTimeout(timing, 1000);
}

const timing = () => {
  if (timeCounter > 59) {
    timeCounter = tempo / 60;
    minutes.innerHTML = `0${timeCounter}`;
  } else if (timeCounter > 9) {
    seconds.innerHTML = `${timeCounter}`;
  } else if (timeCounter < 59) {
    timeCounter = tempo / timeCounter - 1;
    seconds.innerHTML = `${timeCounter}`;
    if (tempo / 60 < timeCounter) {
      minutes.innerHTML = `0${Math.round(timeCounter) / 60}`;
    }
    minutes.innerHTML = `0${Math.round(timeCounter / 60)}`;
  } else {
    seconds.innerHTML = `0${timeCounter}`;
  }
  timeCounter--;
  timeoutID = setTimeout(timing, 1000);
  controls.active();
};

const showTime = () => {
  tempo = prompt("?");

  timeCounter = tempo;
  if (timeCounter > 59) {
    timeCounter = tempo / 60;
    minutes.innerHTML = `0${timeCounter}`;
  } else if (timeCounter > 9) {
    seconds.innerHTML = `${timeCounter}`;
  } else {
    seconds.innerHTML = `0${timeCounter}`;
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
