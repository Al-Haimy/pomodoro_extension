import React from "react";
import { Button, Grid } from "@mui/material/";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#DFD8CA"),
  backgroundColor: "#DFD8CA",
  "&:hover": {
    backgroundColor: "#FBF3E4",
  },
}));
const Btn = ({ textBtn, toExecute }) => {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <ColorButton
          variant="contained"
          color="success"
          size="large"
          sx={{
            minWidth: 200,
          }}
          onClick={toExecute}
        >
          {textBtn}
        </ColorButton>
      </Grid>
    </Grid>
  );
};

export default Btn;
