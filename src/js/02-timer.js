import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStr = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

btnStr.disabled = true;
flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        selected = selectedDates[0].getTime();        
        if (selected < new Date()) {
            Notify.failure('Please choose a date in the future');
            btnStr.disabled = true;
            return;
        }
        btnStr.disabled = false;
        
        
    },
});

function pad(num) {
    return num.toString().padStart(2, '0');
}

const startBtn = () => {
    const interval = setInterval(() => {
        btnStr.disabled = true;
        inputEl.disabled = true;
        const difference = selected - Date.now();
        if (difference < 1000) {
            btnStr.disabled = false;
            inputEl.disabled = false;
            clearInterval(interval);
        };
        const { days, hours, minutes, seconds } = convertMs(difference);
        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);
    }, 1000);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};

btnStr.addEventListener ('click', startBtn);
