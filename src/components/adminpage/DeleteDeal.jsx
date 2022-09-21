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
      <div style={{ overflow: "scroll", width: "500px" }}>
        <ul>
          {renderDelete.map((x) => {
            return (
              <li key={uuidv4()}>
                {x.title} <span>Submitted by: {x.submittedBy} </span>
                <button onClick={confirmDelete(x._id)}>Delete Deal</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DeleteDeal;
