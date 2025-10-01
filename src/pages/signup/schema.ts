import * as yup from 'yup';

const validationSchema = yup.object({
  role: yup.string().required('Role is required'),
  username: yup
    .string()
    .min(3, 'Full name should be of minimum 3 characters length')
    .required('Full Name is required'),
  email: yup
    .string().email('Enter a valid email')
    .test('email-domain', 'Enter a valid email only Gmail Supported', (value) => {
      if (!value) return false;
      const emailParts = value.split('@');
      const domain = emailParts[emailParts.length - 1];
      return domain === 'gmail.com';
    })
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  major: yup
    .string()
    .when('role', {
      is: 'therapist',
      then: (schema) => schema.required('Major is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  hourlyRate: yup
    .number()
    .when('role', {
      is: 'therapist',
      then: (schema) => schema.required('Hourly Rate is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  cv: yup
    .mixed()
    .when('role', {
      is: 'therapist',
      then: (schema) => schema.required('CV is required')
        .test('fileSize', 'File Size is too large', (value) => {
          if (!value) return false;
          if (value instanceof File) {
            return value.size <= 2000000;
          }
          return true;
        })
        .test('fileType', 'Unsupported File Format', (value) => {
          if (!value) return false;
          if (value instanceof File) {
            return ['application/pdf'].includes(value.type);
          }
          return true;
        }),
      otherwise: (schema) => schema.notRequired(),
    }),
  image: yup
    .mixed()
    .when('role', {
      is: 'therapist',
      then: (schema) => schema.required('Image is required')
        .test('fileSize', 'File Size is too large', (value) => {
          if (!value) return false;
          if (value instanceof File) {
            return value.size <= 2000000;
          }
          return true;
        })
        .test('fileType', 'Unsupported File Format', (value) => {
          if (!value) return false;
          if (value instanceof File) {
            return ['image/jpeg', 'image/png'].includes(value.type);
          }
          return true;
        }),
      otherwise: (schema) => schema.notRequired(),
    }),
  phoneNumber: yup
    .string()
    .when('role', {
      is: 'therapist',
      then: (schema) => schema.required('Phone Number is required'),
      otherwise: (schema) => schema.notRequired(),
    }),

});

export default validationSchema;
