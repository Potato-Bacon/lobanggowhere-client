/* eslint-disable react/prop-types */
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { SERVER } from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";

const DeleteDeal = ({ setRenderList }) => {
  const [renderDelete, setRenderDeal] = useState([]);
  const formik = useFormik({
    initialValues: {
      input: "",
    },
    onSubmit: async (values) => {
      const value = values.input;
      const url = `${SERVER}/admin/delete/${value}`;
      try {
        const res = await axios.get(url);
        setRenderDeal(res.data);
      } catch (error) {
        console.log("do not exist");
      }
    },
  });
  const confirmDelete = (selectedDealId) => async () => {
    setRenderDeal((prev) => {
      return [...prev.filter((x) => x._id !== selectedDealId)];
    });

    setRenderList((prev) => {
      return [...prev.filter((x) => x._id !== selectedDealId)];
    });
    const url = `${SERVER}/admin/${selectedDealId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.log("do not exist");
    }
  };
  return (
    <>
      <div className="flex-wrap px-8 py-6  mb-8  shadow-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl drop-shadow-lg">
        <h1 className="text-xl">Delete Deals by title ...</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex py-2">
            <label
              htmlFor="input"
              className="block text-lg font-medium text-gray-700"
            ></label>
            <input
              id="input"
              name="input"
              type="input"
              onChange={formik.handleChange}
              value={formik.values.input}
              className="pl-2 w-full  h-8 text-base text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
            />

            <button
              type="submit"
              className=" ml-1 inline-block px-10 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
            >
              Search
            </button>
          </div>
        </form>
        <div>
          <ol className="list-decimal ml-3">
            {renderDelete.map((x) => {
              return (
                <li key={uuidv4()}>
                  {x.title}
                  <br />
                  <span>Submitted by: {x.submittedBy} </span>
                  <button onClick={confirmDelete(x._id)}>🗑️</button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default DeleteDeal;
