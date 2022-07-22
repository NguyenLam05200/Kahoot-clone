import { instance } from '../../utils/axios';
import axios from 'axios';


const onFileUpload = async (imgFile) => {
  // Create an object of formData
  const formData = new FormData();
  formData.append("upload_preset", "uno7mtgs");
  // Update the formData object
  formData.append(
    "file",
    imgFile,
    imgFile.name
  );

  // Request made to the backend api
  // Send formData object
  const resp = await axios.post(
    "https://api.cloudinary.com/v1_1/dm1q6n9ns/image/upload",
    formData
  );
  return resp.data.url;
};

export async function formatInputCreate(dataInput) {
  const dataInputDeepCopy = JSON.parse(JSON.stringify(dataInput));
  if (dataInput.roomImage) {
    dataInputDeepCopy.roomImage = await onFileUpload(dataInput.roomImage)
  } else {
    dataInputDeepCopy.roomImage = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
  for (let i = 0; i < dataInput.listQuestion.length; i++) {
    if (dataInput.listQuestion[i].img) {
      dataInputDeepCopy.listQuestion[i].img = await onFileUpload(dataInput.listQuestion[i].img)
    } else {
      dataInputDeepCopy.listQuestion[i].img = 'https://images.unsplash.com/photo-1499377193864-82682aefed04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80'
    }
    dataInputDeepCopy.listQuestion[i].id = '' + i;
    dataInputDeepCopy.listQuestion[i].ans.map((eachAns, index) => {
      return eachAns.id = i + '' + index
    })
  }

  const newKahutRoom = {
    quizTitle: dataInputDeepCopy.roomTitle,
    quizImage: dataInputDeepCopy.roomImage,
    plays: 0,
    questions: dataInputDeepCopy.listQuestion,
  }
  return newKahutRoom;
}

export async function handleCreate(newKahutRoom) {
  return axios.post(`${process.env.REACT_APP_BACK_END_OTHER}quiz`,
    newKahutRoom,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("kahut_app_accessToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
  // return instance.post('quiz', newKahutRoom)
}

export function handleGetAllRoom() {
  return axios.get(`${process.env.REACT_APP_BACK_END_OTHER}quiz-all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("kahut_app_accessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
}

export function handleGetRoomByID(roomID) {
  return axios.get(`${process.env.REACT_APP_BACK_END_OTHER}quiz/${roomID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("kahut_app_accessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
}

export function handleDeleteRoomByID(roomID) {
  return axios.delete(`${process.env.REACT_APP_BACK_END_OTHER}quiz/${roomID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("kahut_app_accessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
}



export async function formatInputUpdate(dataInput) {
  const { curRoom, roomTitle, roomImage, listQuestion } = dataInput;

  const updatedRoom = JSON.parse(JSON.stringify(curRoom));
  updatedRoom.quizTitle = roomTitle;
  if (roomImage) {
    if (roomImage.name) {
      updatedRoom.quizImage = await onFileUpload(roomImage)
    }
  } else {
    updatedRoom.quizImage = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }


  updatedRoom.questions = JSON.parse(JSON.stringify(listQuestion));

  for (let i = 0; i < listQuestion.length; i++) {
    if (listQuestion[i].img) {
      if (listQuestion[i].img.name) {
        updatedRoom.questions[i].img = await onFileUpload(listQuestion[i].img)
      }
    } else {
      updatedRoom.questions[i].img = 'https://images.unsplash.com/photo-1499377193864-82682aefed04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80'
    }
  }

  return updatedRoom;
}

export function handleUpdate(updatedRoom) {
  return instance.post('quiz', updatedRoom)
}

export function handleGetAllReport() {
  return axios.get(`${process.env.REACT_APP_BACK_END_OTHER}report-all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("kahut_app_accessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
  // return {
  //   status: 200,
  //   reports: [
  //     {
  //       _id: 'x1',
  //       author: 'Nguyen Lam',
  //       quizID: '62ce63ff5c2f1a40a5f4dbcc',
  //       percentRightTotal: 48,
  //       timeStart: 1657950168732,
  //       timeEnd: 1657950256974,
  //       listCountChooseAns: [
  //         [0, 9, 0, 0],
  //         [2, 2, 3, 1],
  //         [2, 1, 2, 3, 2, 0],
  //         []
  //       ],
  //       players: [
  //         { name: 'Luffy', score: 1727, correctAns: [0, 1] },
  //         { name: 'Jhon', score: 1252, correctAns: [0, 1] },
  //         { name: 'Selena Gomez', score: 853, correctAns: [1] },
  //         { name: 'Taylor Swift', score: 789, correctAns: [3] },
  //         { name: 'Alex', score: 722, correctAns: [3] },
  //         { name: 'Nga', score: 569, correctAns: [2] },
  //         { name: 'Thanh', score: 488, correctAns: [0] },
  //         { name: 'Lam', score: 356, correctAns: [2] },
  //       ],
  //       analysisResults: [
  //         [1, 33],
  //         [2, 50],
  //         [0, 100],
  //         [0, 101]
  //       ]
  //     },
  //     {
  //       _id: 'x2',
  //       author: 'Nguyen Lam',
  //       quizID: '62ce63ff5c2f1a40a5f4dbccs',
  //       percentRightTotal: 48,
  //       timeStart: 1657950168732,
  //       timeEnd: 1657950256974,
  //       listCountChooseAns: [
  //         [0, 9, 0, 0],
  //         [2, 2, 3, 1],
  //         [2, 1, 2, 3, 2, 0],
  //         []
  //       ],
  //       players: [
  //         { name: 'Luffy', score: 1727, correctAns: [0, 1] },
  //         { name: 'Jhon', score: 1252, correctAns: [0, 1] },
  //         { name: 'Selena Gomez', score: 853, correctAns: [1] },
  //         { name: 'Taylor Swift', score: 789, correctAns: [3] },
  //         { name: 'Alex', score: 722, correctAns: [3] },
  //         { name: 'Nga', score: 569, correctAns: [2] },
  //         { name: 'Thanh', score: 488, correctAns: [0] },
  //         { name: 'Lam', score: 356, correctAns: [2] },
  //       ],
  //       analysisResults: [
  //         [1, 33],
  //         [2, 50],
  //         [0, 100],
  //         [0, 101]
  //       ]
  //     }
  //   ]
  // }
}


export function handleGetReportByID(reportID) {
  return axios.get(`${process.env.REACT_APP_BACK_END_OTHER}report/${reportID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("kahut_app_accessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
}

export function handleAddNewReport(newReport) {
  return instance.post('report', newReport)
}



export function handlePlayQuiz(roomID) {
  return instance.post(`plays/${roomID}`)
}