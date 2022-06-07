import { Navigate, useOutlet } from "react-router-dom";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const user = true
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Settings", path: "settings" },
          { label: "Profile", path: "profile" }
        ]}
      />
      {outlet}
    </div>
  );
};
