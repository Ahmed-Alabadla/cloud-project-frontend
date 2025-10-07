import { useEffect, useMemo, useState } from "react";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "notistack";
import axiosInstance from "../../../utils/apis/axios";
import getTimeRange from "../../../utils/TimeRange";
import type { ElementTimeType } from "./type";

const BookAppointment = ({ formik }: any) => {
  const currentDate = dayjs().format("YYYY-MM-DD").toString();
  const params = useParams();
  const [value, setValue] = useState<Dayjs | null>(dayjs(currentDate));
  const [time, setTime] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        formik.setFieldValue("appointmentId", "");
        const data = await axiosInstance.get(
          `appointments/${params.id}?date=${value?.format("YYYY-MM-DD")}`
        );
        setTime(data.data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch appointments.", { variant: "error" });
      }
    };
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const timeErrorMessage = useMemo(
    () => (time.length === 0 ? "Sorry, no appointments found." : ""),
    [time]
  );
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Book Appointment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              label="select Date"
              onChange={(newValue) => setValue(newValue)}
              value={value}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={time.length ? "Select Time" : timeErrorMessage}
            sx={{
              borderColor: timeErrorMessage ? "red" : "black",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: timeErrorMessage ? "red" : "black",
                },
              },
            }}
            select
            fullWidth
            variant="outlined"
            value={formik.values.appointmentId}
            name="appointmentId"
            error={
              formik.touched.appointmentId &&
              Boolean(formik.errors.appointmentId)
            }
            helperText={
              formik.touched.appointmentId && formik.errors.appointmentId
            }
          >
            {time.map((ele: ElementTimeType) => {
              if (!ele.isAvailable || ele.isBooked) {
                return null;
              }
              const timeRange = getTimeRange(ele.datetime);
              return (
                <MenuItem
                  value={ele.id}
                  key={ele.id}
                  onClick={() => {
                    formik.setFieldValue("appointmentId", ele.id);
                  }}
                >
                  {timeRange.from}-{timeRange.to}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};

export default BookAppointment;
