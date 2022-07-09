import { Navigate, useOutlet } from "react-router-dom";
import { parseJwt } from '../utils/axios';

export const ProtectedLayout = () => {
  const outlet = useOutlet();

  const token = localStorage.kahut_app_accessToken
  if (token) {
    const tokenParse = parseJwt(token);
    if (tokenParse.exp * 1000 < Date.now()) {
      delete localStorage.kahut_app_accessToken;
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {outlet}
    </>
  );
};
