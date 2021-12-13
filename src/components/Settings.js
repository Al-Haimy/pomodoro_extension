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
import { useState } from "react";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  width: 150,
  marginTop: 3,
  "&:hover": {
    backgroundColor: pink[700],
  },
}));

const Settings = () => {
  const [stng, setStng] = useState({
    alarm: "",
    notifi: "",
    btnSound: "",
    pomo: "",
    short: "",
    long: "",
  });
  chrome.storage.sync.get(
    ["isAlarm", "isNotification", "isButton", "pomodoro", "short", "long"],
    (settings) => {
      console.log(settings);
    }
  );
  const handleChange = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);
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
                  checkValue={handleChange}
                  labelText="Alarm sound"
                />
              </Grid>
              <Grid item xs={12}>
                <SwitchBtn
                  onId="btnSound"
                  checkValue={handleChange}
                  labelText="Buttons Sound"
                />
              </Grid>
              <Grid item xs={12}>
                <SwitchBtn
                  onId="notification"
                  checkValue={handleChange}
                  labelText="Notification "
                />
              </Grid>

              <Grid item xs={12}>
                <InputFiled labelText="Pomodoro" />
              </Grid>
              <Grid item xs={12}>
                <InputFiled labelText="Short break" />
              </Grid>
              <Grid item xs={12}>
                <InputFiled labelText="Long break" />
              </Grid>
              <Grid item>
                <ColorButton size="large" variant="contained">
                  Submit
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
