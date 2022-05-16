import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedUserDate = selectedDates[0].getTime();
    if (selectedUserDate < Date.now()) {
      alert('Please choose a date in the future');
      refs.start.setAttribute('disabled', true);
      return;
    } else {
      refs.start.removeAttribute('disabled');
    }
    refs.start.addEventListener('click', () => {
      timerStart.start(selectedUserDate);
    });
  },
};
flatpickr(' #datetime-picker', options);

const timerStart = {
  intervalId: null,

  start(startTime) {
    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const resultTime = startTime - currentTime;
      const time = convertMs(resultTime);

      updateClockface(time);

      if (resultTime <= 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.timer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
