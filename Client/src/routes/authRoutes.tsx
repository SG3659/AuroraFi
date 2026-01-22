import { useTypedSelector } from "@/redux/hook";
import { PROTECTED_ROUTES } from "./common/routePath"
import { Navigate, Outlet } from "react-router-dom";

const AUTHROUTE = () => {
   const { user, accessToken } = useTypedSelector((state) => state.auth)
   if (!accessToken && !user) return <Outlet />;

   return <Navigate to={PROTECTED_ROUTES.OVERVIEW} replace />;
};
export default AUTHROUTE;