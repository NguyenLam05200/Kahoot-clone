import { instance } from "../../utils/axios";

export function handlePIN(pin) {
  // call api || websocket
  return {
    isRightPin: true,
    questions: [
      {
        type: 'True or false',
        point: 5,
        totalAns: 2,
        correctAns: [0],
        timeLimit: 20
      },
    ],
  };
}

export function handleNAME(name) {
  // call api || websocket
  return true;
}

