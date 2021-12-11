import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

const OptionHeader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FBF3E4",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              default: { duration: 1 },
              damping: 20,
            }}
            src="logo-48.png"
          />
        </Grid>
        <Grid>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: [0, 5, 0, -5, 0] }}
            transition={{
              delay: 0.3,

              default: { duration: 1 },
            }}
          >
            ALHAIMI: POMODORO TIMER
          </motion.h2>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OptionHeader;
