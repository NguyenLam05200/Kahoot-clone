import { Navigate, useOutlet } from "react-router-dom";

export const ProtectedLayout = () => {
  const user = localStorage.kahut_app_accessToken
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {outlet}
    </>
  );
};
