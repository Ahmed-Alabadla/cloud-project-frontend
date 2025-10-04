import * as yup from 'yup';

const adminSchema = yup.object({
  username: yup
    .string()
    .min(5, 'Username should be at least 5 characters')

    .required('Username is required'),

  password: yup
    .string()
    .min(4, 'Password should at least 4 characters')
    .required('Password is required'),
});

export default adminSchema;
