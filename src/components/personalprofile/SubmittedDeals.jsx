function SubmittedDeals({ select, submittedDeals }) {
  return (
    <>
      {select === "SubmittedDeals" && (
        <>
          <h1>Submitted Deals</h1>

          {submittedDeals?.data?.map((deal) => (
            <>
              <div key={deal._id}>
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
                <div>{deal.title}</div>
                <div>{deal.submittedStatus}</div>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default SubmittedDeals;
