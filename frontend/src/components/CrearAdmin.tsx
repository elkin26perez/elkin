import { customAxios } from "@/interceptor/axios.interceptor"
import { toast, Toaster } from "sonner"

const CrearAdmin = () => {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault()
        const dataFromForm = Object.fromEntries(new FormData(event.currentTarget)) as {name: string,email: string,  password: string} 
        const request = await customAxios.post("admin/crear", dataFromForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(request.status === 201){
            toast.success("Administrador creado correctamente")
            return
        }

        toast.error("Ocurrió un error, intenta nuevamente")
    }

  return (
    <section className=" h-screen flex flex-col">
        <nav className="h-10 bg-blue-300 w-full text-blue-800 font-bold flex items-center justify-center p-4 text-2xl">Administración</nav>
        <div className="w-full m-[0,auto] flex items-center justify-center min-h-screen flex-col gap-3"> 
            <form className="max-w-[600px] border rounded p-4 w-full text-center" onSubmit={handleSubmit} >
                <h1 className="font-bold text-2xl ">Registro de administradores</h1>
                <div className="w-ful flex flex-col items-center gap-4">

                    <label htmlFor="name" className="flex flex-col items-start w-full">
                        <span className="font-bold">
                            Nombre:
                        </span>
                        <input type="text" id="name" name="name" className="bg-gray-100 p-2 rounded w-full transition-all duration-300 focus:border-blue-300 focus:bg-blue-100" />
                    </label>
                    <label htmlFor="email" className="flex flex-col items-start w-full">
                        <span className="font-bold">
                            Correo electrónico:
                        </span>
                        <input type="text" id="email" name="email" className="bg-gray-100 p-2 rounded w-full transition-all duration-300 focus:border-blue-300 focus:bg-blue-100" />
                    </label>
                    <label htmlFor="password" className="flex flex-col items-start w-full">
                        <span className="font-bold">
                            Contraseña:
                        </span>
                        <input type="text" id="password" name="password"  className="bg-gray-100 p-2 rounded w-full transition-all duration-300 focus:border-blue-300 focus:bg-blue-100" />
                    </label>
                    

                    
                </div>
                <button className="cursor-pointer bg-blue-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:ring-2 hover:ring-blue-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2 mt-6 w-full">
                    Enviar
                </button>
            </form>
            <a className="cursor-pointer max-w-[600px] text-center bg-blue-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:ring-2 hover:ring-blue-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2 mt-6 w-full" href="/login">¿Eres administrador?, inicia sesión</a>
            <Toaster richColors/>
        </div>
    </section>
  )
}

export default CrearAdmin