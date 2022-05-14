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

let intervalId = null;
let selectedUserDate = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
       selectedUserDate = selectedDates[0].getTime();
      checkValidDate(selectedUserDate);
      getTimeValues(selectedUserDate);
},
};

flatpickr(' #datetime-picker', options);

function checkValidDate(){
    if (selectedUserDate < options.defaultDate){
        alert('Please choose a date in the future');
        refs.start.setAttribute('disabled', true);
        return;
    } else{
        refs.start.removeAttribute('disabled');
    };
};

function getTimeValues(){
    const resultTime = selectedUserDate - options.defaultDate;
    const time = convertMs(resultTime);

    if(resultTime > 0){
        updateClockface(time);
    }
    // console.log(time);
};

function updateClockface({ days, hours, minutes, seconds }){
refs.timer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
};

function pad(value){
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

refs.start.addEventListener('click', () => {
    intervalId = setInterval(getTimeValues(), 1000);
});
