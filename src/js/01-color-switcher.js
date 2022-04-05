import { getRandomHexColor } from './helpers/getRandomHexColor';

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerId = null;

stopButton.disabled = true;

startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
});
