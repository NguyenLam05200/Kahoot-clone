import React, { useEffect, useState } from "react";
import Question from "./Question";
import { color } from "style-value-types";
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { isTSEntityName } from "@babel/types";
import ResponsiveAppBar from "../../components/AppBar";
import Navbar from "../user/Navbar";
import $, { data } from "jquery";
import { height } from "@mui/system";
import UploadImage from "../../features/create_kahoot/uploadImage";

const CreateListKahootQuestion = () => {
  //const test = [{id:1, time:20, ques_title: "abc", ans1: "def", ans2:"def", ans3:"kd", ans4:"dj", img:"s" }];
  // const [isDisplayPopup, setIsDisplayPopUp] = useState(false);

  const [inputState, setInputState] = useState(false);
  const [id, setId] = useState(0);
  const [listQuestion, setListQuestion] = useState([]);

  const [url, setUrl] = useState();

  const handleCallback = (childData) => {
    setUrl(childData);
  };

  function onCickSave() {
    if (
      $("#txttime").val().length > 0 &&
      $("#txtquestion").val().length > 0 &&
      $("#txtans1").val().length > 0 &&
      $("#txtans2").val().length > 0 &&
      $("#txtans3").val().length > 0 &&
      $("#txtans4").val().length > 0
    ) {
      setInputState(true);
      const newQuestion = {
        id: id,
        time: $("#txttime").val(),
        ques_title: $("#txtquestion").val(),
        ans1: $("#txtans1").val(),
        ans2: $("#txtans2").val(),
        ans3: $("#txtans3").val(),
        ans4: $("#txtans4").val(),
        img: url,
        ans1True: $("#correctans1").is(":checked"),
        ans2True: $("#correctans2").is(":checked"),
        ans3True: $("#correctans3").is(":checked"),
        ans4True: $("#correctans4").is(":checked"),
      };

      const newListQuestion = [...listQuestion, newQuestion];

      setListQuestion(newListQuestion);

      //update id
      setId(id + 1);
    } else {
      setInputState(false);
    }
    setUrl(null);
  }

  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <Navbar />
      {/* menu luu danh sach cau hoi*/}
      {listQuestion.length > 0 && (
        <h3 className="ml-3 mt-2" style={{ color: "#479fec" }}>
          List Question
        </h3>
      )}

      <div className="container">
        {listQuestion.map((item) => {
          return <Question key={item.id} item={item} />;
        })}

        {/* add the question */}
        <div
          className="fixed-bottom d-flex justify-content-end align-items-center"
          style={{ backgroundColor: "#9ea8a8c5" }}
        >
          <button
            type="button"
            className="btn btn-primary mt-2 mb-2 mr-3"
            data-toggle="modal"
            data-target="#openAddNewQuestion"
          >
            Add new question
          </button>
          <button type="button" className="btn btn-success mt-2 mb-2 mr-3">
            Save
          </button>
        </div>

        <div
          className="modal fade"
          id="openAddNewQuestion"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Question!
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
               
                  <div className="form-group">
                    <label htmlFor="txtid">Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtid"
                      placeholder="id"
                      value={id}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    {/* <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose image of question
                      </label>
                    </div> */}
                    <UploadImage callback={handleCallback} />
                  </div>
                  <div className="form-group">
                    <div className="d-flex align-item-center">
                      <i
                        class="fa fa-clock-o "
                        aria-hidden="true"
                        style={{ color: "#20ee20" }}
                      >
                        <label className="ml-2" htmlFor="txttime">
                          Time
                        </label>
                      </i>
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      id="txttime"
                      placeholder="seconds"
                      required
                    />
                    {inputState !== true && (
                      <span style={{ color: "red" }}>required</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtquestion" style={{ color: "#ee5914" }}>
                      <i class="fa fa-question" aria-hidden="true"></i> Question
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtquestion"
                      placeholder="what is this?"
                      required
                    />
                    {inputState !== true && (
                      <span style={{ color: "red" }}>required</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtans1" style={{ color: "#573ee4" }}>
                      <i class="fa fa-ravelry" aria-hidden="true"></i> Answer 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtans1"
                      placeholder="Dog"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtans2" style={{ color: "#573ee4" }}>
                      <i class="fa fa-ravelry" aria-hidden="true"></i> Answer 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtans2"
                      placeholder="Pig"
                      required
                    />
                    {inputState !== true && (
                      <span style={{ color: "red" }}>required</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="txtans3" style={{ color: "#573ee4" }}>
                      <i class="fa fa-ravelry" aria-hidden="true"></i> Answer 3
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtans3"
                      placeholder="Cat"
                      required
                    />
                    {inputState !== true && (
                      <span style={{ color: "red" }}>required</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="txtans4" style={{ color: "#573ee4" }}>
                      <i class="fa fa-ravelry" aria-hidden="true"></i> Answer 4
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtans4"
                      placeholder="Dog"
                      required
                    />
                    {inputState !== true && (
                      <span style={{ color: "red" }}>required</span>
                    )}
                  </div>

                  <div className="form-group">
                    <div className="form-check row">
                      <h5 style={{ color: "#3dd5f0" }}>Correct answer?</h5>
                      <div className="d-flex justify-content-around">
                        <div>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="correctans1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="correctans1"
                          >
                            <i class="fa fa-ravelry" aria-hidden="true"></i>{" "}
                            Answer 1
                          </label>
                        </div>
                        <div>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="correctans2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="correctans2"
                          >
                            Answer 2
                          </label>
                        </div>
                        <div>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="correctans3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="correctans3"
                          >
                            Answer 3
                          </label>
                        </div>

                        <div>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="correctans4"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="correctans4"
                          >
                            Answer 4
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
              
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onCickSave}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListKahootQuestion;
