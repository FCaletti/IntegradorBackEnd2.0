const { desconectaMongoDB, mandaDatos } = require("../modelo/dbConectar");
const { nomColeccion } = require("../modelo/nomColeccion");

const borraArticulo = async (req, res) => {
   const codigoArt = parseInt(req.params.Ncodigo) || undefined
   if(codigoArt === undefined || codigoArt == 0){
      res.status(400)
         .json({msjEstado : 'Error al acceder al código'})
      return;
   }

   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl)))
   if (datosColecc.errorCod){
      res.status(datosColecc.errorCod)
         .json({msjEstado : datosColecc.errorDesc})
      return
   }

   let verArticulo = await datosColecc.findOne({codigo: codigoArt})  
   if (!verArticulo){
      res.status(404).json({msjEstado : `No se encontró Artículo con código ${codigoArt}`})
      return
   }

   const borraArt = await datosColecc.deleteOne({codigo : codigoArt})
   if (borraArt) {
      res.status(200).json({msjEstado : `Artículo ${codigoArt} eliminado satisfactoriamente`})
   } else {
      res.status(400).json({msjEstado : `No se pudo eliminar el artículo ${codigoArt}`})
   }
   await desconectaMongoDB()
}


module.exports = {borraArticulo}