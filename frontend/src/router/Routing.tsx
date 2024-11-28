import { BrowserRouter , Routes, Route} from "react-router-dom"
import Inicio from "../components/Inicio"
import AdminInicio from "@/components/private/AdminInicio"
import LoginAdministradores from "@/components/LoginAdministradores"
import CrearAdmin from "@/components/CrearAdmin"
import SupervisarSolicitudes from "@/components/private/SupervisarSolicitudes"
import DetalleSolicitud from "@/components/private/DetalleSolicitud"
import CrearSolicitud from "@/components/private/CrearSolicitud"
import ProteccionAdmin from "@/components/private/ProtectionAdmin"
import PublicProteccion from "@/components/ProteccionPublica"



const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<PublicProteccion/>} >
              <Route path="/"  element={<Inicio/>} />
              <Route path="/login"  element={<LoginAdministradores/>} />
              <Route path="/crearAdmin"  element={<CrearAdmin/>} />
            
            </Route>

            <Route element={<ProteccionAdmin/> }>

              <Route path="/administracion"  element={<AdminInicio/>} />
              <Route path="/administracion/solicitudes"  element={<SupervisarSolicitudes/>} />
              <Route path="/administracion/solicitudes/crear"  element={<CrearSolicitud/>} />
              <Route path="/administracion/detalle/:id" element={<DetalleSolicitud/>} />

            </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default Routing