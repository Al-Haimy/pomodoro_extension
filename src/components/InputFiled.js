import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const InputFiled = ({ labelText }) => {
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
            width: 70,
          }}
          defaultValue={40}
        />
      </Grid>
    </Grid>
  );
};

export default InputFiled;
