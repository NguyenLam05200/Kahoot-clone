import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../user/Navbar";
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

  let content;
  if (postStatus === "loading") {
    content = <div class="spinner-border text-primary"></div>;
  } else if (postStatus === "succeeded") {
    console.log(Quiz);
    // map object when get quiz
    const ques_number = 1;
    content = Quiz.questions.map((item) => {
      //map datat
      <div></div>;
      ques_number++;
    });
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  // const [listQueation, setListQuestion] = useState([
  //   {
  //     img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
  //     time: 15,
  //     ques_title: "What is this?",
  //     ans1: "Pigs",
  //     ans2: "Dogs",
  //     ans3: "Ducks",
  //     ans4: "Monkeys",
  //     ans1True: true,
  //     ans2True: false,
  //     ans3True: true,
  //     ans4True: false,
  //   },
  // ]);

  // const loadListQuestion = () => {
  //   setListQuestion([
  //     ...listQueation,
  //     {
  //       img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
  //       time: 20,
  //       ques_title: "What is this?",
  //       ans1: "a",
  //       ans2: "b",
  //       ans3: "c",
  //       ans4: "d",
  //       ans1True: true,
  //       ans2True: false,
  //       ans3True: false,
  //       ans4True: false,
  //     },
  //   ]);
  // };

  return (
    <div>
      <Navbar />
      <div className="container mt-2">
        <div className="row">
          <div className="col-sm-3">
            <img
              style={{ width: "100%" }}
              src="https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg"
              alt
            />
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
          <div
            className="col-sm-9"
            style={{ backgroundColor: "#f4f7fa", height: "100vh" }}
          >
            <div>
              <div className="row d-flex justify-content-between">
                <h5>Question (3)</h5>
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
