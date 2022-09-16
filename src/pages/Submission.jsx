import { Field, Formik } from "formik";
import * as Yup from "yup";

function Submission() {
  const today = new Date(Date.now());
  return (
    <>
      <h1>Submission</h1>
      <Formik
        initialValues={{
          img: "",
          title: "",
          description: "",
          vendor: "",
          onlineAndOrStore: "",
          url: "",
          address: "",
          dealsCategory: false,
          priceBeforeDiscount: "",
          priceAfterDiscount: "",
          custom: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}

        // validationSchema={Yup.object({
        //   img: Yup.mixed().required("File is required"),
        //   title: Yup.string()
        //     .max(20, "Must be 30 characters or less")
        //     .min(8, "Must be 8 characters and more")
        //     .required("Title is required"),
        //   description: Yup.string().required("Description is required"),
        //   vendor: Yup.string().required("Vendor is required"),
        //   onlineAndOrStore: Yup.boolean().oneOf([true], "Select at least one"),
        //   url: Yup.string().required("Link is required").url("Link is invalid"),
        //   dealsCategory: Yup.boolean().oneOf([true], "Select at least one"),
        //   priceBeforeDiscount: Yup.number().required("Price is required"),
        //   priceAfterDiscount: Yup.number().required("Price is required"),
        //   custom: Yup.string().required("Field is required"),
        //   endDate: Yup.date().min(today, "Deal must not end today"),
        // })}
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
              <input
                type="file"
                name="img"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.img}
              />
              {errors.img && touched.img && errors.img}
              <br />
              <label>
                Title
                <input
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {errors.title && touched.title && errors.title}
              </label>
              <label>Select category</label>

              <select name="category">
                <option value="">--Please choose an option--</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
              </select>

              <br />
              <label>
                Description
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
                Vendor
                <input
                  name="vendor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.vendor}
                />
                {errors.vendor && touched.vendor && errors.vendor}
              </label>
              <br />
              {/* <Field as="select" name="onlineAndOrStore">
                <option
                  name=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="inStore"
                >
                  --Please choose an option--
                </option>
                <option
                  name="onlineAndOrStore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="inStore"
                >
                  In-Store
                </option>
                <option
                  name="onlineAndOrStore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="online"
                >
                  Online
                </option>
                <option
                  name="onlineAndOrStore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="both"
                >
                  Both
                </option>
              </Field> */}
              {/* <label>
                In-Store
                <input
                  type="checkbox"
                  name="onlineAndOrStore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.onlineAndOrStore}
                />
                {errors.onlineAndOrStore &&
                  touched.onlineAndOrStore &&
                  errors.onlineAndOrStore}
              </label>
              <label>
                Online
                <input
                  type="checkbox"
                  name="onlineAndOrStore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.onlineAndOrStore}
                />
                {errors.onlineAndOrStore &&
                  touched.onlineAndOrStore &&
                  errors.onlineAndOrStore}
              </label> */}
              <br />
              <label>
                Link to source
                <input
                  name="url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.url}
                />
                {errors.url && touched.url && errors.url}
              </label>
              <br />
              <label>
                {" "}
                Address
                <input
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                {errors.address && touched.address && errors.address}
              </label>
              <label>
                Free
                <input type="radio" name="dealscategory" value="free" />
              </label>
              <label>
                Price Discounts
                <input type="radio" name="dealscategory" value="discounts" />
              </label>
              <label>
                Custom
                <input type="radio" name="dealscategory" value="custom" />
              </label>
              <br />
              <label>
                Start Date
                <input type="date" name="startDate" />
              </label>
              <label>
                End Date
                <input
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.endDate}
                />
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
