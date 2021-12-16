import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const InputFiled = ({ labelText, valueMinutes, handleChange, inputId }) => {
  const [newValue, setNewValue] = useState(valueMinutes);

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
        <TextField
          id="standard-number"
          label="Minutes"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          sx={{
            width: 120,
          }}
          defaultValue={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
            handleChange(e.target.value, inputId);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default InputFiled;
