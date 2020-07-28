import * as yup from 'yup'

const formSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be atleast 3 character")
    .required("A title for your recipe is required"),
  source: yup
    .string()
    .required("Image source is required"),
  src: yup
  .string(),  
  category: yup 
    .string()
    // .oneOf('pizza', 'lame')
})
 
export default formSchema