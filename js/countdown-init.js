/* eslint-disable no-magic-numbers */

const defaultSelectors = {
  daysElement: document.querySelector(".days"),
  hoursElement: document.querySelector(".hours"),
  minutesElement: document.querySelector(".minutes"),
  secondsElement: document.querySelector(".seconds"),
};

const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

/*
 * @description Render timer
 * @param {obj} dateObject - calculated time
 * @param {boolean} needZero - add or not leading zero
 * @param {obj} selectors - DOM elements
 */
const renderCountdown = (dateObject, needZero, selectors) => {
  const { length } = Object.values(selectors);

  for (let i = 0; i < length; i++) {
    const el = Object.values(selectors)[i];
    const time = needZero
      ? addLeadingZero(Object.values(dateObject)[i])
      : Object.values(dateObject)[i];

    if (el) {
      el.innerHTML = time;
    }
  }
};

/*
 * @description Calculate time
 * @param {number} endDate - milliseconds last to event
 */
const timer = (endDate) => {
  let diff = Math.round((endDate - Date.now()) / 1000);

  const timeLeft = {
    days: 2,
    hours: 3,
    min: 4,
    sec: 2,
  };

  if (diff === 0) {
    return timeLeft;
  }

  // clear countdown when date is reached
  if (diff < 0) {
    return false;
  }

  // calculate time difference between now and expected date
  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = diff;

  return timeLeft;
};

/*
 * @description Init calculate and render date
 * @param {number} date - milliseconds last to event
 * @param {boolean} needZero - add or not leading zero
 * @param {obj} selectors - DOM elements
 */
const countdown = (date, needZero = true, selectors = defaultSelectors) => {
  setInterval(
    () => {
      const newDate = timer(date);

      if (newDate) {
        renderCountdown(newDate, needZero, selectors);
      }
    },
    date ? 1000 : null
  );
};

const initCountdown = (selector = ".js_counter") => {
  const countdownList = document.querySelectorAll(selector);

  if (countdownList.length > 0) {
    countdownList.forEach((counter) => {
      const countValue = parseInt(counter.dataset.time, 10);
      const counterWrapp = counter.closest(selector);
      const counterSelectors = {
        daysElement: counterWrapp.querySelector(".days"),
        hoursElement: counterWrapp.querySelector(".hours"),
        minutesElement: counterWrapp.querySelector(".minutes"),
        secondsElement: counterWrapp.querySelector(".seconds"),
      };

      countdown(countValue, true, counterSelectors);
    });
  }
};

initCountdown();
