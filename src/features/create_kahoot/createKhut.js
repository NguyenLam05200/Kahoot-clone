import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { color } from "style-value-types";
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { isTSEntityName } from "@babel/types";

//const test = [{id:1, time:20, ques_title: "abc", ans1: "def", ans2:"def", ans3:"kd", ans4:"dj", img:"s" }];
const [isDisplayPopup, setIsDisplayPopUp] = useState(false); 

const [test, setTest] = useState([
  {
    id: 1,
    time: 20,
    ques_title: "abc",
    ans1: "def",
    ans2: "def",
    ans3: "kd",
    ans4: "dj",
    img: "s",
  },
]);

const CreateKhutRoom = () => {
  const addNewQuestion = (
    id,
    time,
    ques_title,
    ans1,
    ans2,
    ans3,
    ans4,
    img_scr
  ) => {
    return setTest(...test, {
      id: id,
      time: time,
      ques_title: ques_title,
      ans1: ans1,
      ans2: ans2,
      ans3: ans3,
      ans4: ans4,
      img: img_scr,
    });
  };

  return (
    <div class="container-fluid ml-auto mr-auto">
      <div class="row" style="background-color: dark">
        <div class="col-sm-8">
          <h1>Nav</h1>
        </div>
      </div>
      {test.map((item) => {
        return (
          <div class="row">
            <div class="col-sm-2 d-flex align-items-center ml-auto mr-auto">
              <div class="row d-flex justify-content-center">
                <h4>Question {item.id}.</h4>
                <div
                  style="
              border: solid 1px red;
              border-radius: 15px;
              width: 30px;
              height: 30px;
            "
                  class="text-center ml-3"
                >
                  {item.time}
                </div>
              </div>
            </div>

            <div class="col-sm-8">
              <div class="text-center">
                <h5>{item.ques_title}</h5>
                <img
                  src={item.img}
                  alt=""
                  style="width: 250px; height: 250px"
                />
              </div>

              <div class="mt-3">
                <div class="row d-flex justify-content-between">
                  <div
                    class="col-sm-5 text-left ml-auto"
                    style="
                background-color: #d1442e;
                color: white;
                border-radius: 5px;
              "
                  >
                    <i class="fa fa-circle mr-2" aria-hidden="true"></i>{" "}
                    {item.ans1}
                  </div>
                  <div class="col-sm-1"></div>
                  <div
                    class="col-sm-5 text-left mr-auto"
                    style="
                background-color: #2ea351;
                color: white;
                border-radius: 5px;
              "
                  >
                    <i class="fa fa-square-o mr-2" aria-hidden="true"></i>{" "}
                    {item.ans2}
                  </div>
                </div>
                <div class="row d-flex justify-content-between mt-2">
                  <div
                    class="col-sm-5 text-left ml-auto"
                    style="
                background-color: #2e9ba3;
                color: white;
                border-radius: 5px;
              "
                  >
                    <i class="fa fa-certificate mr-2" aria-hidden="true"></i>
                    {item.ans3}
                  </div>
                  <div class="col-sm-1"></div>
                  <div
                    class="col-sm-5 text-left mr-auto"
                    style="
                background-color: #a3922e;
                color: white;
                border-radius: 5px;
              "
                  >
                    <i class="fa fa-info-circle mr-2" aria-hidden="true"></i>{" "}
                    {item.ans4}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button button type="button" class="btn btn-success text-center">
        <i class="fa fa-plus mr-2" aria-hidden="true"></i> Add New Question
      </button>
      isDisplayPopup?():()
    </div>
  );
};

export default CreateKhutRoom;
