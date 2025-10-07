import * as yup from 'yup';

const ValidationSchema = yup.object({
  appointmentId: yup
    .number()
    .required('Select Time is required'),
});

export default ValidationSchema;
