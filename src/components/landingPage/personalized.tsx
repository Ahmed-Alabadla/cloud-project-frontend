import { Container, Grid, Typography } from "@mui/material";

export default function Personalized() {
  return (
    <Container>
      <Grid container spacing={2} mt={5}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="h5" color="primary" sx={{ mb: 2, mt: 5 }}>
            86% of our members get better within 12 weeks
          </Typography>
          <Typography sx={{ mb: 4, color: "#90AAB9", fontSize: 16 }}>
            Our providers take a hands-on approach to help you see improvement
            at every step,
            <br />
            no matter how severe your symptoms. Just come as you are and let us
            take it from there.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
