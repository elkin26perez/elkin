import { customAxiosAdmin } from "@/interceptor/axios.interceptor"
import { useEffect, useState } from "react"
import Aside from "./Aside"
import DownloadExcel from "./DescargarExcel"

const SupervisarSolicitudes = () => {
    const [allSolicitudesData, setAllSolicitudesData] =  useState <Solicitudes> ([])
    console.log(allSolicitudesData);
    
    async function allSolicitudes() {
        const request = await customAxiosAdmin.get("admin/solicitudes",{
            headers:{
                "Content-Type": "application/json"
            }
        })
        
        if(request.status === 200){
            setAllSolicitudesData(request.data.data)
        }
    }
    

    useEffect(()=>{
        allSolicitudes()
    },[])
  return (
    <>
    <main className="grid grid-cols-[300px,1fr] w-full  place-content-center place-items-center">
      <Aside />
      <section className="w-full flex flex-col items-start justify-start h-full p-2">
        <div className="w-full  flex items-start flex-col justify-start">
            <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl my-4 text-blue-500 font-bold">Todas las solicitudes</h1>
            <DownloadExcel/>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-content-center place-items-start w-full h-full gap-4">
                {allSolicitudesData.map(item=>{
                    return(
                        <div key={item._id} className="w-full flex flex-col border  item rounded p-1 text-sm">
                            <div className="p-1 w-full ">
                                <p className="font-bold block">Puesto en cola: <span className="font-normal">{item.id}</span> </p>
                                <p className="font-bold block">Tipo de trabajo: <span className="font-normal">{item.tipotrabajo}</span> </p>
                                <p className="font-bold block">Duración horas: <span className="font-normal">{item.duraciontrabajo}</span> </p>
                                <p className="font-bold block">Riesgo del trabajo: <span className="font-normal">{item.riesgotrabajo}</span> </p>
                                <p className="font-bold block">Solicitud: <span className="font-normal">{item.urgencia}</span> </p>
                                <p className="font-bold block">Estatus: <span className="font-normal">{item.estatus}</span> </p>
                                <p className="font-bold block">Fecha de creación: <span className="font-normal">{item.fecha_creacion}</span> </p>
                            </div>
                            
                            <a  className="cursor-pointer bg-blue-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700  p-2  w-full text-center" href={`/administracion/detalle/${item._id}`} >Ver detalles</a>

                        </div>
                    )
                })}
            </div>
        </div>
      </section>
    </main>
    </>
  )
}

export default SupervisarSolicitudes