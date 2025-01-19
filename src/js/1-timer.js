
import "../css/style.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector("[data-start]");
const dateTimePicker = document.querySelector("#datetime-picker");
const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerInterval = null;

// Initialize Flatpickr for date and time picker
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Function that runs when Flatpickr closes
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future!",
        position: "topRight",
        timeout: 3000,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Function for converting milliseconds to days, hours, minutes, seconds
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
}

// Function to add a leading 0 if the value has a single digit
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Function for updating the timer display
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}

// Start button event
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date(); //
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      iziToast.success({
        title: "Finished",
        message: "Countdown timer has ended!",
        position: "topRight",
        timeout: 3000,
      });

      dateTimePicker.disabled = false;
      return;
    }

    // Update the timer on the screen
    const time = convertMs(timeDifference);
    updateTimerDisplay(time);
  }, 1000);
});
