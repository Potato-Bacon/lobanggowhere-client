import { Link } from "react-router-dom";

function Watchlist({ select, watchList }) {
  return (
    <>
      {select === "Watchlist" && (
        <>
          <h1>Watch List</h1>
          {watchList?.data?.map((deal) => (
            <Link to={`/deals/${deal._id}`} key={deal._id}>
              <img
                style={{
                  minHeight: "16rem",
                  maxHeight: "16rem",
                  overflow: "hidden",
                  height: "50%",
                  width: "50%",
                }}
                src={deal.img}
                alt="image"
              />
              <div>{deal.title}</div>
            </Link>
          ))}
        </>
      )}
    </>
  );
}

export default Watchlist;
