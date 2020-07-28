import * as yup from 'yup'

const formSchema = yup.object().shape({
  instructions: yup
    .string()
    .required("Atleast one step is required"),
})
 
export default formSchema