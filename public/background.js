const POMODORO = "POMODORO";
const LONG_BREAK = "LONG BREAK";
const SHORT_BREAK = "SHORT BREAK";
const POMO_TIME = 25 * 60;
const LONG_TIME = 15 * 60;
const SHORT_TIME = 5 * 60;
const RUNNING = true;
const STOPPED = false;
let type = "POMODORO";
let countDown = 25 * 60;
let isRunning = false;
let interval = null;
let counter = 0;
let lifeline;
let typeDigit = 1;

// count down function.
const tick = () => {
  if (countDown > 0) {
    countDown--;
  }
  if (countDown == 0) {
    chrome.notifications.create("pomodoro", {
      type: "basic",
      iconUrl: "logo-128.png",
      title: "POMODORO TIMER",
      message: type + " IS DONE!",
      priority: 0,
    });
    const audio = new Audio("./alarm.mp3");
    audio.play();
    stopPomodoro();
    isRunning = STOPPED;
  }
};

// function to set the alarm
const setAlarmConfig = () => {
  chrome.alarms.create("POMODORO", {
    periodInMinutes: parseInt(countDown / 60) % 60,
  });
};

// Alarm triger listener to execute a function when ever the alarm is executed
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "POMODORO") {
    chrome.notifications.create("pomodoro", {
      type: "basic",
      iconUrl: "logo-128.png",
      title: "POMODORO TIMER",
      message: type + " IS DONE!",
      priority: 0,
    });
    const audio = new Audio("./alarm.mp3");
    audio.play();
  }
});

// start function that to start the pomodoro
const startPomodoro = () => {
  if (countDown >= 60) {
    setAlarmConfig();
  } else if (countDown == 0) {
    setTypeDuration(typeDigit);
  }
  interval = setInterval(tick, 10);
};

// stop function to stop the pomodoro timer
const stopPomodoro = () => {
  clearInterval(interval);
  interval = null;
  chrome.alarms.clear("POMODORO", function () {});
};

// long live message google chrome api
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port.name);

  port.onMessage.addListener(function (msg) {
    if (typeof msg.section != "undefined") {
      isRunning = STOPPED;
      typeDigit = msg.section;
      setTypeDuration(typeDigit);
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
    if (timeShow() != "00") {
      badge();
    } else {
      quiet();
    }

    port.postMessage({
      time: countDown,
      section: type,
      status: isRunning,
    });
  });
});

// function to add badge
const badge = () => {
  chrome.browserAction.setBadgeBackgroundColor({ color: "#F00" }, () => {
    chrome.browserAction.setBadgeText({ text: timeShow() });
  });
};

//function to remove the badge when the minutes is 0
const quiet = () => {
  chrome.browserAction.setBadgeText({});
};

//function to show the minutes for hte badge
const timeShow = () => {
  let minutes = parseInt(countDown / 60) % 60;
  let timeLift = minutes < 10 ? "0" + minutes : "" + minutes;
  return timeLift;
};

// adding the type of the pomodoro and the duration
const setTypeDuration = (typeName) => {
  switch (typeName) {
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
};
