import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectIsLoggin } from "./redux/auth/selectors";
import { Outlet } from "react-router";

const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggin);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;