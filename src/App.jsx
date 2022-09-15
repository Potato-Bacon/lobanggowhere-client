import axios from "axios";

function App() {
  const handleClick = async () => {
    // const url = "http://localhost:3100";
    // const request = await fetch(url);
    // const data = await request.json();
    // console.log(data);

    const url = "http://localhost:3100";
    const response = await axios.get(url);
    console.log(response.data);

    // axios
    //   .get("http://localhost:3100")
    //   .then((response) => console.log(response.data));
  };

  return (
    <div>
      <h1>LobangGoWhere</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
