import { Navigate, useOutlet } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";
import Footer from "./Footer";

export const HomeLayout = () => {
  const user = localStorage.kahut_app_accessToken
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/profile" replace />;
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
