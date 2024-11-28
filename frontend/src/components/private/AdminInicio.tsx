import Aside from "./Aside"
import Allsolicitudes from "../Allsolicitudes"
import { customAxiosAdmin } from "@/interceptor/axios.interceptor";
import { useEffect, useState } from "react";
const AdminInicio = () => {

  const [total,setTotal] = useState <number> (0)
  async function allSolicitudesData() {
    const request = await customAxiosAdmin.get('admin/solicitudes', {
      headers: {
        "content-type":"application/json",
      },
      withCredentials: true
    })
    
    if(request.status === 200){
      setTotal(request.data.data.length)
    }
  }

  useEffect(()=>{
    allSolicitudesData()
  },[])
  return (
    <>
    <main className="grid grid-cols-[300px,1fr] w-full  place-content-center place-items-center">
      <Aside/>
      <section style={{height: "100%", width: "100%", marginTop: "1em"}} className="grid w-full h-full grid-rows-2 my-4 px-4" >
        <div className="grid grid-cols-2">
        <Allsolicitudes />
        <div className="grid grid-rows-3 py-4 my-4   rounded-lg shadow-lg text-center w-full">
          <div className="flex justify-center items-center bg-white bg-opacity-50 rounded-lg h-32 text-blue-600 font-medium">
            "Gestiona tus solicitudes de manera rápida y eficiente."
          </div>

          <div className="flex justify-center items-center bg-white bg-opacity-50 rounded-lg h-32 text-blue-600 font-medium">
            Todo con un clic, fácil y rápido.
          </div>

          <div className="flex justify-center items-center bg-white bg-opacity-50 rounded-lg h-32 text-blue-600 font-medium">
            "Ahorra tiempo y mantén todo bajo control."
          </div>
        </div>
        </div>
        <section className=" w-full flex items-start justify-center h-full">
          <div className="h-full  w-full px-4 max-h-[300px] rounded flex  bg-gradient-to-r from-blue-50 to-sky-300 items-center justify-center font-bold gap-2">
            <h1>Total de solicitudes: </h1>
            <span className=" rounded-full size-6 border-white shadow shadow-blue-800 text-center">
              {total}
            </span>
          </div>
        </section>
      </section>
    </main>
    </>
  )
}

export default AdminInicio