import { customAxiosAdmin } from "@/interceptor/axios.interceptor"
import { UseAdminStore } from "@/store/adminstore"
import { toast, Toaster } from "sonner"

const LoginAdministradores = () => {
    const login = UseAdminStore(state => state.setAdmin)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault()
        const dataFromForm = Object.fromEntries(new FormData(event.currentTarget)) as {name: string,email: string,  password: string} 

        const request = await customAxiosAdmin.post("admin", dataFromForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(request.status === 200){
            toast.success("login exitoso")
            const admin: admin = {
                email: dataFromForm.email,
                rol: "admin"
            }
            login(admin)
            setTimeout(()=>{
                location.href= "/administracion"
            }, 2000 )
            return
        }

        toast.error("Ocurrió un error, intenta nuevamente")
    }

  return (
    <section className="flex h-screen flex-col">
        <nav className="h-10 bg-blue-300 w-full text-blue-800 font-bold flex items-center justify-center p-4 text-2xl">Administración</nav>
        <div className="w-full m-[0,auto] flex items-center justify-center min-h-screen flex-col gap-3"> 
            <form className="max-w-[600px] border rounded p-4 w-full items-center justify-center text-center" onSubmit={handleSubmit}>
                <h1 className="font-bold text-2xl ">Login administradores</h1>
                <label htmlFor="email" className="flex flex-col items-start w-full">
                    Email:
                    <input type="text" id="email" name="email"  className="bg-gray-200 p-2 rounded w-full" />
                </label>
                <label htmlFor="password" className="flex flex-col items-start w-full">
                    Contraseña:
                    <input type="text" id="password" name="password" className="bg-gray-200 p-2 rounded w-full" />
                </label>
                
                <button className="cursor-pointer bg-blue-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:ring-2 hover:ring-blue-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2 mt-6 w-full">
                    Enviar
                </button>
            </form>
            <a className="cursor-pointer max-w-[600px] text-center bg-blue-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:ring-2 hover:ring-blue-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2 mt-6 w-full" href="/crearAdmin">¿Aún no tienes cuenta?, Solicita una</a>
            <Toaster richColors/>
        </div>
    </section>
  )
}

export default LoginAdministradores