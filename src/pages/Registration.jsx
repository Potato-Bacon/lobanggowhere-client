import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;
const url = `${SERVER}register`;

function Registration() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      dateOfBirth: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      email: Yup.string().email("Invalid email address").required("Required"),
      dateOfBirth: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      console.log(url);
      try {
        const res = await axios.post(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(values);
        console.log(res);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <span>{formik.errors.username}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span>{formik.errors.confirmPassword}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <span>{formik.errors.dateOfBirth}</span>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Registration;
