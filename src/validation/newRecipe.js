import * as yup from 'yup'

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be atleast 3 character")
    .required("A name for your recipe is required"),
  source: yup
    .string()
    .min(3, "Source must be longer than 3 character")
    .required("Image source is required"),
  imageURL: yup
  .string()
  .url('Must be a valid url'),  
  category: yup 
    .string()
    .oneOf(['pizza', 'lame'], 'Must choose a valid category')
})
 
export default formSchema