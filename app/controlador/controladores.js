const { desconectaMongoDB, mandaDatos } = require("../modelo/dbConectar");
const { nomColeccion } = require("../modelo/nomColeccion");
const path = require('path')

const errorReq = (req, res)=>{
   res.status(400).json({msjEstado : `URL no identificada`})
}

const buscaPrecio = async (req, res) =>{
   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl)))
   if (!datosColecc.errorCod){
      let carpetas = path.parse(req.path).dir.split('/')
      let operador = carpetas[carpetas.length-1]
      let respuesta = []
      const precio = parseFloat(req.params.NPrecio) || 0
      switch (operador){
         case 'eq' :
            respuesta = await datosColecc.find({precio: {$eq : precio}}).toArray()
            break
         case 'gt' :
            respuesta = await datosColecc.find({precio: {$gt : precio}}).toArray()
            break
         case 'gte' :
            respuesta = await datosColecc.find({precio: {$gte : precio}}).toArray()
            break
         case 'lt' :
            respuesta = await datosColecc.find({precio: {$lt : precio}}).toArray()
            break
         case 'lte' :
            respuesta = await datosColecc.find({precio: {$lte : precio}}).toArray()
            break
         }
      if (respuesta.length > 0) {
         res.status(200).json(respuesta)
      }else {
         res.status(404).json({msjEstado : 'No se encontraron datos'})
      }  
   } else {
      res.status(datosColecc.errorCod).json({msjEstado : datosColecc.errorDesc})
   }
   await desconectaMongoDB()
}

const buscaRangoPrecio = async (req, res) =>{
   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl)))
   if (!datosColecc.errorCod){
      const param = req.params.NRango || '0-0'
      const valores = param.split('-')
      const valor1 = (valores.length == 2)? parseFloat(valores[0]) : 0
      const valor2 = (valores.length == 2)? parseFloat(valores[1]) : 0
      const respuesta = (valor1 <= valor2)
         ? await datosColecc.find({precio: {$gt : valor1, $lt : valor2}}).toArray()
         : await datosColecc.find({precio: {$gt : valor2, $lt : valor1}}).toArray()
      if (respuesta.length > 0) {
         res.status(200).json(respuesta)
      }else {
         res.status(404).json({msjEstado : 'No se encontraron datos'})
      }  
   } else {
      res.status(datosColecc.errorCod).json({msjEstado : datosColecc.errorDesc})
   }
   await desconectaMongoDB()
}

module.exports = { errorReq, buscaPrecio, buscaRangoPrecio}