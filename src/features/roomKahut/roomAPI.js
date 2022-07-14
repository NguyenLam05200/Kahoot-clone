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
      eachAns.id = i + '' + index
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
  return instance.post('quiz', newKahutRoom)
}

export function handleGetAll() {
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
  return { status: 200 };
} 