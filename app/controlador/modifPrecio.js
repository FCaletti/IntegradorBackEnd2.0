const { desconectaMongoDB, mandaDatos } = require("../modelo/dbConectar");
const { nomColeccion } = require("../modelo/nomColeccion");

const modifPrecio = async (req, res) =>{
   const codigoArt = parseInt(req.params.Ncodigo) || undefined;
   if(codigoArt === undefined || codigoArt == 0){
      res.status(400)
         .json({msjEstado : 'Error al acceder al código'})
      return;
   }

   const nuevoPrecio = parseFloat(req.body.precio) || false
   if (!nuevoPrecio){
      res.status(400).json({msjEstado : "Precio no especificado"})
      return;
   }

   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl)))
   if (datosColecc.errorCod){
      res.status(400).json({msjEstado : datosColecc.errorDesc})
      return
   }

   let verArticulo = await datosColecc.findOne({codigo: codigoArt})  
   if (!verArticulo){
      res.status(404).json({msjEstado : `No se encontró Artículo con código ${codigoArt}`})
      return
   }

   const cambiaArt = await datosColecc.updateOne({codigo : codigoArt}, {$set : {precio : nuevoPrecio}})
   if (cambiaArt) {
      verArticulo = await datosColecc.findOne({codigo: codigoArt})
      verArticulo.msjEstado = 'Precio del artículo actualizado satisfactoriamente'
      res.status(200).json(verArticulo)
   } else {
      res.status(404).json({msjEstado : `No se pudo actualizar el artículo ${codigoArt}`})
   }
   await desconectaMongoDB()
}

module.exports = { modifPrecio }