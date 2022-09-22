import { v4 as uuidv4 } from "uuid";
/* eslint-disable react/prop-types */
const ListOfDeals = ({ renderList, setDisplay }) => {
  return (
    <div className="flex-wrap bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl drop-shadow-lg shadow-2xl ">
      <h1 className="text-xl">List waiting to be approved ...</h1>
      <div className="w-96">
        <ol className="list-decimal ml-3">
          {renderList.map((x) => {
            return (
              <li onClick={() => setDisplay(x)} key={uuidv4()} className="py-1">
                {x.title}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
export default ListOfDeals;
