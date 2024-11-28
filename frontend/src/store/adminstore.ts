import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StateAdministracion {
    admin: admin | null
    sesion: boolean | null
    setAdmin: (admin: admin)=>void
    detalleid: number | null,
    setDetailSolicitud: (id:number)=>void
}

export const UseAdminStore = create<StateAdministracion>()(persist((set) => {
    return {
        admin: null,
        detalleid: null,
        sesion: null,
        setAdmin(admin) {
            set({ admin: admin, sesion: true})
        },
        setDetailSolicitud(id) {
            set({ detalleid: id })
        },
    }
}, {
    name: 'administracion'
}))