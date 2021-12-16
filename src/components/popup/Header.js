import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#DFD8CA"),
  backgroundColor: "#DFD8CA",
  borderColor: "#FBF3E4",
  "&:hover": {
    backgroundColor: "#FBF3E4",
    borderColor: "#DFD8CA",
  },
}));

const Header = ({ onClickType }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <ButtonGroup>
            <ColorButton onClick={onClickType} id="1">
              Pomodoro
            </ColorButton>
            <ColorButton onClick={onClickType} id="2">
              Short Break
            </ColorButton>
            <ColorButton onClick={onClickType} id="3">
              Long Break
            </ColorButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
