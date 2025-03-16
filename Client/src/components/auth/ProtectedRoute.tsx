import { Navigate, Outlet } from "react-router-dom";

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = parseJwt(token);
  const userRole = decodedToken?.role;
  const tokenExpiration = decodedToken?.exp;

  // ✅ Check if Token is Expired
  if (tokenExpiration && Date.now() >= tokenExpiration * 1000) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // ✅ Role-based Access Check
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
