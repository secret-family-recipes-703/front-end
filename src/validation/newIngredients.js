import * as yup from 'yup'

const formSchema = yup.object().shape({
  ingredients: yup
    .string()
    .required("Atleast one ingredient is required"),
})
 
export default formSchema