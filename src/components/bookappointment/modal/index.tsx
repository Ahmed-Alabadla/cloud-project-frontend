import { Close } from "@mui/icons-material";
import {
  CssBaseline,
  Container,
  Paper,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Modal,
} from "@mui/material";
import * as React from "react";
import { type FormikProps, useFormik } from "formik";
import { ModelStyle } from "../../../pages";
import BookAppointment from "../selectTime";
import StripePaymentForm from "../payment";
import ValidationSchema from "./validation";
import buttonStyle from "./classes";

const steps = ["select appointment", "Payment details"];
interface IBookAppointment {
  appointmentId: string;
}
interface StepComponentProps {
  step: number;
  formik: FormikProps<IBookAppointment>;
  hourlyRate: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SessionReservationModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hourlyRate: number;
}

const StepComponent: React.FC<StepComponentProps> = ({
  step,
  formik,
  hourlyRate,
  setOpen,
}) => {
  switch (step) {
    case 0:
      return <BookAppointment formik={formik} />;
    case 1:
      return (
        <StripePaymentForm
          formik={formik}
          hourlyRate={hourlyRate}
          setOpen={setOpen}
        />
      );
    default:
      return null;
  }
};
const SessionReservationModal: React.FC<SessionReservationModalProps> = ({
  open,
  setOpen,
  hourlyRate,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      appointmentId: "",
    },
    validateOnMount: true,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={ModelStyle}
    >
      <>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              sx={{
                ml: "90%",
              }}
            >
              <Close />
            </IconButton>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <>
              <StepComponent
                step={activeStep}
                formik={formik}
                hourlyRate={hourlyRate}
                setOpen={setOpen}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={buttonStyle}>
                    Back
                  </Button>
                )}
                {activeStep === 0 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={!formik.isValid}
                  >
                    next
                  </Button>
                )}
              </Box>
            </>
          </Paper>
        </Container>
      </>
    </Modal>
  );
};
export default SessionReservationModal;
