import { type Dispatch, type SetStateAction, useState } from 'react';
import {
  Box, Grid, Modal, Fade, Button, Typography, Container,
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type FormikErrors, useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import validationSchema from './schema';
import classes from './classes';
import { axiosInstance } from '../../utils/apis';

interface Props {
  handleClose: () => void;
  open: boolean;
  setOpenAppointmentsModal: Dispatch<SetStateAction<boolean>>;
}

const AppointmentsModal = ({ handleClose, open, setOpenAppointmentsModal }: Props) => {
  const [timeInput, setTimeInput] = useState([1]);

  const addInput = () => {
    setTimeInput((prev) => ([...prev, prev.length + 1]));
  };

  const handleCloseAppointmentsModal = () => {
    setOpenAppointmentsModal(false);
  };

  const formik = useFormik({
    initialValues: {
      date: {
        from: '',
        to: '',
      },
      time: [{
        from: '',
        to: '',
      }],
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: async (values) => {
      const { from: dateFrom, to: dateTo }: any = values.date;

      const date = {
        from: moment(dateFrom?.$d).format('YYYY-MM-DD'),
        to: moment(dateTo.$d).format('YYYY-MM-DD'),
      };
      const time = values.time.map(({ from, to }: any) => ({
        from: moment(from?.$d).utc().format('HH:mm'),
        to: moment(to?.$d).utc().format('HH:mm'),
      }));

      const updatedValues = { date, time };
      try {
        await axiosInstance.post('/appointments', updatedValues);
        enqueueSnackbar('Successfully added an appointment', { variant: 'success' });
        handleCloseAppointmentsModal();
      } catch (error) {
        const axiosError = error as AxiosError;
        enqueueSnackbar(axiosError.message, { variant: 'error' });
      }
    },
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition

    >
      <Fade in={open}>
        <Box sx={classes.Model} component="form" onSubmit={formik.handleSubmit}>
          <Typography component="b">Choose Your Availability Times </Typography>
          <Typography id="transition-modal-title" variant="body1" component="p" sx={{ margin: '5px', fontSize: '12px' }}>Flexibly select and schedule preferred time slots for availability.</Typography>
          <Typography id="transition-modal-title" variant="body1" component="p" color="error" sx={{ margin: '5px', fontSize: '10px' }}>*selected times will be added as records of one-hour available sessions</Typography>
          <Container>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Box sx={{ overflow: 'auto', height: '300px', py: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="From"
                        format="DD-MM-YYYY"
                        disablePast
                        maxDate={formik.values.date.to}
                        value={formik.values.date.from}
                        onChange={(value) => formik.setFieldValue('date.from', value)}
                        slotProps={{
                          textField: {
                            helperText: formik.touched?.date?.from && formik.errors?.date?.from,
                            error: Boolean(formik.touched?.date?.from)
                              && Boolean(formik.errors?.date?.from),
                            size: 'small',
                            onBlur: formik.handleBlur,
                            name: 'date.from',
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="To"
                        format="DD-MM-YYYY"
                        disablePast
                        value={formik.values.date.to}
                        minDate={formik.values.date.from}
                        onChange={(value) => formik.setFieldValue('date.to', value)}
                        slotProps={{
                          textField: {
                            helperText: formik.touched?.date?.to && formik.errors?.date?.to,
                            error: Boolean(formik.touched?.date?.to)
                              && Boolean(formik.errors?.date?.to),
                            size: 'small',
                            onBlur: formik.handleBlur,
                            name: 'date.to',

                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  {timeInput.map((item) => (
                    <div key={item + 1}>

                      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>

                        <Grid item xs={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              label="From"
                              value={formik.values.time?.[item - 1]?.from || ''}
                              onChange={(value) => formik.setFieldValue(`time.${[item - 1]}.from`, value)}
                              slotProps={{
                                textField: {
                                  size: 'small',
                                  name: `time.${[item - 1]}.from`,
                                  helperText: (formik.touched?.time?.[item - 1]?.from
                                    && (formik.errors.time?.[item - 1] as
                                      FormikErrors<{ from: string, to: string }>)?.from),
                                  error: Boolean(formik.touched?.time?.[item - 1]?.from)
                                    && Boolean((formik.errors?.time?.[item - 1] as
                                      FormikErrors<{ from: string; to: string; }>)?.from),
                                  onBlur: formik.handleBlur,

                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={timeInput.length === 1 ? 6 : 5}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              label="to"
                              minTime={formik.values.time?.[item - 1]?.from || moment()}
                              value={formik.values.time?.[item - 1]?.to || ''}
                              onChange={(value) => formik.setFieldValue(`time.${[item - 1]}.to`, value)}
                              slotProps={{
                                textField: {
                                  size: 'small',
                                  name: `time.${[item - 1]}.to`,

                                  helperText: (formik.touched?.time?.[item - 1]?.to
                                    && (formik.errors.time?.[item - 1] as
                                      FormikErrors<{ from: string, to: string }>)?.to),
                                  error: Boolean(formik.touched?.time?.[item - 1]?.to)
                                    && Boolean((formik.errors?.time?.[item - 1] as
                                      FormikErrors<{ from: string; to: string; }>)?.to),
                                  onBlur: formik.handleBlur,
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        {timeInput.length > 1 && (

                          <Grid item xs={1}>
                            <DeleteIcon
                              type="button"
                              onClick={() => {
                                if (timeInput.length === 1) {
                                  return;
                                }
                                const filteredInputs = timeInput.filter((ele) => ele !== item);
                                setTimeInput(filteredInputs);
                              }}
                              sx={classes.Icon}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ width: '100%', marginTop: '3rem' }}
                    onClick={addInput}
                  >
                    Add New Time
                  </Button>

                </Grid>
              </Box>
              <Grid item xs={6} sx={{ textAlign: 'end' }}>
                <Button variant="outlined" size="large" sx={{ width: '100%' }} onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: '100%' }}
                  disabled={!formik.isValid}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AppointmentsModal;
