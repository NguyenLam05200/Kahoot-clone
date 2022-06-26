import { instanceAuth } from "../../utils/axios";

// A mock function to mimic making an async request for data 
export function handleLoginApi(username, password) {
  return instanceAuth.post('authenticate', { username, password });
}

export function handleRegisterApi(data) {
  return instanceAuth.post('register', data);
}

