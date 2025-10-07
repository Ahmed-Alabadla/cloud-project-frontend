import { type SyntheticEvent, useState } from 'react';
import { CircularProgress, Container } from '@mui/material';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { axiosInstance } from '../../utils/apis';

const CheckoutForm = ({ id, setOpen }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModelAfterSuccessful = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        await axiosInstance.post('/session', {
          appointmentId: id,
        });
        enqueueSnackbar('Payment succeeded 🔥', { variant: 'success' });
        handleCloseModelAfterSuccessful();
      } else {
        throw new Error('Payment was not successful.');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      enqueueSnackbar(axiosError.message || 'An error occurred while confirming the payment.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" />
      <Container sx={{
        position: 'relative', display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end',
      }}
      >
        <Button
          sx={{
            mt: 3,
            position: 'absolute',
            bottom: '-60px',
            right: '10px',
          }}
          variant="contained"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          type="submit"
        >

          {isLoading
            ? (
              <div className="spinner" id="spinner">
                <CircularProgress size={20} />
              </div>
            )
            : 'Book'}
        </Button>
      </Container>
    </form>
  );
};

export default CheckoutForm;
