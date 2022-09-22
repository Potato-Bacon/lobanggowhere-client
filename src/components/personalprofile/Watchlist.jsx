/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Watchlist({ select, watchList }) {
  return (
    <>
      {select === "Watchlist" && (
        <>
          <div className="grid grid-cols-2 gap-10 ml-8 ">
            {watchList?.data?.map((deal) => (
              <div
                key={uuidv4()}
                className="bg-white bg-opacity-20 backdrop-blur-md px-10 py-6 rounded-xl drop-shadow-lg flex items-center justify-center"
              >
                <Link to={`/deals/${deal._id}`} key={deal._id}>
                  <h1 className="font-semibold text-center">{deal.title}</h1>
                  <img
                    className="rounded-lg my-3"
                    style={{
                      maxHeight: "200px",
                    }}
                    src={deal.img}
                    alt="image"
                  />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Watchlist;
