import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import background from "/src/images/pexels-anni-roenkae.jpg";
import { SERVER } from "../utils/constants";
import { toast } from "react-toastify";

const url = `${SERVER}/register`;

function Registration() {
  const navigate = useNavigate();

  const UserIsRegistered = () => toast.info("Your account have been created");

  const errorMessage = (errorMessage) => {
    if (errorMessage === "Please use a unique username") {
      return toast.info("Please use a unique username");
    }
    if (errorMessage === "Email already in use") {
      return toast.info("Email already in use");
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
      console.log(values);
      try {
        await axios.post(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        UserIsRegistered();
        navigate("/login");
      } catch (error) {
        errorMessage(error?.response?.data?.msg);
      }
    },
  });

  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
        minHeight: "95vh",
      }}
    >
      <div className="flex-col flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
        <h1 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
          Welcome to LobangGoWhere 💸
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-black"
            >
              Username{" "}
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              className="pl-2 w-full mt-1 h-8 text-sm text-black bg-white border-black rounded-md shadow-sm"
            />
            {formik.touched.userName && formik.errors.userName ? (
              <span>{formik.errors.userName}</span>
            ) : null}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password{" "}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="pl-2 w-full mt-1 h-8 text-sm text-black bg-white border-black rounded-md shadow-sm"
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
          </div>
          <div className="col-span-6 sm:col-span-3 ">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black"
            >
              Confirm Password{" "}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className=" pl-2 w-full h-8 mt-1 text-sm text-black bg-white border-black rounded-md shadow-sm"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <span>{formik.errors.confirmPassword}</span>
            ) : null}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="pl-2 w-full h-8 mt-1 text-m text-black bg-white border-black rounded-md shadow-sm"
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-black"
            >
              Date of Birth{" "}
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
              className="h-8 px-2"
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <span>{formik.errors.dateOfBirth}</span>
            ) : null}
          </div>
          <div className="col-span-6">
            <label htmlFor="MarketingAccept" className="flex gap-4">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="w-5 h-5 bg-white border-black rounded-md shadow-sm "
              />

              <span className="text-base text-black">
                I want to receive emails about events, product updates and
                company announcements.
              </span>
            </label>
          </div>

          <div className="col-span-6">
            <p className="text-base text-black">
              By creating an account, you agree to our
              <a
                href="#"
                disabled="disabled"
                className="text-black underline px-1"
              >
                terms and conditions
              </a>
              and
              <a
                href="#"
                disabled="disabled"
                className="text-black underline pl-1"
              >
                privacy policy
              </a>
              .
            </p>
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              className="inline-block px-12 py-3 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
            >
              Create an Account
            </button>

            <p className="mt-4 text-sm text-black sm:mt-0">
              Already have an account?
              <Link to="/login" className="text-black underline pl-2">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
