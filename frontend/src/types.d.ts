interface admin{
    rol: string
    email: string
}

interface Solicitud {
    id: number;
    _id: string;
    tipotrabajo: string;
    duraciontrabajo: number;
    riesgotrabajo: string;
    file: string;
    urgencia: string;
    estatus: "pendiente" | "aprobada" | "rechazada"; // Ejemplo de valores posibles
    fecha_creacion: string;
  }
  

type solict = {
    id:number
    _id:string
    tipotrabajo: string
    duraciontrabajo: number,
    riesgotrabajo: string,
    file: string,
    urgencia: string ,
    estatus: pendiente,
    fecha_creacion: string
}

type Solicitudes = Solicitud[]