const POMODORO = "POMODORO";
const LONG_BREAK = "LONG BREAK";
const SHORT_BREAK = "SHORT BREAK";
let pomoTime = 25 * 60;
let longTime = 15 * 60;
let shortTime = 5 * 60;
const RUNNING = true;
const STOPPED = false;
let type = "POMODORO";
let countDown = 25 * 60;
let isRunning = false;
let interval = null;
let counter = 0;
let lifeline;
let typeDigit = 1;
let alarmSound = true;
let isNotifi = false;
let btnSound = true;

/**
function to set the default values in storage
 */

const setDefaultSettings = () => {
  chrome.storage.sync.set({
    isAlarm: alarmSound,
    isNotification: isNotifi,
    isButton: btnSound,
    pomodoro: pomoTime,
    short: shortTime,
    long: longTime,
  });
};

/*
retreving VAlues from the storage if they are not in place 
will set the default values
 */

chrome.storage.sync.get(
  ["isAlarm", "isNotification", "isButton", "pomodoro", "short", "long"],
  (settings) => {
    if (typeof settings.isAlarm == "undefined") {
      setDefaultSettings();
    } else {
      pomoTime = settings.pomodoro;
      shortTime = settings.short;
      longTime = settings.long;
      alarmSound = settings.isAlarm;
      isNotifi = settings.isNotification;
      setTypeDuration(typeDigit);
    }
  }
);

/*
Adding listener for the storage to chagne the values on real time
 */

chrome.storage.onChanged.addListener(function (settings) {
  if (settings.pomodoro) {
    pomoTime = settings.pomodoro.newValue;
    stopPomodoro();
    setTypeDuration(typeDigit);
  }
  if (settings.short) {
    shortTime = settings.short.newValue;
    stopPomodoro();
    setTypeDuration(typeDigit);
  }
  if (settings.long) {
    longTime = settings.long.newValue;
    stopPomodoro();
    setTypeDuration(typeDigit);
  }
  if (settings.isAlarm) {
    alarmSound = settings.isAlarm.newValue;
  }
  if (settings.isNotification) {
    isNotifi = settings.isNotification.newValue;
  }
});

// count down function.
const tick = () => {
  if (countDown > 0) {
    countDown--;
  }
  if (countDown == 0) {
    stopPomodoro();
    if (isNotifi) {
      chrome.notifications.create("pomodoro", {
        type: "basic",
        iconUrl: "logo-128.png",
        title: "POMODORO TIMER",
        message: type + " IS DONE!",
        priority: 0,
      });
    }
    if (alarmSound) {
      const audio = new Audio("./alarm.wav");
      audio.play();
    }
  }
};

// function to set the alarm
const setAlarmConfig = () => {
  chrome.alarms.create("POMODORO", {
    periodInMinutes: parseInt(countDown / 60) % 60,
  });
};

// Alarm triger listener to execute a function when ever the alarm is executed

// start function that to start the pomodoro
const startPomodoro = () => {
  if (countDown >= 60) {
    setAlarmConfig();
  } else if (countDown == 0) {
    setTypeDuration(typeDigit);
  }
  isRunning = RUNNING;
  interval = setInterval(tick, 100);
};

// stop function to stop the pomodoro timer
const stopPomodoro = () => {
  clearInterval(interval);
  isRunning = STOPPED;
  interval = null;
  chrome.alarms.clear("POMODORO", function () {});
};

// long live message google chrome api
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (typeof msg.section != "undefined") {
      stopPomodoro();
      typeDigit = msg.section;
      setTypeDuration(typeDigit);
    }
    if (typeof msg.action != "undefined") {
      switch (msg.action) {
        case true:
          startPomodoro();

          break;
        case false:
          stopPomodoro();
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
      countDown = pomoTime;
      break;
    case 2:
      stopPomodoro();
      type = SHORT_BREAK;
      countDown = shortTime;
      break;
    case 3:
      stopPomodoro();
      type = LONG_BREAK;
      countDown = longTime;
      break;
    default:
      type = POMODORO;
      countDown = pomoTime;

      break;
  }
};
