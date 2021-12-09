import React from "react";
import Header from "./Header";
import Display from "./Display";
import Box from "@mui/material/Box";
import Main from "./Main";
const Popup = () => {
  return (
    <Box
      sx={{
        width: 405,
        height: 310,
        backgroundColor: "#B91646",
        margin: "0",
        paddingTop: 1,
      }}
    >
      <Main />
    </Box>
  );
};

export default Popup;
