import { useContext } from "react";
import { ThemeContext } from "../../context";
import { Container, Grid, Typography } from "@mui/material";
import { meet } from "../../assets";

export default function Questions() {
  const themes = useContext(ThemeContext);

  return (
    <Container sx={{
      backgroundColor: themes?.themeMode === 'dark' ? '#181A1B' : '#F4F7FF',
      height: '55rem',
      '@media (max-width: 600px)': {
        height: '95rem',
        textAlign: 'center',
      },
    }}
    >
      <Grid container spacing={2} mt={5}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%',
          }}
        >
          <Typography variant="h5" color="primary" sx={{ mb: 2, mt: 5 }}>
            HOW IT WORKS
          </Typography>
          <Typography sx={{ mb: 4, color: '#90AAB9', fontSize: 12 }}>
            Virtual, dedicated support every step of the way
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12}>
          <img src={meet} alt="meet" style={{ height: '40rem' }} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ fontSize: 20 }}>
              1:1 Video Sessions
            </Typography>
            <Typography sx={{
              mb: 4, color: '#90AAB9', fontSize: 15, mt: 1,
            }}
            >
              Let your provider know how you’re feeling, get to know you,
              <br />
              and provide support.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ fontSize: 20 }}>
              Why Therapy is Important?

            </Typography>
            <Typography sx={{
              mb: 4, color: '#90AAB9', fontSize: 15, mt: 1,
            }}
            >
              Therapy is an essential part of any successful recovery process,
              helping to reduce stress, improve mental health,
              and increase overall wellbeing.
              Learn why therapy is so important and how it can help you reach your goals.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ fontSize: 20 }}>
              Is Therapy Right for You?
            </Typography>
            <Typography sx={{
              mb: 4, color: '#90AAB9', fontSize: 15, mt: 1,
            }}
            >
              Find out the pros and cons of this type of therapy
              to help you decide if its the right fit for you
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ fontSize: 20 }}>
              What are the benefits of therapy?
            </Typography>
            <Typography sx={{
              mb: 4, color: '#90AAB9', fontSize: 15, mt: 1,
            }}
            >
              Therapy can be a powerful tool for improving mental health and wellbeing.
              Discover the many benefits of therapy and how
              it can help you lead a healthier, happier life.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ fontSize: 20 }}>
              Where should therapy be used?
            </Typography>
            <Typography sx={{
              mb: 4, color: '#90AAB9', fontSize: 15, mt: 1,
            }}
            >
              Therapy can be a powerful tool for improving mental health,
              but its important to understand when it should be used.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ fontSize: 20 }}>
              Therapy Impacts on Mental Health
            </Typography>
            <Typography sx={{
              mb: 4, color: '#90AAB9', fontSize: 15, mt: 1,
            }}
            >
              Therapy can have a powerful impact on mental health,
              providing individuals with the tools and support they
              need to manage their mental health and lead a healthier, more fulfilling life.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
