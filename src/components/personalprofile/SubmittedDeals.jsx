import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

function SubmittedDeals({ select }) {
  const { user } = useContext(AuthContext);

  return <>{select === "SubmittedDeals" && <h1>Submitted Deals</h1>}</>;
}

export default SubmittedDeals;
