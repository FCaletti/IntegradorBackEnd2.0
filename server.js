const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { rutear, rutearErr, rutearIni } = require('./app/rutas/ruteo')
const app = express()
const puerto = process.env.PORT
const corsOp = {
   inicio : `http://localhost:${puerto}`
}


app.use(cors(corsOp)) //dominio + puerto
app.use(express.json()) // content-type - application/json
app.use(express.urlencoded({ extended: true })) // content-type - application/x-www-form-urlencoded
app.use((req, res, next) => {
   res.header("Content-Type", "application/json; charset=utf-8")  
   next()
})
app.use('/computacion', rutear)
app.use('/', rutearIni)
app.use('/*', rutearErr)

module.exports = app.listen(puerto, ()=>{
   console.log(`Servidor iniciado en ${puerto}`);
})
