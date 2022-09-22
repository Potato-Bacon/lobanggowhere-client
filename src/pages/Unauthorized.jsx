import { useNavigate } from "react-router-dom";
import background from "/src/images/pexels-anni-roenkae.jpg";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
      }}
    >
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div>
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
};

export default Unauthorized;
