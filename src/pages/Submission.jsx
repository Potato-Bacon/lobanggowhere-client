import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { SERVER } from "../utils/constants";
import axios from "axios";

function Submission() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = SERVER + "/category";
      const data = await axios.get(url);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // const returnTrue = () => {
  //   Yup.dealsCategory === "discount" ? true : false;
  // };

  const today = new Date(Date.now());
  return (
    <>
      <h1>Submission</h1>
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
          submittedBy: "Andy",
          endDate: "",
        }}
        onSubmit={async (values) => {
          const url = SERVER + "/submission";
          console.log(values);
          try {
            await axios.post(url, values);
          } catch (error) {
            error.response.data.msg;
          }
        }}
        validationSchema={Yup.object({
          img: Yup.mixed().required("File is required"),
          title: Yup.string()
            .max(20, "Must be 30 characters or less")
            .min(8, "Must be 8 characters and more")
            .required("Title is required"),
          category: Yup.string().required("Category is required"),
          description: Yup.string().required("Description is required"),
          vendor: Yup.string().required("Vendor is required"),
          onlineAndOrStore: Yup.array()
            .min(1)
            .of(Yup.string().required("Select at least one"))
            .required("Select at least one"),
          url: Yup.string().required("Link is required").url("Link is invalid"),
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
          endDate: Yup.date().min(
            today,
            "Deal must be valid for more than a day"
          ),
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
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Submission</legend>
              <Field type="file" name="img" value={values.img} />
              {errors.img && touched.img && errors.img}
              <br />
              <label>
                Title *
                <Field name="title" value={values.title} />
                {errors.title && touched.title && errors.title}
              </label>
              <label>Select category</label>
              <Field as="select" name="category">
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
              <label>
                Description *
                <textarea
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
              <label>
                Vendor *
                <Field name="vendor" value={values.vendor} />
                {errors.vendor && touched.vendor && errors.vendor}
              </label>
              <br />
              <div role="group" aria-labelledby="checkbox-group">
                <label>
                  <Field
                    type="checkbox"
                    name="onlineAndOrStore"
                    value="inStore"
                  />
                  In-Store
                </label>
                <label>
                  <Field
                    type="checkbox"
                    name="onlineAndOrStore"
                    value="online"
                  />
                  Online
                </label>
                {errors.onlineAndOrStore &&
                  touched.onlineAndOrStore &&
                  errors.onlineAndOrStore}
              </div>
              <br />
              <label>
                Link to source *
                <Field name="url" value={values.url} />
                {errors.url && touched.url && errors.url}
              </label>
              <br />

              {values.category === "6323eba993531f8996098a53" && (
                <>
                  <label>
                    Address*
                    <Field name="address" value={values.address} />
                    {errors.address && touched.address && errors.address}
                  </label>
                </>
              )}

              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="dealsCategory" value="free" />
                  Free
                </label>
                <label>
                  <Field type="radio" name="dealsCategory" value="discounts" />
                  Price Discounts
                </label>
                <label>
                  <Field type="radio" name="dealsCategory" value="custom" />
                  Custom
                </label>
              </div>
              {values.dealsCategory === "discounts" && (
                <>
                  <label>
                    Price Before Discount
                    <Field
                      name="priceBeforeDiscount"
                      value={values.priceBeforeDiscount}
                    />
                  </label>
                  {errors.priceBeforeDiscount &&
                    touched.priceBeforeDiscount &&
                    errors.priceBeforeDiscount}

                  <label>
                    <br />
                    Price After Discount
                    <Field
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
                    <br />
                    Custom
                    <Field name="custom" value={values.custom} />
                  </label>
                  {errors.custom && touched.custom && errors.custom}
                  <br />
                </>
              )}

              <label>
                Start Date
                <Field type="date" name="startDate" value={values.startDate} />
                {errors.startDate && touched.startDate && errors.startDate}
              </label>
              <label>
                End Date
                <Field type="date" name="endDate" value={values.endDate} />
                {errors.endDate && touched.endDate && errors.endDate}
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Submission;
