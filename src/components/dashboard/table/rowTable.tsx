import { useState } from "react";
import {
  TableRow,
  TableCell,
  Grid,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

import { AxiosError } from "axios";
import { axiosInstance } from "../../../utils/apis";
import type { Therapist } from "./types";

const RowTable = ({ therapist }: { therapist: Therapist }) => {
  const [active, setActive] = useState<boolean>(therapist.user.isActive);
  const [isLoading, setIsLoading] = useState(false);
  const profileStateHandler = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.patch("/admin/therapists", {
        userId: therapist.userId,
        active: !active,
      });
      setActive(!active);
    } catch (error) {
      const axiosError = error as AxiosError;
      enqueueSnackbar(axiosError.message, { variant: "error" });
    }
    setIsLoading(false);
  };
  return (
    <TableRow key={therapist.userId}>
      <TableCell component="th" scope="row">
        <Grid container alignItems="center">
          <Grid item>
            <Avatar alt="Remy Sharp" src={therapist.profileImg} />
          </Grid>
          <Grid item style={{ marginLeft: "10px" }}>
            <div>
              <Typography sx={{ fontWeight: 600 }} color="primary.dark">
                {therapist?.user?.fullName}
              </Typography>
              <Typography color="primary.main" sx={{ fontSize: "12px" }}>
                {therapist?.major}
              </Typography>
              <Typography color="primary.main" sx={{ fontSize: "12px" }}>
                {therapist?.user?.email}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" href={therapist?.cvLink} target="blank">
          Download
          <FileDownloadIcon />
        </Button>
      </TableCell>
      <TableCell align="center">
        <Typography color="primary.main">
          {active ? "Active" : "In Active"}
        </Typography>
      </TableCell>
      <TableCell align="center" style={{ gap: "3px" }}>
        <LoadingButton
          variant="contained"
          color={active ? "error" : "success"}
          onClick={profileStateHandler}
          loading={isLoading}
        >
          {active ? "deactivate" : "Activate"}
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default RowTable;
