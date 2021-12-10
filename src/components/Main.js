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
  const [displayText, setDisplayText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [timeDisplay, setTimeDisplay] = useState("");

  var port = chrome.runtime.connect({ name: "hi" });

  useEffect(() => {
    setInterval(() => {
      port.postMessage({ msg: "hi" });
      port.onMessage.addListener(function (res) {
        setDisplayText(res.section);
        setTimeDisplay(timeShow(res.time));
        !res.status ? setBtnText("start") : setBtnText("stop");
        console.log(res.time);
      });
    }, 1000);
  }, [timeDisplay]);

  const mainBtn = () => {
    if (btnText == "start") {
      port.postMessage({ action: true });
      port.onMessage.addListener((res) => {
        setDisplayText(res.section);
        setTimeDisplay(timeShow(res.time));
        !res.status ? setBtnText("start") : setBtnText("stop");
      });
    } else {
      port.postMessage({ action: false });
      port.onMessage.addListener((res) => {
        setDisplayText(res.section);
        setTimeDisplay(timeShow(res.time));
        !res.status ? setBtnText("start") : setBtnText("stop");
      });
    }
    console.log("button was clicked");
  };

  const changeType = (e) => {
    port.postMessage({ section: parseInt(e.target.id) });
    port.onMessage.addListener((res) => {
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
