/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Deals = ({ dealsData }) => {
  let navigate = useNavigate();
  const handleClick = (e) => () => {
    const dealId = e._id;
    navigate(`deals/${dealId}`);
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {dealsData.map((deal) => (
          <div
            onClick={handleClick(deal)}
            key={uuidv4()}
            className=" bg-white bg-opacity-20 backdrop-blur-md
         px-10 py-6 rounded-xl drop-shadow-lg w-96 h-96 mt-10"
          >
            <img
              className="rounded-xl h-full object-fill w-full max-h-72"
              src={deal.img}
              alt="Deal img"
            />
            <h3 className="m-2 truncate text-xl ">{deal.title}</h3>
            <span className="ml-2 pb-2 font-semibold">
              {deal.likes.length} likes
            </span>
          </div>
        ))}
      </div>

      <button
        style={
          {
            // position: "fixed",
            // bottom: 10,
          }
        }
        onClick={() => navigate(`/submission`)}
        className="pb-1 ml-1 inline-block px-5 text-lg font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary fixed bottom-4"
      >
        Share a deal
      </button>
    </>
  );
};
export default Deals;
