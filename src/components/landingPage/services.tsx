import { Container, Typography, Grid, Avatar } from "@mui/material";
import { icon1, icon2, icon3, icon4 } from "../../assets";

export default function Services() {
  return (
    <Container>
      <Grid container spacing={2} mt={5}>
        <Grid item lg={6} md={6} xs={12} sx={{ mt: 5 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Avatar alt="icon" src={icon1} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
                color="primary.main"
              >
                Appointments in as little as 24 hrs
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: "#90AAB9", fontSize: 14 }}
              >
                We offer care for mild to severe depression, anxiety, and more —
                including Crisis Care for individuals with
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} xs={12} sx={{ mt: 5 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Avatar alt="icon" src={icon2} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
                color="primary.main"
              >
                1:1 support from start to finish{" "}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: "#90AAB9", fontSize: 14 }}
              >
                We offer care for mild to severe depression, anxiety, and more —
                including Crisis Care for individuals with
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} xs={12} sx={{ mt: 5 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Avatar alt="icon" src={icon3} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
                color="primary.main"
              >
                Care for even the most severe cases
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: "#90AAB9", fontSize: 14 }}
              >
                We offer care for mild to severe depression, anxiety, and more —
                including Crisis Care for individuals with
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} xs={12} sx={{ mt: 5 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Avatar alt="icon" src={icon4} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
                color="primary.main"
              >
                Personalized plans unique to you
              </Typography>
              <Typography
                variant="body2"
                color="primary.main"
                sx={{ mb: 4, color: "#90AAB9", fontSize: 14 }}
              >
                We offer care for mild to severe depression, anxiety, and more —
                including Crisis Care for individuals with
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
