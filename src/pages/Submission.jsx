import { Formik, Form, Field, ErrorMessage } from "formik";

function Submission() {
  return (
    <>
      <h1>Submission</h1>
      <form>
        <fieldset>
          <legend>Submission</legend>
          <input type="file" />
          <br />
          <label>
            Title
            <input name="title" />
          </label>
          <br />
          <label>
            Description
            <textarea name="description" rows="6" cols="60" />
          </label>
          <br />
          <label>
            Vendor
            <input name="Vendor" />
          </label>
          <br />
          <label>
            In-Store
            <input type="checkbox" name="in-store" />
          </label>
          <label>
            Online
            <input type="checkbox" name="online" />
          </label>
          <br />
          <label>
            Link to source
            <input name="url" />
          </label>
          <br />
          <label>
            {" "}
            Address
            <input name="address" />
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
            <input type="date" name="startdate" />
          </label>
          <label>
            End Date
            <input type="date" name="enddate" />
          </label>
        </fieldset>
        <button>Submit</button>
      </form>
    </>
  );
}

export default Submission;
