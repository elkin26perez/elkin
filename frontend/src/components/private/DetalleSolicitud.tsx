import { useParams } from 'react-router-dom'
import Aside from './Aside'
import { useEffect, useState } from 'react'
import { customAxiosAdmin } from '@/interceptor/axios.interceptor'
import { toast, Toaster } from 'sonner'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDF } from '../pdf/Pdf'

const DetalleSolicitud = () => {
    const { id } = useParams()
    console.log(id);
    
    const [detalles,setDetalles] = useState<solict|null> (null)
    
    
    async function getDetails() {
        const request = await customAxiosAdmin.get(`admin/solicitudes/${id}`,{
            headers:{
                "Content-Type": "application/json"
            }
        })
        if(request.status === 200){
            setDetalles(request.data.data)

        }
    }



const handleClick = async (parametro: string) => {
        try {
            const response = await customAxiosAdmin.post(`admin/solicitudes/${id}/editar`, {
                estatus: parametro}, {headers:{"Content-Type": "application/json"}}
            );
            
            if (response.status === 200) {
                toast.success("Se ha actualizado el estado de la solicitud")
                setTimeout(()=>{
                    location.reload()
                },2000)
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    useEffect(()=>{
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
    <>
    <main className="grid grid-cols-[300px,1fr] w-full m-[0,auto] place-content-center place-items-center">
      <Aside />
      <section className="w-full flex flex-col items-start justify-start h-full p-2">
        <div className="w-full h-full  flex items-center flex-col justify-center">
            <h1 className='font-bold text-2xl text-blue-500'>Solicitud número: {id} </h1>

            <div>
                {detalles &&
                        <article  className="w-full flex flex-col border  item rounded p-1 text-lg">
                            <div className="p-1 w-full ">
                                <p className="font-bold block">Puesto en cola: <span className="font-normal">{detalles._id}</span> </p>
                                <p className="font-bold block">Tipo de trabajo: <span className="font-normal">{detalles.tipotrabajo}</span> </p>
                                <p className="font-bold block">Duración horas: <span className="font-normal">{detalles.duraciontrabajo}</span> </p>
                                <p className="font-bold block">Riesgo del trabajo: <span className="font-normal">{detalles.riesgotrabajo}</span> </p>
                                <p className="font-bold block">Solicitud: <span className="font-normal">{detalles.urgencia}</span> </p>
                                <p className="font-bold block">Estatus: <span className="font-normal">{detalles.estatus}</span> </p>
                                <p className="font-bold block">Fecha de creación: <span className="font-normal">{detalles.fecha_creacion}</span> </p>
                            </div>
                            <a href={detalles.file} download={detalles.file} className='className="cursor-pointer bg-blue-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:ring-2  px-5 py-2 mt-6 w-full flex  items-center justify-evenly "'>
                                <span>
                                    Ver documento adjunto
                                </span>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
                              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                            </svg>
                            </a>
                            <PDFDownloadLink document={<PDF solicitud={detalles}  />} >
                            <button className="flex w-full my-2 bg-blue-200 text-white items-center justify-center border p-1 rounded">
                                Descargar pdf 
                            </button>
                            </PDFDownloadLink>
                            {
                                detalles.estatus === "pendiente" &&

                                <div className='flex items-center justify-between my-2'>
                                    <button className='border border-green-500 p-2 rounded '  onClick={()=> handleClick("aprobada")}>Aprobar ✅ </button>
                                    <button className='border border-red-500 p-2 rounded ' onClick={()=> handleClick("rechazada")}>Rechazar ❌</button>
                                </div>
                            }

                        </article>
                }

            </div>
        </div>
      </section>
    </main>
    <Toaster richColors/>
    </>
  )
}

export default DetalleSolicitud