const { desconectaMongoDB, mandaDatos } = require("../modelo/dbConectar");
const { nomColeccion } = require("../modelo/nomColeccion");

const buscaTodo = async (req, res) =>{
   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl)))
   if (!datosColecc.errorCod){
      let respuesta = await datosColecc.find().toArray()  // busco todos los articulos y las almaceno en un array
      if (respuesta.length > 0) { 
         res.status(200).json(respuesta)
      } else {
         res.status(404).json({msjEstado : 'No se encontraron datos'})
      }
   } else {
      res.status(datosColecc.errorCod).json({msjEstado : datosColecc.errorDesc})
   }
   await desconectaMongoDB()
}

module.exports = {buscaTodo}