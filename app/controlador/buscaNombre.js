const { desconectaMongoDB, mandaDatos } = require("../modelo/dbConectar");
const { nomColeccion } = require("../modelo/nomColeccion");

const buscaNombre = async (req, res) =>{
   const nombre = req.params.Nnombre || undefined
   if(nombre === undefined || nombre <= ' '){
      res.status(400)
         .json({msjEstado : 'Error al acceder al texto buscado'})
      return;
   }

   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl)))
   if (!datosColecc.errorCod){
      let respuesta = await datosColecc.find({nombre: {$regex : nombre, $options : 'i' }}).toArray() // 'i' evita q sea case-sensitive
      if (respuesta.length > 0) {
         res.status(200).json(respuesta)
      }else {
         res.status(404).json({msjEstado : 'No se encontraron datos'})
      }  
   } else {
      res.status(datosColecc.errorCod)
         .json({msjEstado : datosColecc.errorDesc})
   }
   await desconectaMongoDB()
}

module.exports = { buscaNombre }