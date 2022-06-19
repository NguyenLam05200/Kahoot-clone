import React, { useEffect, useState } from "react";
import Question from "./Question";
import { color } from "style-value-types";
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { isTSEntityName } from "@babel/types";
import ResponsiveAppBar from "../../components/AppBar";

<<<<<<< Updated upstream

const CreateKhutRoom = () => {
  //const test = [{id:1, time:20, ques_title: "abc", ans1: "def", ans2:"def", ans3:"kd", ans4:"dj", img:"s" }];
  // const [isDisplayPopup, setIsDisplayPopUp] = useState(false);
=======
//const test = [{id:1, time:20, ques_title: "abc", ans1: "def", ans2:"def", ans3:"kd", ans4:"dj", img:"s" }];

const CreateKhutRoom = () => {
  const [isDisplayPopup, setIsDisplayPopUp] = useState(false);
>>>>>>> Stashed changes

  const [test, setTest] = useState([
    {
      id: 1,
      time: 20,
<<<<<<< Updated upstream
      ques_title: "abc",
      ans1: "def",
      ans2: "def",
      ans3: "kd",
      ans4: "dj",
      img: "s",
=======
      ques_title: "Day la con gi",
      ans1: "Con meo",
      ans2: "Con khi",
      ans3: "Con cho",
      ans4: "Con heo",
      img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
      ans1True: false,
      ans2True: false,
      ans3True: true,
      ans4True: true,
>>>>>>> Stashed changes
    },
  ]);

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
    <div>
      <ResponsiveAppBar />
     {/* menu luu danh sach cau hoi*/}
      <div className="container">
        {test.map((item) => {
          return <Question item={item} />;
        })}

        {/* add the question */}
      </div>
    </div>
  );
};

export default CreateKhutRoom;
