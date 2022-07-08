export const Ques1 = () => {
  return <div></div>;
};

<div className="mb-3">
  <div
    style={{
      backgroundColor: "#fff",
      border: "none",
      padding: 5,
    }}
  >
    <div className="row">
      <div className="col-sm-9">
        <h5>{ques_number} - Quiz</h5>
        <span style={{ fontWeight: "bold" }}>{item.text}</span>
      </div>
      <div className="col-sm-3">
        <img style={{ width: "100%" }} src={item.img} alt />
        <span
          style={{
            position: "absolute",
            marginTop: 60,
            marginLeft: "-50px",
            color: "white",
          }}
        >
          {item.time} sec
        </span>
      </div>
    </div>
  </div>
  {showAnswer && (
    <div>
      <div
        style={{
          border: "solid 1px #f5f5f5",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="row d-flex justify-content-between"
          style={{ margin: 0 }}
        >
          <div>
            <i
              className="ml-2 mr-1 fa fa-eercast"
              aria-hidden="true"
              style={{ color: "red" }}
            />
            <span>{item.text}</span>
          </div>

          {item.isRight ? (
            <i
              style={{
                color: "rgb(0, 255, 13)",
                marginRight: 5,
              }}
              className="fa fa-check"
              aria-hidden="true"
            ></i>
          ) : (
            <i
              style={{ color: "red", marginRight: 5 }}
              className="fa fa-times"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <div
        style={{
          border: "solid 1px #f5f5f5",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="row d-flex justify-content-between"
          style={{ margin: 0 }}
        >
          <div>
            <i
              className="ml-2 mr-1 fa fa-superpowers"
              aria-hidden="true"
              style={{ color: "rgb(0, 255, 76)" }}
            />
            <span>{item.ans2}</span>
          </div>
          {item.ans2True ? (
            <i
              style={{
                color: "rgb(0, 255, 13)",
                marginRight: 5,
              }}
              className="fa fa-check"
              aria-hidden="true"
            ></i>
          ) : (
            <i
              style={{ color: "red", marginRight: 5 }}
              className="fa fa-times"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <div
        style={{
          border: "solid 1px #f5f5f5",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="row d-flex justify-content-between"
          style={{ margin: 0 }}
        >
          <div>
            <i
              className="ml-2 mr-1 fa fa-grav"
              aria-hidden="true"
              style={{ color: "rgb(0, 238, 255)" }}
            />
            <span>{item.ans3}</span>
          </div>
          {item.ans3True ? (
            <i
              style={{
                color: "rgb(0, 255, 13)",
                marginRight: 5,
              }}
              className="fa fa-check"
              aria-hidden="true"
            ></i>
          ) : (
            <i
              style={{ color: "red", marginRight: 5 }}
              className="fa fa-times"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <div
        style={{
          border: "solid 1px #f5f5f5",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="row d-flex justify-content-between"
          style={{ margin: 0 }}
        >
          <div>
            <i
              className="ml-1 mr-1 fa fa-ravelry"
              aria-hidden="true"
              style={{ color: "rgb(0, 255, 42)" }}
            />
            <span>{item.ans4}</span>
          </div>
          {item.ans4True ? (
            <i
              style={{
                color: "rgb(0, 255, 13)",
                marginRight: 5,
              }}
              className="fa fa-check"
              aria-hidden="true"
            ></i>
          ) : (
            <i
              style={{ color: "red", marginRight: 5 }}
              className="fa fa-times"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  )}
</div>;
