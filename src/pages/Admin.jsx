import axios from "axios";
import { useEffect, useState } from "react";
import ApproveDeals from "../components/adminpage/ApproveDeals";
import DeleteDeal from "../components/adminpage/DeleteDeal";
import ListOfDeals from "../components/adminpage/ListOfDeals";
import { SERVER } from "../utils/constants";

function Admin() {
  const [render, setRender] = useState([]);
  const [select, setSelect] = useState({});
  const url = `${SERVER}/admin`;

  useEffect(() => {
    const fetchDeal = async () => {
      const res = await axios.get(url);
      setRender(res.data);
      setSelect(res?.data?.[0]);
    };
    fetchDeal();
  }, []);
  return (
    <>
      <h1>Admin</h1>
      <DeleteDeal setRender={setRender} />
      <ApproveDeals
        select={select}
        setSelect={setSelect}
        setRender={setRender}
        render={render}
      />
      <ListOfDeals setSelect={setSelect} render={render} />
    </>
  );
}

export default Admin;
