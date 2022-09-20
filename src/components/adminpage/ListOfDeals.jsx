import { v4 as uuidv4 } from "uuid";
/* eslint-disable react/prop-types */
const ListOfDeals = ({ render, setSelect }) => {
  return (
    <>
      <h1>list</h1>
      <div style={{ overflow: "scroll", width: "500px" }}>
        <ul>
          {render.map((x) => {
            return (
              <li onClick={() => setSelect(x)} key={uuidv4()}>
                {x.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default ListOfDeals;
