import { Navigate, useOutlet } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";

export const HomeLayout = () => {
  const user = null
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
    </div>
  );
};
