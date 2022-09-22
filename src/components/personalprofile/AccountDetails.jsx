import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { SERVER } from "../../utils/constants";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

function AccountDetails({ select }) {
  const [changePassword, setChangePassword] = useState(false);
  const [msg, setMsg] = useState("");
  const { user } = useContext(AuthContext);

  const handleChangePassword = () => setChangePassword(true);

  const validation = async (values) => {
    const url = SERVER + "/account/verify";
    const userName = user.userName;
    const password = values.currentPassword;

    try {
      const response = await axios.post(url, { userName, password });
      console.log(response.data.msg);
      setMsg("");
      const urlChangePassword = SERVER + "/account/changepassword";
      const newPassword = values.newPassword;
      try {
        const response = await axios.put(urlChangePassword, {
          userName,
          newPassword,
        });
        console.log(response);
        setMsg("Password has been updated!");
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      setMsg("Current Password is incorrect. Please try again.");
    }
  };

  return (
    <>
      {select === "AccountDetails" && (
        <>
          <div className="m-8">
            <h1 className="ml-8 text-2xl">My Account</h1>
            {/* <img
              className="m-8 "
              src="https://i.postimg.cc/rwYDpQd4/Screenshot-2022-09-23-at-12-32-50-AM-removebg-preview.png"
              alt="avatar"
            /> */}
            <ul>
              <li className="m-8 text-xl">
                Username: <span className="ml-3">{user.userName}</span>
              </li>
              <li className="m-8 text-xl">
                My Email Address:
                <span className="ml-3">{user.email}</span>
              </li>
              <li className="m-8 text-xl">
                Birthday:
                <span className="ml-3 text-xl">
                  {dayjs(user.dateOfBirth).format("DD-MMM-YYYY")}
                </span>
              </li>
            </ul>
            <div
              className="m-8 text-xl"
              onClick={handleChangePassword}
              name="changePassword"
            >
              Change Password
              {changePassword && (
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  onSubmit={(values) => {
                    validation(values);
                  }}
                  validationSchema={Yup.object({
                    currentPassword: Yup.string().required("Required"),
                    newPassword: Yup.string()
                      .max(20, "Must be 20 characters or less")
                      .min(8, "Must be at least 8 characters")
                      .required("Required"),
                    confirmPassword: Yup.string()
                      .required("Required")
                      .oneOf(
                        [Yup.ref("newPassword"), null],
                        "Passwords must match"
                      ),
                  })}
                >
                  {({ values, errors, touched, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <label>
                        Current Password
                        <Field
                          className="m-1 mt-8"
                          type="password"
                          name="currentPassword"
                          value={values.currentPassword}
                        />
                        {errors.currentPassword &&
                          touched.currentPassword &&
                          errors.currentPassword}
                      </label>
                      <br />
                      <label>
                        New Password
                        <Field
                          className="mx-8 my-3"
                          type="password"
                          name="newPassword"
                          value={values.newPassword}
                        />
                        {errors.newPassword &&
                          touched.newPassword &&
                          errors.newPassword}
                      </label>
                      <label>
                        <br />
                        Confirm Password
                        <Field
                          className="m-1"
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                        />
                        {errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword}
                      </label>
                      <button
                        className="m-8 btn btn-active btn-secondary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </>
      )}
      <div>{msg}</div>
    </>
  );
}

export default AccountDetails;
