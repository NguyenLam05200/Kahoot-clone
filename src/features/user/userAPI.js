import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://157.245.147.239:8080/v1/user/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
});


// A mock function to mimic making an async request for data 
export function handleLoginApi(email, password) {
  return instance.post(`authenticate`, { email, password });
}

export function handleRegisterApi({ email, password, name }) {
  return instance.post('register', {
    email: email,
    password: password,
    name: name,
  });
}

