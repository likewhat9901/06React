import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/member/login" state={{ from: location }} replace />;
  }

  // children이 있으면 단일 보호, 없으면 중첩 보호
  return children ? children : <Outlet />;
}

export default PrivateRoute;