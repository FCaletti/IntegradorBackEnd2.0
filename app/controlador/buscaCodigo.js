const { desconectaMongoDB, mandaDatos } = require("../modelo/dbConectar");
const { nomColeccion } = require("../modelo/nomColeccion");

const buscaCodigo = async (req, res) => {

   const codigoArt = parseInt(req.params.Ncodigo) || undefined;
   if(codigoArt === undefined || codigoArt == 0){
      res.status(400)
         .json({msjEstado : 'Error al acceder al código'})
      return;
   }

   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl)))
   if (!datosColecc.errorCod){
      let respuesta = await datosColecc.findOne({codigo: codigoArt}) 
      if (respuesta) {
         respuesta.msjEstado = 'Artículo encontrado satisfactoriamente'
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


module.exports = {buscaCodigo}