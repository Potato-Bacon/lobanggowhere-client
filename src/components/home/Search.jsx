import axios from "axios";
import { useFormik } from "formik";
import { SERVER } from "../../utils/constants";

const Search = ({ setDealsData }) => {
  const formik = useFormik({
    initialValues: {
      input: "",
    },
    onSubmit: async (values) => {
      const url = `${SERVER}/${values.input}`;
      try {
        const res = await axios.get(url);
        setDealsData(res.data);
      } catch (error) {
        console.log("do not exist");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="input"></label>
      <input
        id="input"
        name="input"
        type="input"
        onChange={formik.handleChange}
        value={formik.values.input}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
