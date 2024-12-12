import * as Yup from "yup";

export const PostFormValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("title is required!"),
  description: Yup.string()
    .required("description is required!"),
  tags: Yup.string()
    .required("tags are required!"),
//   selectedFile: Yup.string()
//     .required("selectedFile is required!"),
});