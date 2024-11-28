import { hash, compare } from "bcrypt"
import { createRefreshToken, createToken } from "../services/jwt.js";
import Administrador from '../models/admin.js';
import Permiso from '../models/permisos.js';

export async function login(req,res) {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    try {
        const existingUser = await Administrador.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario no existe en la base de datos'
            });
        }

        const correctPassword = await compare(password, existingUser.password);
        if (!correctPassword) {
            return res.status(400).json({
              status: 'error',
              message: 'Contraseña incorrecta'
            })
        }

        const token = createToken(existingUser)
        const refreshToken = createRefreshToken(existingUser)
        
        res.cookie('acces_token', token, {httpOnly:false, secure: false, path: 'http://localhost:5173'})

        res.cookie('refresh_token', refreshToken, {httpOnly:false, secure: false, path: 'http://localhost:5173'})

        return res.status(200).json({
            status: "success",
            message: "Login exitoso"
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        })
    }
}


export async function crearAdmin(req, res) {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    try {
        const existingUser = await Administrador.findOne({ email:email });
        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'El usuario ya existe en la base de datos'
            });
        }

        const hashedPassword = await hash(password, 10); 

        const nuevoAdmin = new Administrador({
            name,
            email,
            password: hashedPassword,
            rol: 'admin' 
        });

        const adminSave = await nuevoAdmin.save();

        if(adminSave){
            return res.status(201).json({
                status: 'success',
                message: 'Usuario almacenado correctamente'
            });
        }

        return res.status(400).json({
            status: 'error',
            message: 'Ocurrió un error en la consulta'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        });
    }
}


export async function todasLasSolicitudes(req,res) {
    try {
        const permisos = await Permiso.find();

        if(permisos.length === 0){
            return res.status(204)
        }  
        return res.status(200).json({
            status: "success",
            message: "Todas las solicitudes",
            data: permisos
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        });
    }
}


export async function detalleSolicitud(req,res) {
    const { id } = req.params
    try {
        const permiso = await Permiso.findById(id);

        if (!permiso) {
            return res.status(204); // Respuesta sin contenido
        }
        return res.status(200).json({
            status: "success",
            message: "Todas las solicitudes",
            data: permiso
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        });
    }
}



export async function editarSolicitud(req,res) {
    const { id } = req.params
    const {estatus} =  req.body
    try {
        const permiso = await Permiso.findById(id);
        if (!permiso) {
            return res.status(400).json({
                status: "error",
                message: "La solicitud no existe"
            });
        }
        permiso.estatus = estatus;
        const updateResult = await permiso.save();
        if (updateResult) {
            return res.status(200).json({
                status: "success",
                message: "Se actualizó correctamente",
            })
        }


    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        });
    }
}


export async function aprobadas(req,res) {
    const { id } = req.params
    try {
        const permisosAprobados = await Permiso.find({ estatus: "aprobado" });

        if (permisosAprobados.length === 0) {
            return res.status(204).send(); // Respuesta sin contenido
        }

        // Devolver las solicitudes aprobadas
        return res.status(200).json({
            status: "success",
            message: "Solicitudes aprobadas",
            data: permisosAprobados
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        });
    }
}


export async function solicitudesAprobadas(req, res) {
    try {
        // Consulta para contar solicitudes aprobadas
        const [countQuery] = await conection.query("SELECT COUNT(*) AS totalAprobadas FROM permisos WHERE estatus = 'aprobada'");
        const totalAprobadas = countQuery[0].totalAprobadas;

        // Consulta para obtener todas las solicitudes
        const [query] = await conection.query("SELECT * FROM permisos");

        if (query.length === 0) {
            return res.status(204).json({
                status: "success",
                message: "No hay solicitudes disponibles",
                totalAprobadas: totalAprobadas 
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Todas las solicitudes",
            data: query,
            totalAprobadas: totalAprobadas 
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error, intenta más tarde'
        });
    }
}
