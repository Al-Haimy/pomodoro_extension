import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";

/*
Material UI changing the style by adding some Moduls  
*/
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));
const label = { inputProps: { "aria-label": "Switch demo" } };

const SwitchBtn = ({ labelText, onId, isChecked, changeHandler }) => {
  /**
  function to handle the switch clicks
   */
  const switchClick = () => {
    changeHandler(isChecked, onId);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        marginBottom: 1,
        marginLeft: 1,
      }}
    >
      <Grid item xs={2}>
        <Typography>{labelText}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Stack direction="row" spacing={0} alignItems="center">
          <Typography>OFF</Typography>
          <GreenSwitch
            {...label}
            onClick={switchClick}
            id={onId}
            checked={isChecked}
          />
          <Typography>ON</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SwitchBtn;
