/* eslint-disable react/prop-types */
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
    <>
      <form onSubmit={formik.handleSubmit} className="flex">
        <label
          htmlFor="input"
          className="block text-lg font-medium text-gray-700 pr-1"
        ></label>
        <input
          id="input"
          name="input"
          type="input"
          onChange={formik.handleChange}
          value={formik.values.input}
          className="pl-2 w-60  h-8 text-base text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
        />

        <button
          type="submit"
          className=" ml-1 inline-block px-10 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default Search;
