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
      <button onClick={sortPopular}>Popular</button>
      <button onClick={sortTime}>Recent</button>
    </>
  );
};
export default SortButton;
