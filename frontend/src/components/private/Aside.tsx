const Aside = () => {
    function handleClick() {
        localStorage.clear()
        setTimeout(()=>{
            location.href = "/"
        },2000)
    }

    return (
    <aside className=" min-h-screen w-full h-full grow flex flex-col justify-start items-center border px-2">
        <div className="w-full text-center border my-4 rounded p-2">
            <h1 className="font-bold text-2xl  text-blue-500">Administración</h1>
        </div>
        <ul className="w-full py-4 gap-3 flex flex-col" >
        <li className="w-full flex">
                <a href={"/administracion"} className="w-full border flex rounded p-2 items-center justify-evenly transition-all duration-300 hover:bg-blue-300" > 
                    <span>
                        Inicio
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
                  </svg>
                </a>
            </li>
            <li className="w-full flex">
                <a href={"/administracion/solicitudes"} className="w-full border flex rounded p-2 items-center justify-evenly transition-all duration-300 hover:bg-blue-300" > 
                    <span>
                        Gestionar solicitudes
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" className="bi bi-card-checklist" viewBox="0 0 16 16">
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                      <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                    </svg>
                </a>
            </li>

            <li className="w-full flex">
                <a href={"/administracion/solicitudes/crear"} className="w-full border flex rounded p-2 items-center justify-evenly transition-all duration-300 hover:bg-blue-300" > 
                    <span>
                        Crear solicitud
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="blue" className="bi bi-plus-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </a>
            </li>
        </ul>
        <div className="mt-[300px]">
            <button onClick={handleClick}  className="cursor-pointer bg-red-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-red-700 hover:ring-2 hover:red-blue-800 hover:shadow-xl hover:shadow-red-500 focus:ring-red-300 focus:shadow-red-400 px-5 py-2 mt-6 w-full">Cerrar sesión</button>
        </div>
    </aside>
  )
}

export default Aside