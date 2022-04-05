import { convertMs } from './helpers/convertMs'
import { pad } from './helpers/pad'

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCalendarClose(selectedDates[0]);
  },
};

const refs = {
  input: document.querySelector('#datetime-picker'),

  startButton: document.querySelector('[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chosenDate = Date.now();

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onStart);

const fp = flatpickr(refs.input, options);

function onCalendarClose(date) {
  if (Date.now() > date) {
    Notify.failure('Please choose a date in the future');
  } 
    refs.startButton.disabled = false;
    chosenDate = date;
}

function onStart() {
  refs.startButton.disabled = true;
  refs.input.disabled = true;
  fp.destroy();
  setInterval(() => {
    const restTime = convertMs(chosenDate - Date.now());
    updateMarkup(restTime);
  }, 1000);
}

function updateMarkup({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

