import * as yup from 'yup'

const formSchema = yup.object().shape({
  ingredients: yup
    .string()
    .required("Atleast one ingredient is required"),
  instructions: yup
    .string()
    .required("Atleast one step is required"),
})
 
export default formSchema