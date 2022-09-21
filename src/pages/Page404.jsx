import { useNavigate } from "react-router-dom";

const Page404 = () => { 
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
      <div>
        <h1>404</h1>
        <br />
        <p>Nothing found here, perhaps check your URL.</p>
        <div>
          <button onClick={goBack}>Go Back</button>
        </div>
      </div>
    );
}

export default Page404