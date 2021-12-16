import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SwitchBtn from "./SwitchBtn";
import InputFiled from "./InputFiled";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import { useState, useEffect } from "react";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  width: 150,
  marginTop: 3,
  "&:hover": {
    backgroundColor: pink[700],
  },
}));

const changeToMinutes = (secounds) => {
  let minutes = parseInt(secounds / 60) % 60;
  return minutes;
};
const changeToSecounds = (minutes) => {
  let secounds = parseInt(minutes) * 60;
  return secounds;
};

const Settings = () => {
  const [alarmSound, setAlarmSound] = useState(true);
  const [notification, setNotification] = useState(true);
  const [btnSound, setBtnSound] = useState(true);
  const [pomoTime, setPomoTime] = useState(0);
  const [shortTime, setShortTime] = useState(0);
  const [longTime, setLongTime] = useState(0);

  const setDefaultSettings = () => {
    setAlarmSound(true);
    setNotification(true);
    setBtnSound(true);

    console.log(notification, "i was clicked");
    chrome.storage.sync.set({
      isAlarm: true,
      isNotification: true,
      isButton: true,
      pomodoro: changeToSecounds(25),
      short: changeToSecounds(5),
      long: changeToSecounds(15),
    });
    setPomoTime(25);
    setShortTime(5);
    setLongTime(15);
  };
  chrome.storage.sync.get(
    ["isAlarm", "isNotification", "isButton", "pomodoro", "short", "long"],
    (settings) => {
      setAlarmSound(settings.isAlarm);
      setNotification(settings.isNotification);
      setBtnSound(settings.isButton);
      setPomoTime(changeToMinutes(settings.pomodoro));
      setShortTime(changeToMinutes(settings.short));
      setLongTime(changeToMinutes(settings.long));
    }
  );

  const ontimeChange = (time, id) => {
    let seconds;
    seconds = changeToSecounds(time);
    if (id === "pomoTime") {
      chrome.storage.sync.set({
        pomodoro: seconds,
      });
      setPomoTime(time);
    } else if (id === "long") {
      chrome.storage.sync.set({
        long: seconds,
      });
      setLongTime(time);
    } else if (id === "short") {
      chrome.storage.sync.set({
        short: seconds,
      });
      setShortTime(time);
    }
    console.log(id);
  };

  const handleChange = (state, id) => {
    if (id === "alarm") {
      chrome.storage.sync.set({
        isAlarm: !alarmSound,
      });
      setAlarmSound(!alarmSound);
    } else if (id === "btnSound") {
      chrome.storage.sync.set({
        isButton: !btnSound,
      });
      setBtnSound(!btnSound);
    } else if (id === "notification") {
      chrome.storage.sync.set({
        isNotification: !notification,
      });
      setNotification(!notification);
    }
  };

  return (
    <Container
      sx={{
        marginTop: 3,
      }}
      maxWidth="xl"
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: "#FBF3E4",
            }}
          >
            SETTINGS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Container
            sx={{
              backgroundColor: "#FBF3E4",
              borderRadius: 0.5,
              paddingBottom: 2,
            }}
            maxWidth="xl"
          >
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item xs={12}>
                <SwitchBtn
                  onId="alarm"
                  isChecked={alarmSound}
                  labelText="Alarm sound"
                  changeHandler={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SwitchBtn
                  onId="btnSound"
                  isChecked={btnSound}
                  labelText="Buttons Sound"
                  changeHandler={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SwitchBtn
                  onId="notification"
                  isChecked={notification}
                  labelText="Notification "
                  changeHandler={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                {pomoTime ? (
                  <InputFiled
                    valueMinutes={pomoTime}
                    handleChange={ontimeChange}
                    inputId="pomoTime"
                    labelText="Pomodoro"
                  />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={12}>
                {shortTime ? (
                  <InputFiled
                    valueMinutes={shortTime}
                    labelText="Short break"
                    handleChange={ontimeChange}
                    inputId="short"
                  />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={12}>
                {longTime ? (
                  <InputFiled
                    valueMinutes={longTime}
                    handleChange={ontimeChange}
                    inputId="long"
                    labelText="Long break"
                  />
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item>
                <ColorButton
                  onClick={setDefaultSettings}
                  size="medium"
                  variant="contained"
                >
                  Reset
                </ColorButton>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
