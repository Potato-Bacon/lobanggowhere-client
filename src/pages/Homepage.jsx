import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Deals from "../components/home/Deals";
import { SERVER } from "../utils/constants";

function Homepage() {
  const [dealsData, setDealsData] = useState([]);
  useEffect(() => {
    const fetchDeal = async () => {
      const res = await axios.get(SERVER);
      setDealsData(res.data);
    };
    fetchDeal();
  }, []);
  return (
    <>
      <h1>Homepage</h1>
      <div style={{ display: "flex" }}>
        <Deals dealsData={dealsData} />
      </div>
    </>
  );
}

export default Homepage;
