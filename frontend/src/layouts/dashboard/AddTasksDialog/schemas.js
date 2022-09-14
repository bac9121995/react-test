import * as yup from 'yup';

export const tasksSchema = yup.object().shape({
  name: yup.string().required('This field is required!'),
  description: yup.string().required('This field is required!'),
  type: yup.string().required('This field is required!')
});
