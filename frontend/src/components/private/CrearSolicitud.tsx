import Aside from "./Aside"
import { customAxios } from "@/interceptor/axios.interceptor";
import {  useState } from "react";
import { toast, Toaster } from "sonner";

const CrearSolicitud = () => {

  const [word,setWord] = useState <File |null> (null)
  const [tipoDeSolicitud,setTipoDeSolicitud] = useState<string> ("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
          setWord(event.target.files[0]);
      }
  };

  const handleUrgenciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setTipoDeSolicitud(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      
      const dataFromForm = Object.fromEntries(new FormData(event.currentTarget)) as {tipotrabajo: string,duraciontrabajo: string,  riesgotrabajo: string} 



      if(!dataFromForm.tipotrabajo || !dataFromForm.riesgotrabajo || !dataFromForm.duraciontrabajo || !word || !tipoDeSolicitud){
          toast.error("Faltan datos por enviar.")
          return
      }
      const formData = new FormData();
      formData.append("tipotrabajo", dataFromForm.tipotrabajo);
      formData.append("duraciontrabajo", dataFromForm.duraciontrabajo);
      formData.append("riesgotrabajo", dataFromForm.riesgotrabajo);
      formData.append("urgencia", tipoDeSolicitud);
  
      if (word) {
          formData.append("file", word);
      }
      
      const request = await customAxios.post("permisos", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      if (request.status === 201) {
          toast.success("Hemos creado una solicitud")
      }
      
      if(request.status === 400){
          toast.error(request.data.message)
      }
      
  }
  return (
    <>
    <main className="grid grid-cols-[300px,1fr] w-full  place-content-center place-items-center">
      <Aside/>
      <section className="w-full flex items-center justify-center" >
      <form className="max-w-[600px] border rounded p-4 w-full" onSubmit={handleSubmit} >
            <h1 className="font-bold text-2xl ">Solicitar un permiso</h1>
            <div className="w-ful flex flex-col items-center gap-4">

                <label htmlFor="tipotrabajo" className="flex flex-col items-start w-full">
                    <span className="font-bold">
                        Tipo de trabajo:
                    </span>
                    <input type="text" id="tipotrabajo" name="tipotrabajo" className="bg-gray-100 p-2 rounded w-full transition-all duration-300 focus:border-blue-300 focus:bg-blue-100" />
                </label>
                <label htmlFor="duraciontrabajo" className="flex flex-col items-start w-full">
                    <span className="font-bold">
                        Duración estimada:
                    </span>
                    <input type="number" id="duraciontrabajo" name="duraciontrabajo" className="bg-gray-100 p-2 rounded w-full transition-all duration-300 focus:border-blue-300 focus:bg-blue-100" />
                </label>
                <label htmlFor="riesgotrabajo" className="flex flex-col items-start w-full">
                    <span className="font-bold">
                        Riesgos de trabajo:
                    </span>
                    <input type="text" id="riesgotrabajo" name="riesgotrabajo"  className="bg-gray-100 p-2 rounded w-full transition-all duration-300 focus:border-blue-300 focus:bg-blue-100" />
                </label>
                <label htmlFor="urgencia" className="flex flex-col items-start w-full">
                    <span className="font-bold">
                        Tipo de solicitud:
                    </span>
                    <select value={tipoDeSolicitud} onChange={handleUrgenciaChange} className="w-full bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer ">
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="urgencias">Urgente</option>
                        <option value="citamedica">Personal</option>
                        <option value="capacitacion">Capacitación</option>
                    </select>
                </label>

                <label className="flex flex-col items-start w-full text-start font-bold">Subir archivo:</label>
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 20 20">
                      <path d="M16.88 9.94l-3.29-3.29A1 1 0 0012.79 6H9V3.5A1.5 1.5 0 007.5 2h-5A1.5 1.5 0 001 3.5v13A1.5 1.5 0 002.5 18h15a1.5 1.5 0 001.5-1.5v-5a1 1 0 00-.29-.71zm-5.88 1a1 1 0 11-2 0v-4a1 1 0 112 0v4zM5 6h4v2H5V6z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Seleccionar archivo</span>
                    <input type="file" className="hidden" name="file" accept=".docx" id="file" onChange={handleFileChange} />
                </label>

            </div>
            <button className="cursor-pointer bg-blue-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:ring-2 hover:ring-blue-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2 mt-6 w-full">
                Enviar
            </button>
        </form>
      </section>
      <Toaster richColors/>
    </main>
    </>
  )
}

export default CrearSolicitud