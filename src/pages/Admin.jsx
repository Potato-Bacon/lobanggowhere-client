import axios from "axios";
import { useEffect, useState } from "react";
import ApproveDeals from "../components/adminpage/ApproveDeals";
import DeleteDeal from "../components/adminpage/DeleteDeal";
import ListOfDeals from "../components/adminpage/ListOfDeals";
import { SERVER } from "../utils/constants";
import background from "/src/images/pexels-anni-roenkae.jpg";

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
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
        minHeight: "95vh",
      }}
    >
      <div className="flex items-start justify-evenly">
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
    </div>
  );
}

export default Admin;
