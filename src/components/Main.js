import React from "react";
import Header from "./Header";
import Display from "./Display";
import Btn from "./Btn";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

let timeLift;
// function to show the times in minutes and secounds
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
  const [displayText, setDisplayText] = useState("Loading...");
  const [btnText, setBtnText] = useState("Loading...");
  const [timeDisplay, setTimeDisplay] = useState("Loading...");

  var port = chrome.runtime.connect({ name: "hi" });
  /*
    fetching data each one secounds from background js
    and using chrome long live port messaging to get long connection and keep the connection alive  
  */
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
  }, []);

  /*
    function for the start button it meant to send request to the 
    background js and resive response and also change the text on the button
  */
  const mainBtn = () => {
    const audio = new Audio("./startBtn.wav");
    audio.play();
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
  };

  /*
    function for the head buttons. 
    it takes the object of clicked button and send the object id
    in the backgournd js will treat the id digit as type number.
  */
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
