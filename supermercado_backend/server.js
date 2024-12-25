import express from 'express'
import router from './routes/routes.js'
import cors from 'cors'
const app = express()
const port = 5000

app.use(express.json())
app.use(cors({origin:'http://localhost:5173'}))

app.use('/api',router)


app.listen(port,()=>{
    console.log(`Servidor rodando na porta  http://localhost:${port}`)
})