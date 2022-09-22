import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Deals from "../components/home/Deals";
import Search from "../components/home/Search";
import SortButton from "../components/home/SortPopular";
import { SERVER } from "../utils/constants";

import merlionimage from "/src/images/merlionbay2.png";

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
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "65vw",
            backgroundImage: `url("${merlionimage}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            objectFit: "fill",
          }}
        >
          <div
            className="animate-spin-slight flex-wrap bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-full h-56 drop-shadow-lg shadow-2xl"
            style={{ position: "absolute", left: "15%", top: "15%" }}
          >
            <h1 className="text-xl font-extrabold mt-10">LobangGoWhere</h1>
            <br />
            <h2 className="text-l font-bold m-2">Kiasu best companion</h2>
          </div>
        </div>
        <div
          className="-translate-y-10 -z-10 bg-gradient-to-b from-transparent to-primary"
          style={{ width: "100%", height: "5vw" }}
        ></div>
        <div
          className="-translate-y-10 bg-gradient-to-b from-primary to-base-100"
          style={{ width: "100%", height: "5vw" }}
        ></div>
        <div
          className="bg-info"
          style={{
            width: "100%",
            minHeight: "25%",
            transform: "translate(0, -30%)",
          }}
        >
          <div
            className="p-10"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              className="bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl h-56 drop-shadow-lg shadow-2xl"
              style={{}}
            >
              <h3>Join the lobang squad today!</h3>
            </div>
          </div>
          <div
            id="search"
            className=""
            style={{
              width: "100%",
              height: "25%",
            }}
          ></div>
        </div>
      </div>
      <div className="h-10"></div>
      <div className="flex flex-row justify-center">
        <Search setDealsData={setDealsData} />
        <SortButton dealsData={dealsData} setDealsData={setDealsData} />
        <button
          onClick={fetchDeal}
          className=" ml-1 px-5 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-transparent hover:text-primary "
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        <Deals dealsData={dealsData} />
      </div>
    </>
  );
}

export default Homepage;
