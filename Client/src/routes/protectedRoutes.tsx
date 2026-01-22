import { useTypedSelector } from "@/redux/hook";
import { AUTH_ROUTES } from "./common/routePath";
import { Navigate, Outlet } from "react-router-dom";

const PROTECTEDROUTE = () => {
   const { user, accessToken } = useTypedSelector((state) => state.auth)
   if (accessToken && user) return <Outlet />
   return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />
}
export default PROTECTEDROUTE; 