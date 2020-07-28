import * as yup from 'yup'

const formSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be atleast 3 character")
    .required("A title for your recipe is required"),
  source: yup
    .string()
    .required("Image source is required"),
//   ingredients: yup
//     .string()
//     .required("Ingredients are required"),
//   instructions: yup
//     .string(),
    // .required('Instructions for your recipe is required'),
  category: yup 
    .string()
    // .oneOf('pizza', 'lame')
})
 
export default formSchema