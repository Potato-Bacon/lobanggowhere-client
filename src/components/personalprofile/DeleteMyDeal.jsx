import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { SERVER } from "../../utils/constants";
/* eslint-disable react/prop-types */
const DeleteMyDeal = ({ deal }) => {
  const { setSubmittedDeals } = useContext(AuthContext);
  const deleteDeal = async () => {
    const dealId = deal._id;
    setSubmittedDeals((prev) => {
      return [...prev.filter((x) => x._id !== dealId)];
    });
    console.log(dealId);
    const url = `${SERVER}/account/${dealId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.log("do not exist");
    }
  };
  return (
    <>
      <button onClick={deleteDeal}>delete</button>
    </>
  );
};
export default DeleteMyDeal;
