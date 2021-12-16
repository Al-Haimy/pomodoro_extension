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
import EmailIcon from "@mui/icons-material/Email";

const HEADING_ONE = "What is Pomodor techniuqe ?";
const HEADING_TWO = "What the extension does ?";
const HEADING_THREE = "Support";
const BODY_ONE =
  "The Pomodoro Technique is a time management system that\
   encourages people to work with more efficiny when it comes\
    to time management.It was created by AKA Cerillo, a university\
     student. Cerillo then began to study with a timer, and the\
      pomodoro technique was formed when he discovered a tomato-shaped\
       kitchen timer (pomodoro in Italian).";
const BODY_TWO =
  "The Pomodoro Technique will be used to run the Extension.\
All you have to do is set the timer and press the start button\
 from the extension window. Note that this addon is absolutely \
 free and does not gather any data.";

const BODY_THREE =
  "Please do not hesitate to contact the author if you find any\
   issues or have suggestions on how to improve this extension!\
    The following is a list of contact information. Also, if you\
     like the extension, please leave a positive rating and review\
     . I wish you the best of luck:)";

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
      <Grid
        item
        xs={12}
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          margin: 3,
        }}
      >
        <Container
          sx={{
            backgroundColor: "#FBF3E4",
            borderRadius: 0.5,
            paddingBottom: 2,
            paddingLeft: 3,
            paddingRight: 3,
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
              <TextArea heading="Contact" content=" " />
              <Stack direction="row" spacing={4} alignItems="center">
                <Link sx={{ color: pink[500] }} href="#" underline="none">
                  <LinkedInIcon
                    sx={{
                      fontSize: 50,
                    }}
                  />
                </Link>
                <Link sx={{ color: pink[500] }} href="#" underline="none">
                  <GitHubIcon
                    sx={{
                      fontSize: 50,
                    }}
                  />
                </Link>
                <Link
                  sx={{ color: pink[500] }}
                  href="mailto:mohammed1alhaimi@gmail.com"
                  underline="none"
                >
                  <EmailIcon
                    sx={{
                      fontSize: 50,
                    }}
                  />
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
