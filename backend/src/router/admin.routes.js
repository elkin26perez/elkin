import { Router } from "express";
import {  crearAdmin, detalleSolicitud, editarSolicitud, login, todasLasSolicitudes,  solicitudesAprobadas } from "../controllers/admin.js";
import { auth } from "../middlewares/auth.js";

const router = Router()


router.post("/", login)
router.post("/crear", crearAdmin)
router.get("/solicitudes", auth, todasLasSolicitudes)
router.get("/solicitudes/:id", auth, detalleSolicitud)
router.post("/solicitudes/:id/editar", auth, editarSolicitud)
router.get("/solicitudes/aprobadas", auth, solicitudesAprobadas)

export default router