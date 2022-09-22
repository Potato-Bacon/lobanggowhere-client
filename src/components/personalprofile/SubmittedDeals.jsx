import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../context/AuthProvider";
import { SERVER } from "../../utils/constants";
import DeleteMyDeal from "./DeleteMyDeal";

function SubmittedDeals({ select }) {
  const { user, submittedDeals, setSubmittedDeals } = useContext(AuthContext);

  useEffect(() => {
    renderSubmittedDeals();
  }, []);

  const renderSubmittedDeals = async () => {
    const submissions = user.submissions;
    console.log(submissions, "total");
    const url = SERVER + `/account/submitteddeals`;

    // console.log(submittedDeals, "current");
    const data = await axios.post(url, submissions);
    console.log(data, "test");

    setSubmittedDeals(data.data);
  };

  return (
    <>
      {select === "SubmittedDeals" && (
        <>
          <div>
            <h1>Submitted Deals</h1>

            {submittedDeals?.map((deal) => (
              <div key={uuidv4()}>
                <h3 className="m-8">{deal.title}</h3>
                <img
                  className="m-8"
                  style={{
                    minHeight: "16rem",
                    maxHeight: "16rem",
                    overflow: "hidden",
                    height: "50%",
                    width: "50%",
                  }}
                  src={deal.img}
                  alt="image"
                />
                <h3 className="m-8">Status: {deal.submittedStatus}</h3>
                {deal.submittedStatus !== "Approve" && (
                  <DeleteMyDeal deal={deal} />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default SubmittedDeals;
