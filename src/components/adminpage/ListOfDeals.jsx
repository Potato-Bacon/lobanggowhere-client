import { v4 as uuidv4 } from "uuid";
/* eslint-disable react/prop-types */
const ListOfDeals = ({ renderList, setDisplay }) => {
  return (
    <>
      <h1>list</h1>
      <div style={{ overflow: "scroll", width: "500px" }}>
        <ul>
          {renderList.map((x) => {
            return (
              <li onClick={() => setDisplay(x)} key={uuidv4()}>
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
