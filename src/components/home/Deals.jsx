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
      {dealsData.map((deal) => (
        <div
          onClick={handleClick(deal)}
          key={uuidv4()}
          style={{
            border: "2px solid black",
            width: "24rem",
            height: 250,
          }}
        >
          <img
            style={{
              minHeight: "16rem",
              maxHeight: "16rem",
              overflow: "hidden",
              height: "100%",
              width: "100%",
            }}
            src={deal.img}
            alt="Deal img"
          />
          <h3>{deal.title}</h3>
          <h3>likes {deal.likes}</h3>
          <p>{deal.description}</p>
        </div>
      ))}
    </>
  );
};
export default Deals;
