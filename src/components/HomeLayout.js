import { Navigate, useOutlet } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";
import { parseJwt } from '../utils/axios';

import { logout, update } from '../features/user/userSlice';
import { useDispatch } from "react-redux";

export const HomeLayout = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch()

  const token = localStorage.kahut_app_accessToken
  if (token) {
    const tokenParse = parseJwt(token);
    if (tokenParse.exp * 1000 < Date.now()) {
      dispatch(logout());
    } else {
      dispatch(update(tokenParse));
      return <Navigate to="/user/home" replace />;
    }
  }

  return (
    <div>
      <ResponsiveAppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" }
        ]}
      />
      {outlet}
      {/* <Footer /> */}
    </div>
  );
};
