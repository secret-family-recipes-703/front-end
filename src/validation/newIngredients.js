import * as yup from 'yup'

const formSchema = yup.object().shape({
  ingredients: yup
    .string()
    .min(3, 'ingredient should be atleast 3 characters')
    .required("Atleast one ingredient is required"),
})
 
export default formSchema