import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { SERVER } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = `${SERVER}register`;

function Registration() {
  const navigate = useNavigate();

  const UserIsRegistered = () =>
    toast.info("Your account have been created", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const errorMessage = (errorMessage) => {
    if (errorMessage === "Please use a unique username") {
      return toast.info("Please use a unique username", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    if (errorMessage === "Email already in use") {
      return toast.info("Email already in use", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      dateOfBirth: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
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
      try {
        await axios.post(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        UserIsRegistered();
        const navigateToHome = () => {
          navigate("/login");
        };
        setTimeout(navigateToHome, 4000);
      } catch (error) {
        errorMessage(error.response.data.msg);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">Username </label>
          <input
            type="text"
            id="userName"
            name="userName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <span>{formik.errors.userName}</span>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}

export default Registration;
