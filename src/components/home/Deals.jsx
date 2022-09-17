import { v4 as uuidv4 } from "uuid";

const Deals = ({ dealsData }) => {
  return (
    <>
      {/* <div style={{ border: "1px solid black", width: 200, height: 250 }}>
        <img src="" alt="Deal img" />
        <h2>
          Title <span>likes</span>
        </h2>
        <p>description</p>
      </div> */}
      {dealsData.map((x) => (
        <div
          key={uuidv4()}
          style={{ border: "1px solid black", width: 200, height: 250 }}
        >
          {/* <img src={x.url} alt="Deal img" /> */}
          <h3>{x.title}</h3>
          <h3>likes {x.likes}</h3>
          <p>{x.description}</p>
        </div>
      ))}
    </>
  );
};
export default Deals;
