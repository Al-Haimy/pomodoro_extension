let type = "POMODORO";
let countDown = 25 * 60;
let isRunning = false;
let interval = null;
let counter = 0;
const POMODORO = "POMODORO";
const LONG_BREAK = "LONG BREAK";
const SHORT_BREAK = "SHORT BREAK";
const POMO_TIME = 0.1 * 60;
const LONG_TIME = 0.1 * 60;
const SHORT_TIME = 0.1 * 60;
const RUNNING = true;
const STOPPED = false;
let lifeline;

keepAlive();

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "keepAlive") {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: "*://*/*" })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: "keepAlive" }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}
const tick = () => {
  if (countDown > 0) {
    countDown--;
  }
  if (countDown == 0 && type == POMODORO) {
    counter++;
    console.log(counter);
    if (counter % 4 != 0 || counter < 4) {
      countDown = SHORT_TIME;
      type = SHORT_BREAK;
    } else if (counter % 4 == 0 && counter != 0) {
      countDown = LONG_TIME;
      type = LONG_BREAK;
    }
  } else if (countDown == 0) {
    type = POMODORO;
    countDown = POMO_TIME;
  }
};

const startPomodoro = () => {
  interval = setInterval(tick, 1000);
};

const stopPomodoro = () => {
  clearInterval(interval);
  interval = null;
};

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (typeof req.section != "undefined") {
    isRunning = STOPPED;
    switch (req.section) {
      case 1:
        type = POMODORO;
        countDown = POMO_TIME;
        break;
      case 2:
        type = SHORT_BREAK;
        countDown = SHORT_TIME;
        break;
      case 3:
        type = LONG_BREAK;
        countDown = LONG_TIME;
        break;
      default:
        type = POMODORO;
        countDown = POMO_TIME;

        break;
    }
  }
  if (typeof req.action != "undefined") {
    switch (req.action) {
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
  sendResponse({
    time: countDown,
    section: type,
    status: isRunning,
  });
});
