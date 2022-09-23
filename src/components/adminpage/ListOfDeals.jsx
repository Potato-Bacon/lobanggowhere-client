import { v4 as uuidv4 } from "uuid";
/* eslint-disable react/prop-types */
const ListOfDeals = ({ renderList, setDisplay }) => {
  return (
    <div className="flex-wrap  px-8 py-6   shadow-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl drop-shadow-lg">
      <h1 className="text-xl font-serif font-bold">List waiting to be approved ...</h1>
      <div className="w-96">
        <ol className="list-decimal ml-3">
          {renderList.map((x) => {
            return (
              <li onClick={() => setDisplay(x)} key={uuidv4()} className="py-1 font-serif underline font-semibold">
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
