import { useEffect, useState } from "react";

import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import axiosInstance from "../../../utils/apis/axios";
import { headerCell, spinner, container, centerMessage } from "./style";
import type { Appointment, TAppointments } from "./types";
import RowTable from "./tableRow";

const AppointmentsTable = ({ date }: TAppointments) => {
  const [appointments, setAppointments] = useState<null | []>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [errormessage, setErrorMessage] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const utcDate = dayjs(date).format("YYYY-MM-DD").toString();
        setLoading(true);
        setErrorMessage(false);
        const { data } = await axiosInstance(
          `/appointments/${id}?date=${utcDate}`
        );
        setAppointments(data);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        setErrorMessage(true);
        setAppointments([]);
      }
    })();
  }, [date, id]);

  return (
    <TableContainer component={Paper} sx={container}>
      <Table sx={{ minHeight: "400px" }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#516EFF" }}>
          <TableRow>
            <TableCell sx={headerCell}>time</TableCell>
            <TableCell sx={headerCell}>booked</TableCell>
            <TableCell sx={headerCell}>available</TableCell>
            <TableCell sx={headerCell}>unavailable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            margin: "3px",
            position: "relative",
          }}
        >
          {loading && (
            <TableRow sx={spinner}>
              <CircularProgress />
            </TableRow>
          )}
          {!loading &&
            appointments &&
            appointments?.map((appointment: Appointment) => (
              <RowTable key={appointment.id} appointment={appointment} />
            ))}
          {!loading && appointments?.length === 0 && (
            <TableRow sx={centerMessage}>
              <Alert severity="info"> No appointments found</Alert>
            </TableRow>
          )}
          {errormessage && (
            <TableRow sx={centerMessage}>
              <Alert severity="error">Please Check Your Connection</Alert>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
