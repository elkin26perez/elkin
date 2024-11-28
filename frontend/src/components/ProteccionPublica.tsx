import { UseAdminStore } from "@/store/adminstore";
import { Outlet, Navigate } from "react-router-dom";

const PublicProteccion = () => {
  const adminAuth = UseAdminStore(state => state.admin);
  
  if (adminAuth) {
    return <Navigate to="/administracion" replace />;
  }

  return <Outlet />;
}

export default PublicProteccion