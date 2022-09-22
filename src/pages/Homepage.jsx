import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Deals from "../components/home/Deals";
import Search from "../components/home/Search";
import SortButton from "../components/home/SortPopular";
import { SERVER } from "../utils/constants";
import { useNavigate } from "react-router-dom";

import merlionimage from "/src/images/merlionbay2.png";
import background from "/src/images/pexels-anni-roenkae.jpg";

function Homepage() {
  const [dealsData, setDealsData] = useState([]);
  const fetchDeal = async () => {
    const res = await axios.get(SERVER);
    setDealsData(res.data);
  };
  useEffect(() => {
    fetchDeal();
  }, []);

  const navigate = useNavigate();

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
            <h1
              style={{ fontWeight: "bolder", fontFamily: "ShadowsIntoLight" }}
              className="text-2xl mt-10"
            >
              LobangGoWhere
            </h1>
            <br />
            <h2
              style={{ fontWeight: "bolder", fontFamily: "DancingScript" }}
              className="text-xl font-bold m-2"
            >
              Kiasu best companion
            </h2>
          </div>
        </div>
        <div
          className="-translate-y-10 bg-gradient-to-t from-info to-transparent"
          style={{ width: "100%", height: "5vw" }}
        ></div>
        <div
          className="-translate-y-10 bg-gradient-to-b from-info to-transparent"
          style={{ width: "100%", height: "5vw" }}
        ></div>
        <div
          className=""
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
              gap: "10%",
            }}
          >
            {/* Register card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl h-56 drop-shadow-lg shadow-2xl max-w-xs"
            >
              <h3 className="break-words text-center text-1xl font-sans">
                <section className="font-serif font-bold text-2xl pb-3">
                  Join the lobang squad today!
                </section>
                Register an account to get account privileges, and submit deals
                to help the community!
              </h3>
              <button
                onClick={() => navigate("/register")}
                className="mt-3 inline-block py-1 px-6 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
              >
                Register
              </button>
            </div>
            {/* Search card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "translate(0, -30%)"
              }}
              className="bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl h-56 drop-shadow-lg shadow-2xl max-w-xs"
            >
              <a
                href="#search"
                className="break-words text-center font-serif font-bold text-2xl pb-3 underline text-blue-800"
              >
                Mai tu liao! Wait what come get your best deals here!
              </a>
            </div>
            {/* Submission card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "translate(0, 30%)"
              }}
              className="bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl h-56 drop-shadow-lg shadow-2xl max-w-xs"
            >
              <h3 className="break-words text-center text-1xl font-sans">
                <section className="font-serif font-bold text-2xl pb-3">
                  Share Lobangs!
                </section>
                Got lobang, don't selfish la, come share with everyone!
              </h3>
              <button
                onClick={() => navigate("/submission")}
                className="mt-3 inline-block py-1 px-6 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
              >
                Share Lobang
              </button>
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
      {/* <div className="h-10"></div> */}
      <div id="search" className="flex flex-row justify-center pt-40 pb-10">
        <Search setDealsData={setDealsData} />
        <SortButton dealsData={dealsData} setDealsData={setDealsData} />
        <button
          onClick={fetchDeal}
          className=" ml-1 px-5 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white "
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap justify-center mt-10 pb-20">
        <Deals dealsData={dealsData} />
      </div>
    </div>
  );
}

export default Homepage;
