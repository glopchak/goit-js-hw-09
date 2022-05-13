function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

const timeOut = 1000;

const colorSwitch = {
  itervalId: null,

  start() {
    this.itervalId = setInterval(() => {
      body.style = `background-color: ${getRandomHexColor()}`;
    }, timeOut);

    btnStart.setAttribute('disabled', true);
  },

  stop() {
    clearInterval(this.itervalId);

    btnStart.removeAttribute('disabled');
  },
};

btnStart.addEventListener('click', () => {
  colorSwitch.start();
});
btnStop.addEventListener('click', () => {
  colorSwitch.stop();
});
