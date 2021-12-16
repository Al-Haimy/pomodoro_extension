import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const TextArea = ({ content, heading }) => {
  return (
    <Stack
      sx={{
        marginTop: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{
          textAlign: "center",
        }}
      >
        {heading}
      </Typography>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          fontSize: 18,
          textAlign: "justify",
        }}
      >
        {content}
      </Typography>
    </Stack>
  );
};

export default TextArea;
