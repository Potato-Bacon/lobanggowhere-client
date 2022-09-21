function SubmittedDeals({ select, submittedDeals }) {
  return (
    <>
      {select === "SubmittedDeals" && (
        <>
          <h1>Submitted Deals</h1>

          {submittedDeals?.data?.map((deal) => (
            <>
              <div key={deal._id}>
                <h3>{deal.title}</h3>
                <img
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
                <h3>Status: {deal.submittedStatus}</h3>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default SubmittedDeals;
