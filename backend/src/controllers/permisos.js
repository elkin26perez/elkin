import path from 'node:path'
import Permiso from '../models/permisos.js';


export async function crearSolicitud(req, res) {
    const fileUploaded = req.file;
    const params = req.body;

    if (!params.tipotrabajo || !params.duraciontrabajo || !params.riesgotrabajo || !params.urgencia) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }
    try {
        const extension = path.extname(fileUploaded.originalname);
        if (extension !== ".docx") {
            return res.status(400).json({
                status: "error",
                message: "La extensión del archivo es incorrecta"
            });
        }
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${fileUploaded.filename}`;
        const nuevaSolicitud = new Permiso({
            tipotrabajo: params.tipotrabajo,
            duraciontrabajo: params.duraciontrabajo,
            riesgotrabajo: params.riesgotrabajo,
            file: fileUrl,
            urgencia: params.urgencia,
            estatus: "pendiente",
            fecha_creacion: new Date()
        });

        // Guardar la solicitud en la base de datos
        const solicitudSaved = await nuevaSolicitud.save();

        if(solicitudSaved){
            
            return res.status(201).json({
                status: 'success',
                message: 'Solicitud creada correctamente'
            });
        }

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        });
    }
}