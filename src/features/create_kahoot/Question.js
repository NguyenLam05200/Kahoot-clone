import { useEffect } from "react";

function Question(props) {


  return (
    <div
      className="row mt-3 d-flex align-items-center"
      style={{
        backgroundColor: "#d8d3d3",
        border: "solid 1px #29cdf7",
        borderRadius: 5,
      }}
    >
      <div className="col-sm-3">
        <div className="row d-flex justify-content-center">
          <h4
            className="mr-4"
            style={{ color: "#237add", fontWeight: "bold" }}
          >
            Question {props.item.id}:
          </h4>
          <span
            className="text-center pt-1"
            style={{
              border: "solid 1px #ff0e9b",
              borderRadius: 20,
              width: 35,
              height: 35,
              color: "red",
            }}
          >
            {props.item.time}s
          </span>
        </div>
      </div>
      <div
        className="col-sm-8 mb-3 mt-3 mr-3"
        style={{ backgroundColor: "white", borderRadius: 10 }}
      >
        <div>
          <div className="text-center mt-3">
            <img src={props.item.img} alt style={{ width: 300, height: 300 }} />
          </div>
          <h5 className="text-center mt-3">{props.item.text}?</h5>
        </div>
        <h5 style={{ fontWeight: "bold" }}>Answer:</h5>
        <div>
          <div className="row ml-auto mr-auto d-flex justify-content-lg-around">
            <div
              className="col-sm-5 d-flex align-items-center"
              style={{
                backgroundColor: "#00ff0dcc",
                borderRadius: 10,
                height: 50,
                fontWeight: "bold",
                color: "white",
              }}
            >
              <i
                className="fa fa-superpowers fa-2x mr-4"
                aria-hidden="true"
              />
              {props.item.ans1}{" "}
              {props.item.ans1True ? (
                <input
                  type="checkbox"
                  aria-label="Checkbox for
            following text input"
                  defaultChecked
                  className="ml-auto"
                />
              ) : null}
            </div>
            <div
              className="col-sm-5 d-flex align-items-center"
              style={{
                backgroundColor: "#00d5f1c5",
                borderRadius: 10,
                height: 50,
                color: "white",
                fontWeight: "bold",
              }}
            >
              <i
                className="fa fa-podcast fa-2x mr-4"
                aria-hidden="true"
              />
              {props.item.ans2}{" "}
              {props.item.ans2True ? (
                <input
                  type="checkbox"
                  aria-label="Checkbox for
            following text input"
                  defaultChecked
                  className="ml-auto"
                />
              ) : null}
            </div>
          </div>
          <div className="row ml-auto mr-auto d-flex justify-content-lg-around mt-3 mb-3">
            <div
              className="col-sm-5 d-flex align-items-center"
              style={{
                backgroundColor: "#ff00d4fb",
                borderRadius: 10,
                height: 50,
                fontWeight: "bold",
                color: "white",
              }}
            >
              <i
                className="fa fa-bandcamp fa-2x mr-4"
                aria-hidden="true"
              />
              {props.item.ans3}{" "}
              {props.item.ans3True ? (
                <input
                  type="checkbox"
                  aria-label="Checkbox for
            following text input"
                  defaultChecked
                  className="ml-auto"
                />
              ) : null}
            </div>
            <div
              className="col-sm-5 d-flex align-items-center"
              style={{
                backgroundColor: "#fac002",
                borderRadius: 10,
                height: 50,
                fontWeight: "bold",
                color: "white",
              }}
            >
              <i
                className="fa fa-eercast fa-2x mr-4"
                aria-hidden="true"
              />
              {props.item.ans4}{" "}
              {props.item.ans4True ? (
                <input
                  type="checkbox"
                  aria-label="Checkbox for
              following text input"
                  defaultChecked
                  className="ml-auto"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question;