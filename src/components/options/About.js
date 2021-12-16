import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextArea from "./TextArea";
import Divider from "@mui/material/Divider";
import { pink } from "@mui/material/colors";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

const HEADING_ONE = "What is Pomodor techniuqe ?";
const HEADING_TWO = "What the extension do ?";
const HEADING_THREE = "Support";
const BODY_ONE =
  "The Pomodoro Technique is a time management\
   system that encourages people to work with more\
    efficiny when it comes to time management. It was\
     developed by a University Student AKA Cerillo.\
      Cerillo then decided to study with a timer then\
       he found Tomato (pomodoro in Italian) shaped\
        kitchen timer, and the pomodoro technique was born.";
const BODY_TWO =
  "The Extension will work according to the Pomodoro Technique.\
   All what you need to do is just set the timer and hit start from\
    the extesnion popup. Note: this extension doesn't collect any data\
     and it is completely free.";

const BODY_THREE =
  "If you found any bugs or if you have ideas that could\
 help improve this extension please dont hesitate to contact author!.\
  contact information is listed down below. Also if you liked the extension\
   don't forget to provide good rate and review. Wish to you all the best :)";

const About = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Grid item>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            color: "#FBF3E4",
          }}
        >
          ABOUT
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Container
          sx={{
            backgroundColor: "#FBF3E4",
            borderRadius: 0.5,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 2,
          }}
          maxWidth="xl"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid>
              <TextArea heading={HEADING_ONE} content={BODY_ONE} />
              <Divider variant="middle" />
            </Grid>
            <Grid>
              <TextArea heading={HEADING_TWO} content={BODY_TWO} />
              <Divider variant="middle" />
            </Grid>
            <Grid>
              <TextArea heading={HEADING_THREE} content={BODY_THREE} />
              <Divider variant="middle" />
            </Grid>
            <Grid>
              <Stack direction="row" spacing={4} alignItems="center">
                <Link sx={{ color: pink[500] }} href="#" underline="none">
                  <LinkedInIcon fontSize="large" />
                </Link>
                <Link sx={{ color: pink[500] }} href="#" underline="none">
                  <GitHubIcon fontSize="large" />
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default About;
