import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllQuiz, fetchQuiz } from "../quizSlice/quizSlice";
import { useParams } from "react-router-dom";

const KahootDetail = function ({ match }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const clickShowAnser = () => {
    setShowAnswer(!showAnswer);
  };

  const dispatch = useDispatch();
  const Quiz = useSelector(selectAllQuiz);

  const postStatus = useSelector((state) => state.quiz.status);
  const error = useSelector((state) => state.quiz.error);
  let params = useParams();

  useEffect(() => {
    if (postStatus === "idle") {
      const roomID = params.roomID;
      dispatch(fetchQuiz(roomID));
    }
  }, [postStatus, dispatch]);
  let ques_number = 0;
  let content;
  if (postStatus === "loading") {
    content = <div class="spinner-border text-primary"></div>;
  } else if (postStatus === "succeeded") {
    let ans_number = 0;

    content = Quiz.quiz.questions.map((item) => {
      {
        ques_number++;
      }
      return (
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
          {console.log(showAnswer)}
          {showAnswer && (
            <div>
              {item.ans.map((ques) => {
                ans_number++;
                {
                  if (ans_number === 1)
                    return (
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
                            <span>
                              <i
                                className=" mr-1 fa fa-grav"
                                aria-hidden="true"
                                style={{ color: "red", marginLeft: "10px" }}
                              />
                              {ques.text}
                            </span>
                          </div>

                          {ques.isRight ? (
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
                    );
                }
                {
                  if (ans_number === 2)
                    return (
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
                          <div style={{ color: "green" }}>
                            <span>
                              <i
                                className=" mr-1 fa fa-eercast"
                                aria-hidden="true"
                                style={{ color: "#ffc107", marginLeft: "10px" }}
                              />
                              {ques.text}
                            </span>
                          </div>
                          {ques.isRight ? (
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
                    );
                }

                {
                  if (ans_number === 3)
                    return (
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
                              className="ml-2 mr-1 fa fa-ravelry"
                              aria-hidden="true"
                              style={{ color: "rgb(0, 238, 255)" }}
                            />
                            <span>{ques.text}</span>
                          </div>
                          {ques.isRight ? (
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
                    );
                }
                {
                  if (ans_number === 4) ans_number = 0;
                  return (
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
                            className=" mr-1 fa fa-podcast"
                            aria-hidden="true"
                            style={{
                              color: "rgb(0, 255, 42)",
                              marginLeft: "13px",
                            }}
                          />
                          <span>{ques.text}</span>
                        </div>
                        {ques.isRight ? (
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
                  );
                }
              })}
            </div>
          )}
        </div>
      );
    });
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <div className="container mt-2">
        <div className="row">
          <div className="col-sm-3">
            <img style={{ width: "100%" }} src={Quiz.quiz.quizImage} alt />
            <h4>My room</h4>
            <div className="row">
              <div className="col-sm-5">
                <h5>0 player</h5>
              </div>
              <div className="col-sm-7">
                <button type="button" className="btn btn-warning mr-1">
                  Edit
                </button>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            <button
              style={{ width: "100%" }}
              type="button"
              className="btn btn-primary mt-3"
            >
              Start
            </button>
          </div>
          <div className="col-sm-9" style={{ backgroundColor: "#d6d2c4" }}>
            <div>
              <div className="row d-flex justify-content-between">
                <h5>Question ({ques_number})</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={clickShowAnser}
                >
                  Show answers
                </button>
              </div>
              <div className="col-sm-12">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KahootDetail;
