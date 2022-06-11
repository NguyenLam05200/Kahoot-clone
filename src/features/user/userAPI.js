import { instance } from "../../utils/axios";

// A mock function to mimic making an async request for data 
export function handleLoginApi(email, password) {
  return instance.post('login', { email, password });
}

export function handleRegisterApi(data) {
  return instance.post('create-new-user', data);
}
