import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Deals from "../components/home/Deals";
import Search from "../components/home/Search";
import { SERVER } from "../utils/constants";

function Homepage() {
  const [dealsData, setDealsData] = useState([]);
  const fetchDeal = async () => {
    const res = await axios.get(SERVER);
    setDealsData(res.data);
  };
  useEffect(() => {
    fetchDeal();
  }, []);

  return (
    <>
      <h1>Homepage</h1>
      <button onClick={fetchDeal}>clear</button>
      <Search setDealsData={setDealsData} />
      <div style={{ display: "flex" }}>
        <Deals dealsData={dealsData} />
      </div>
    </>
  );
}

export default Homepage;
