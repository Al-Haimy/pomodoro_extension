let type = "POMODORO";
let countDown = 25 * 60;
let isRunning = false;
let interval = null;
let counter = 0;
const POMODORO = "POMODORO";
const LONG_BREAK = "LONG BREAK";
const SHORT_BREAK = "SHORT BREAK";
const POMO_TIME = 25 * 60;
const LONG_TIME = 15 * 60;
const SHORT_TIME = 5 * 60;
const RUNNING = true;
const STOPPED = false;
let lifeline;

const tick = () => {
  if (countDown > 0) {
    countDown--;
  }
  if (countDown == 0) {
    stopPomodoro();
    isRunning = STOPPED;
  }
};

const setAlarmConfig = () => {
  chrome.alarms.create("POMODORO", {
    periodInMinutes: parseInt(countDown / 60) % 60,
  });
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "POMODORO") {
    chrome.notifications.create("pomodoro", {
      type: "basic",
      iconUrl: "logo-128.png",
      title: "POMODORO TIMER",
      message: "You are awesome!",
      priority: 1,
    });
    const audio = new Audio("./alarm.mp3");
    audio.play();
  }
});

const startPomodoro = () => {
  interval = setInterval(tick, 1000);
  if (countDown >= 60) {
    setAlarmConfig();
  }
};

const stopPomodoro = () => {
  clearInterval(interval);
  interval = null;
  chrome.alarms.clear("POMODORO", function () {});
};

chrome.runtime.onConnect.addListener(function (port) {
  console.log(port.name);

  port.onMessage.addListener(function (msg) {
    if (typeof msg.section != "undefined") {
      isRunning = STOPPED;
      switch (msg.section) {
        case 1:
          stopPomodoro();
          type = POMODORO;
          countDown = POMO_TIME;
          break;
        case 2:
          stopPomodoro();
          type = SHORT_BREAK;
          countDown = SHORT_TIME;
          break;
        case 3:
          stopPomodoro();
          type = LONG_BREAK;
          countDown = LONG_TIME;
          break;
        default:
          type = POMODORO;
          countDown = POMO_TIME;

          break;
      }
    }
    if (typeof msg.action != "undefined") {
      switch (msg.action) {
        case true:
          startPomodoro();
          isRunning = RUNNING;
          break;
        case false:
          stopPomodoro();
          isRunning = STOPPED;
          break;
      }
    }
    chrome.browserAction.setBadgeText({ text: "grr" });

    port.postMessage({
      time: countDown,
      section: type,
      status: isRunning,
    });
  });
});
