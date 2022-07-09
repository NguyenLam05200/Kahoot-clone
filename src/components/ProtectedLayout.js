import { Navigate, useOutlet } from "react-router-dom";
import { parseJwt } from '../utils/axios';
import {logout, update} from '../features/user/userSlice';
import { useDispatch } from "react-redux";

export const ProtectedLayout = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch() 

  const token = localStorage.kahut_app_accessToken
  if (token) {
    const tokenParse = parseJwt(token);
    if (tokenParse.exp * 1000 < Date.now()) {
      dispatch(logout());
      return <Navigate to="/login" />;
    }
    dispatch(update(tokenParse));
  } else {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {outlet}
    </>
  );
};
