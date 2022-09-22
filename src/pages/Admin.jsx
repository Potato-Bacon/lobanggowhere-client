import axios from "axios";
import { useEffect, useState } from "react";
import ApproveDeals from "../components/adminpage/ApproveDeals";
import DeleteDeal from "../components/adminpage/DeleteDeal";
import ListOfDeals from "../components/adminpage/ListOfDeals";
import { SERVER } from "../utils/constants";

function Admin() {
  const [renderList, setRenderList] = useState([]);
  const [display, setDisplay] = useState({});
  const url = `${SERVER}/admin`;

  useEffect(() => {
    const fetchDeal = async () => {
      const res = await axios.get(url);
      setRenderList(res.data);
      setDisplay(res?.data?.[0]);
    };
    fetchDeal();
  }, []);
  return (
    <>
      <div className="flex bg-primary items-start justify-evenly">
        <ApproveDeals
          display={display}
          setDisplay={setDisplay}
          setRenderList={setRenderList}
          renderList={renderList}
        />
        <div className="flex-col">
          <DeleteDeal setRenderList={setRenderList} />
          <ListOfDeals setDisplay={setDisplay} renderList={renderList} />
        </div>
      </div>
    </>
  );
}

export default Admin;
