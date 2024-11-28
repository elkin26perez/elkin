import { UseAdminStore } from "@/store/adminstore";
import { Outlet, Navigate } from "react-router-dom";

const ProteccionAdmin = () => {
    const admin = UseAdminStore(state=> state.admin)

    if(admin){
        return (
          <Outlet/>
        )
    }
        return (
            <Navigate to={"/"} replace/>
        )
}

export default ProteccionAdmin