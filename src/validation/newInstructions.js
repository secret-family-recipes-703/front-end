import * as yup from 'yup'

const formSchema = yup.object().shape({
  instructions: yup
    .string()
    .min(3, 'Instructions must be atleast 3 characters')
    .required("Atleast one step is required"),
})
 
export default formSchema