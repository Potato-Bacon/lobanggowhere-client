import { useNavigate } from "react-router-dom";
import background from "/src/images/pexels-anni-roenkae.jpg";

const Page404 = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
        minHeight: "100vh",
      }}
    >
      <h1>404</h1>
      <br />
      <p>Nothing found here, perhaps check your URL.</p>
      <div>
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
};

export default Page404;
