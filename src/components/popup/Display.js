import React from "react";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const textArray = [
  "Success is forged in the fire of defeat",
  "Hard work matters",
  "Don’t let fear of failure put you off",
  "It’s the little things that matter",
  "Go get it!",
  "Recipe for success",
  "Pick yourself up – like Batman",
  "Don’t quit yet!",
  "Take complete responsibility",
  "Believe you can",
  "It will be worth it in the end",
  "Courage + work = success",
];

const Display = ({ section, time }) => {
  const [randText, setRandText] = useState("");
  useEffect(() => {
    let rand = Math.floor(Math.random() * (12 - 0)) + 0;
    setRandText(textArray[rand]);
    console.log(randText);
  }, []);

  return (
    <Grid
      container
      direction="row"
      spacing={0.3}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sx={{
          marginTop: 1,
        }}
      >
        <p className="display">{section}</p>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: 1,
        }}
      >
        <h1>{time}</h1>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: 1,
        }}
      >
        <p className="change">{randText}</p>
      </Grid>
    </Grid>
  );
};

export default Display;

Display.propTypes = {
  section: PropTypes.string.isRequired,
};

Display.defaultProps = {
  section: "POMODORO",
};
