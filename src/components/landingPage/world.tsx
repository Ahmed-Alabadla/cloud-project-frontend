import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Worldimg } from "../../assets";

export default function World() {
  return (
    <Container>
      <Grid container spacing={2} mt={5} pb={10}>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{
            mt: 5,
            ml: 5,
            "@media (max-width: 600px)": {
              textAlign: "center",
            },
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold", mb: 2, mt: 3 }}
          >
            World-class providers.
            <br />
            Top-notch care.
          </Typography>
          <Typography
            sx={{
              mb: 4,
              mt: 3,
              color: "#90AAB9",
              fontSize: 15,
            }}
          >
            Connect with expert therapists & psychiatric providers
            <br />
            who put you first. Our nationwide network ensures you
            <br />
            receive the best of the best in mental health care.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/therapists"
            sx={{ textDecoration: "none" }}
          >
            Book an appointment
          </Button>
        </Grid>
        <Grid item lg={5} xs={12} sx={{ mt: 5 }}>
          <img src={Worldimg} alt="Worldimg" />
        </Grid>
      </Grid>
    </Container>
  );
}
