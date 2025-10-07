import * as yup from 'yup';

const validationSchema = yup.object({
  date: yup.object({

    from: yup.date()
      .typeError('Date is not a valid value')
      .required('From date is required'),
    to: yup.date()
      .typeError('Date is not a valid value')

      .required('To date is required'),
  }),
  time: yup
    .array()
    .of(
      yup.object({
        from: yup.date()
          .typeError('Date is not a valid value')
          .required('From time is required'),
        to: yup.date()
          .typeError('Date is not a valid value')
          .required('To time is required'),
      }),
    )
    .min(1, 'ar lets one time filed required')
    .required('Time array is required'),
});

export default validationSchema;
