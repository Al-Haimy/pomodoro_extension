import React from "react";
import Box from "@mui/material/Box";
import OptionHeader from "./Optionheader";

const MainBody = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "blue",
      }}
    >
      <OptionHeader />
    </Box>
  );
};

export default MainBody;
