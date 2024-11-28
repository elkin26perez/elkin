import express from 'express'
import routerAdmin from './src/router/admin.routes.js'
import routerPermisos from './src/router/permisos.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import { connectionDBMongoose } from './src/database/connection.js'

const PORT = process.env.PORT ?? 4321
const app = express()


connectionDBMongoose()
app.use(cookieParser())
app.use("/", express.static("dist", {redirect: false} ))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cors({credentials:true,origin:'http://localhost:5173'}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))


app.use('/api/admin', routerAdmin)
app.use('/api/permisos', routerPermisos)



app.get("*", (req,res,next) =>{
    res.sendFile(process.cwd() + '/dist/index.html')
})

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server on port ${PORT}`);
})
