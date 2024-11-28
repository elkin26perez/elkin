const data = [
    {
        name: "Inicio",
        link: "/"
    },
    {
        name: "Solicitar permiso",
        link: "/solicitar"
    }
] as const


const NavBar = () => {
  return (
    <header>
        <div>
            <img src="" alt="" />
        </div>
        <div>
            <nav>
                {data.map(item=>{
                    return(
                        <li>
                            <a href={item.link}> {item.name} </a>
                        </li>
                    )
                })}
            </nav>
        </div>
    </header>
  )
}

export default NavBar