import { Navigate, useOutlet } from "react-router-dom";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
  const user = null
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" }
        ]}
      />
      {outlet}
    </div>
  );
};
