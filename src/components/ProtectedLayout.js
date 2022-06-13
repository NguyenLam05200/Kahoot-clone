import { Navigate, useOutlet } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";

export const ProtectedLayout = () => {
  const user = localStorage.kahut_app_accessToken
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <ResponsiveAppBar
        pages={[
          // { label: "Settings", path: "settings" },
          // { label: "Profile", path: "profile" }
        ]}
      />
      {outlet}
    </div>
  );
};
