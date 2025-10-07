import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./classes";

import type { TherapistCardProps } from "./types";

const GridCard = ({ therapist }: TherapistCardProps) => (
  <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="210"
          image={`${therapist.profileImg}?timestamp=${Date.now()}`}
          alt={therapist.user.fullName}
          sx={classes.therapistImage}
        />

        <CardContent sx={{ padding: 0 }}>
          <Typography
            gutterBottom
            component="div"
            sx={classes.DoctorName}
            margin="0"
          >
            {therapist.user.fullName}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {therapist.major.trim().length > 30
              ? `${therapist.major.slice(0, 20)}...`
              : therapist.major}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ fontWeight: "900" }}
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(therapist.hourlyRate)}{" "}
            /hr
          </Typography>
          <Link to={`/therapist/${therapist.id}`}>
            <Button variant="contained" sx={classes.button}>
              View Profile
            </Button>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

export default GridCard;
