import React from "react";
import Header from "./Header";
import Display from "./Display";
import Btn from "./Btn";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
let timeLift;
const timeShow = (time) => {
  let minutes = parseInt(time / 60) % 60;
  let seconds = time % 60;
  timeLift =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  return timeLift;
};

const Main = () => {
  const [displayText, setDisplayText] = useState("POMODORO");
  const [btnText, setBtnText] = useState("start");
  const [timeDisplay, setTimeDisplay] = useState("25:00");

  useEffect(() => {
    setInterval(() => {
      chrome.runtime.sendMessage({ msg: "hi" }, (res) => {
        setDisplayText(res.section);
        setTimeDisplay(timeShow(res.time));
        !res.status ? setBtnText("start") : setBtnText("stop");
        console.log(res.time);
      });
    }, 1000);
  });

  const mainBtn = () => {
    if (btnText == "start") {
      chrome.runtime.sendMessage({ action: true }, (res) => {
        setDisplayText(res.section);
        setTimeDisplay(timeShow(res.time));
        !res.status ? setBtnText("start") : setBtnText("stop");
      });
    } else {
      chrome.runtime.sendMessage({ action: false }, (res) => {
        setDisplayText(res.section);
        setTimeDisplay(timeShow(res.time));
        !res.status ? setBtnText("start") : setBtnText("stop");
      });
    }
    console.log("button was clicked");
  };

  const changeType = (e) => {
    chrome.runtime.sendMessage({ section: parseInt(e.target.id) }, (res) => {
      setDisplayText(res.section);
      setTimeDisplay(timeShow(res.time));
      !res.status ? setBtnText("start") : setBtnText("stop");
    });
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={12}>
          <Header onClickType={changeType} />
        </Grid>
        <Grid item xs={12}>
          <Display section={displayText} time={timeDisplay} />
        </Grid>
        <Grid item xs={12}>
          <Btn textBtn={btnText} toExecute={mainBtn} />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
