import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string()
        .test('email-domain', 'Enter a valid email', (value) => {
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
});

export default validationSchema;
