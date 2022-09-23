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
        minHeight: "100vh",
        padding: "20rem 10rem 10rem 10rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl drop-shadow-lg shadow-2xl break-words text-center text-1xl font-sans">
        <h1 className="font-serif font-bold text-2xl pb-3">Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div>
          <button
            className="mt-3 inline-block py-1 px-6 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
