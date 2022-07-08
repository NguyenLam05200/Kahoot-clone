import { instanceAuth } from '../../utils/axios';
// A mock function to mimic making an async request for data 
export function handleLoginApi(dataInput) {
  return instanceAuth.post(`authenticate`, dataInput);
}

export function handleRegisterApi(dataInput) {
  return instanceAuth.post('register', dataInput);
}

