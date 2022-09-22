/* eslint-disable react/prop-types */
const SortButton = ({ dealsData, setDealsData }) => {
  const sortPopular = () => {
    const descending = dealsData.sort(
      (a, b) => b.likes.length - a.likes.length
    );
    setDealsData([...descending]);
  };
  const sortTime = () => {
    const sortByDescending = dealsData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setDealsData([...sortByDescending]);
  };
  return (
    <>
      <button
        className=" ml-1 inline-block px-5 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
        onClick={sortPopular}
      >
        Popular
      </button>

      <button
        onClick={sortTime}
        className=" ml-1 inline-block px-5
         text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
      >
        Recent
      </button>
    </>
  );
};
export default SortButton;
