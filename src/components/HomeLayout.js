import { Navigate, useOutlet } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";
import { parseJwt } from '../utils/axios';

export const HomeLayout = () => {
  const outlet = useOutlet();

  const token = localStorage.kahut_app_accessToken
  if (token) {
    const tokenParse = parseJwt(token);
    if (tokenParse.exp * 1000 < Date.now()) {
      delete localStorage.kahut_app_accessToken
    } else {
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
