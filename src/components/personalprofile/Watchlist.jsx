import { Link } from "react-router-dom";

function Watchlist({ select, watchList }) {
  return (
    <>
      {select === "Watchlist" && (
        <>
          <div>
            {watchList?.data?.map((deal) => (
              <Link to={`/deals/${deal._id}`} key={deal._id}>
                <div className="font-semibold">{deal.title}</div>
                <img
                  style={{
                    maxHeight: "200px",
                  }}
                  src={deal.img}
                  alt="image"
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Watchlist;
