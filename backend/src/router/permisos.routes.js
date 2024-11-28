import { Router } from "express";
import { crearSolicitud } from "../controllers/permisos.js";
import multer from "multer";

import path from 'node:path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");  
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `word-${Date.now()}-${file.originalname}${ext}`);  
    },
});
  
const upload = multer({ storage });


const router = Router()

router.post("/", upload.single('file'), crearSolicitud)

export default router
