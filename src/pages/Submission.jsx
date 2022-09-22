import { Field, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { SERVER } from "../utils/constants";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import background from "/src/images/pexels-anni-roenkae.jpg";

function Submission() {
  const [categories, setCategories] = useState([]);
  const { user, setSubmittedDeals } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const url = SERVER + "/category";
      const data = await axios.get(url);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const userName = user.userName;
  // const returnTrue = () => {
  //   Yup.dealsCategory === "discount" ? true : false;
  // };

  const today = new Date(Date.now());
  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="my-10 bg-white bg-opacity-20 backdrop-blur-md px-12 py-6 rounded-xl drop-shadow-lg shadow-2xl">
          <h1
            style={{ fontFamily: "ShadowsIntoLight" }}
            className="text-center font-serif font-bold text-3xl pb-3"
          >
            Submission
          </h1>
          <Formik
            initialValues={{
              img: "",
              title: "",
              category: "",
              description: "",
              vendor: "",
              onlineAndOrStore: "",
              url: "",
              address: "",
              dealsCategory: "",
              priceBeforeDiscount: "",
              priceAfterDiscount: "",
              custom: "",
              startDate: "",
              submittedBy: userName,
              endDate: "",
            }}
            onSubmit={async (values) => {
              const url = SERVER + "/submission";
              try {
                const response = await axios.post(url, values);
                const test = response.data;
                setSubmittedDeals((prev) => [...prev, test]);
                const dealsID = response.data._id;
                console.log(response.data._id);
                try {
                  console.log("begin update submission to user");
                  console.log(dealsID, "this is dealsID");
                  console.log(userName, "this is userName");
                  const updateUserSubmissionsUrl = SERVER + "/account/deals";
                  const response = await axios.put(updateUserSubmissionsUrl, {
                    dealsID,
                    userName,
                  });
                  console.log("updated deal submission to user %o", response);
                  toast.success("Submitted!");

                  navigate(`/`);
                } catch (error) {
                  console.log(error.response);
                }
              } catch (error) {
                error.response.data.msg;
              }
            }}
            validationSchema={Yup.object({
              img: Yup.string().required("Required").url("Link is invalid"),
              // img: Yup.mixed().required("File is required"),
              title: Yup.string()
                .min(8, "Must be 8 characters and more")
                .required("Title is required"),
              category: Yup.string().required("Category is required"),
              description: Yup.string().required("Description is required"),
              vendor: Yup.string().required("Vendor is required"),
              onlineAndOrStore: Yup.array()
                .min(1)
                .of(Yup.string().required("Select at least one"))
                .required("Select at least one"),
              url: Yup.string()
                .required("Link is required")
                .url("Link is invalid"),
              address: Yup.string().when("category", {
                is: (value) => value && value === "6323eba993531f8996098a53",
                then: Yup.string().required("Address is required"),
              }),
              dealsCategory: Yup.string().required("Please select one"),
              priceBeforeDiscount: Yup.number().when("dealsCategory", {
                is: (value) => value && value === "discounts",
                then: Yup.number().required("Price is required"),
              }),
              priceAfterDiscount: Yup.number().when("dealsCategory", {
                is: (value) => value && value === "discounts",
                then: Yup.number().required("Price is required"),
              }),
              custom: Yup.string().when("dealsCategory", {
                is: (value) => value && value === "custom",
                then: Yup.string().required("Please fill in details"),
              }),
              endDate: Yup.date()
                .min(today, "Deal must be valid for more than a day")
                .required("Required"),
            })}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className="flex justify-center" onSubmit={handleSubmit}>
                <div>
                  <div>
                    <fieldset>
                      <label className="font-serif font-bold">
                        Image URL
                        <br />
                        <Field
                          className="w-1/4 mb-3 mr-3"
                          type="name"
                          name="img"
                          value={values.img}
                        />
                      </label>
                      {errors.img && touched.img && errors.img}
                      <br />
                      <label className="font-serif font-bold">
                        Title *
                        <br />
                        <Field
                          className="w-1/4 mb-3 mr-3"
                          name="title"
                          value={values.title}
                        />
                        {errors.title && touched.title && errors.title}
                      </label>
                      <br />
                      <label className="font-serif font-bold">
                        Select category
                      </label>{" "}
                      <br />
                      <Field className="mb-3 mr-3" as="select" name="category">
                        <option value="">--Please choose an option--</option>
                        {categories?.data?.map((category) => (
                          <option key={category?._id} value={category?._id}>
                            {category?.classification}
                          </option>
                        ))}
                        {/* {Unable to get error message to work} */}
                      </Field>
                      {errors.category && touched.category && errors.category}
                      <br />
                      <label className="font-serif font-bold">
                        Description * <br />
                        <textarea
                          className="mb-3"
                          name="description"
                          rows="6"
                          cols="60"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                        {errors.description &&
                          touched.description &&
                          errors.description}
                      </label>
                      <br />
                      <label className="font-serif font-bold">
                        Vendor * <br />
                        <Field
                          className="w-1/4 mb-3 mr-3"
                          name="vendor"
                          value={values.vendor}
                        />
                        {errors.vendor && touched.vendor && errors.vendor}
                      </label>
                      <br />
                      <div
                        className="mt-3"
                        role="group"
                        aria-labelledby="checkbox-group"
                      >
                        <label className="mr-4">
                          <Field
                            type="checkbox"
                            name="onlineAndOrStore"
                            value="inStore"
                          />
                          <span className="ml-2 font-serif font-bold text-base">
                            In-Store
                          </span>
                        </label>
                        <label className="ml-4">
                          <Field
                            type="checkbox"
                            name="onlineAndOrStore"
                            value="online"
                          />
                          <span className="ml-2 font-serif font-bold text-base">
                            Online
                          </span>
                        </label>
                        {errors.onlineAndOrStore &&
                          touched.onlineAndOrStore &&
                          errors.onlineAndOrStore}
                      </div>
                      <br />
                      <label className="font-serif font-bold text-base">
                        Link to source * <br />
                        <Field
                          className="w-1/4 mb-3 mr-3"
                          name="url"
                          value={values.url}
                        />
                        {errors.url && touched.url && errors.url}
                      </label>
                      <br />
                      {values.category === "6323eba993531f8996098a53" && (
                        <>
                          <label className="font-serif font-bold text-base">
                            Address* <br />
                            <Field name="address" value={values.address} />
                            {errors.address &&
                              touched.address &&
                              errors.address}
                          </label>
                        </>
                      )}
                      <div
                        className="my-3"
                        role="group"
                        aria-labelledby="my-radio-group"
                      >
                        <div className="flex space-around">
                          <label>
                            <Field
                              type="radio"
                              name="dealsCategory"
                              value="free"
                            />
                            <span className="ml-2 mr-4 font-serif font-bold text-base">
                              Free
                            </span>
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="dealsCategory"
                              value="discounts"
                            />
                            <span className="ml-2 mr-4 font-serif font-bold text-base">
                              Price Discounts
                            </span>
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="dealsCategory"
                              value="custom"
                            />
                            <span className="ml-2 mr-4 font-serif font-bold text-base">
                              Custom
                            </span>
                          </label>
                        </div>
                      </div>
                      {values.dealsCategory === "discounts" && (
                        <>
                          <label className="font-serif font-bold text-base">
                            Price Before Discount <br />
                            <Field
                              className="w-1/4 my-3"
                              name="priceBeforeDiscount"
                              value={values.priceBeforeDiscount}
                            />
                          </label>
                          {errors.priceBeforeDiscount &&
                            touched.priceBeforeDiscount &&
                            errors.priceBeforeDiscount}

                          <label className="font-serif font-bold text-base">
                            <br />
                            Price After Discount <br />
                            <Field
                              className="w-1/4 my-3"
                              name="priceAfterDiscount"
                              value={values.priceAfterDiscount}
                            />
                          </label>
                          {errors.priceAfterDiscount &&
                            touched.priceAfterDiscount &&
                            errors.priceAfterDiscount}
                          <br />
                        </>
                      )}
                      {values.dealsCategory === "custom" && (
                        <>
                          <label>
                            Custom
                            <br />
                            <Field
                              className="w-1/4"
                              name="custom"
                              value={values.custom}
                            />
                          </label>
                          {errors.custom && touched.custom && errors.custom}
                          <br />
                        </>
                      )}
                      <div className="flex my-3">
                        <label className="font-serif font-bold text-base">
                          Start Date <br />
                          <Field
                            type="date"
                            name="startDate"
                            value={values.startDate}
                          />
                          {errors.startDate &&
                            touched.startDate &&
                            errors.startDate}
                        </label>
                        <br />
                        <label className="ml-8 font-serif font-bold text-base">
                          End Date * <br />
                          <Field
                            className="mr-3"
                            type="date"
                            name="endDate"
                            value={values.endDate}
                          />
                          {errors.endDate && touched.endDate && errors.endDate}
                        </label>
                      </div>
                    </fieldset>
                    <br />
                  </div>
                  <button
                    className="inline-block px-12 py-3 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Submission;
