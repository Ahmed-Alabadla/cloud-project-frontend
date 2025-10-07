import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { group, online, online2 } from "../../assets";
import { userDataContext } from "../../context";
import { useContext } from "react";

export default function OnlineMedical() {
  const userContext = useContext(userDataContext);

  return (
    <>
      <Container>
        <Grid container spacing={2} mt={5}>
          <Grid item lg={6} xs={12} sx={{ mt: 5 }}>
            <img src={online} alt="online" />
          </Grid>
          <Grid item lg={5} xs={12} sx={{ mt: 5, ml: 5 }}>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2, mt: 3 }}
            >
              DISCOVER YOUR SELF
            </Typography>
            <Typography
              sx={{
                mb: 4,
                mt: 3,
                color: "#90AAB9",
                fontSize: 15,
              }}
            >
              Join us to get good with the tips and support you need to manage
              your memory health and lead a healthy life
            </Typography>
            {!userContext?.userData && (
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "red" }}
              >
                <Button
                  variant="contained"
                  sx={{ borderColor: "primary.main" }}
                >
                  SIGN UP
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={2} mt={5}>
          <Grid item lg={6} xs={12} sx={{ mt: 5, ml: 5 }}>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2, mt: 3 }}
            >
              BE ONE OF THE TEAM
            </Typography>
            <Typography
              sx={{
                mb: 4,
                mt: 3,
                color: "#90AAB9",
                fontSize: 15,
              }}
            >
              Join us for informality, Improving Communication, Enhanced
              Collaboration, and it can also help to Reduce Costs, and Improve
              Client Service.
            </Typography>
            {!userContext?.userData && (
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  variant="contained"
                  sx={{ borderColor: "primary.main" }}
                >
                  JOIN US
                </Button>
              </Link>
            )}
          </Grid>
          <Grid item lg={5} xs={12} sx={{ mt: 5 }}>
            <img src={online2} alt="online" />
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          backgroundColor: "#F4F7FF",
          height: "25rem",
          "@media (max-width: 600px)": {
            height: "50rem",
            textAlign: "center",
          },
        }}
      >
        <Grid container spacing={2} mt={5}>
          <Grid item lg={6} xs={12}>
            <img src={group} alt="group" />
          </Grid>
          <Grid item lg={5} xs={12} sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2, mt: 5 }}
            >
              Come on
              <br />
              book your appointment
            </Typography>
            <Button variant="contained" sx={{ borderColor: "primary.main" }}>
              <Link
                to="/therapists"
                style={{ textDecoration: "none", color: "white" }}
              >
                Discover our therapists
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
