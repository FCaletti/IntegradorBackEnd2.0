const { desconectaMongoDB, mandaDatos } = require("../modelo/dbConectar");
const { nomColeccion } = require("../modelo/nomColeccion");


const agregaArticulo = async (req, res) => {
   const datosColecc = await mandaDatos(nomColeccion((req.baseUrl))) // datosColecc contiene los documentos de la coleccion
   const ultimoDoc = await datosColecc.find().sort({codigo:-1}).limit(1).toArray() // busco 1er registro ordenado x codigo desc
   if(!ultimoDoc){
      res.status(400)
         .json({msjEstado : "Error al crear el código del nuevo artículo"})
      return;
   }

   const nuevoCodigo = (ultimoDoc.length == 0) ? 1 : parseInt(ultimoDoc[0].codigo) + 1
   const nuevoNombre = (req.body.nombre)? req.body.nombre : 'Desconocido'
   const nuevoPrecio = (req.body.precio)? parseFloat(req.body.precio) : 0
   const nuevaCateg = (req.body.categoria)? req.body.categoria : 'Desconocida'

   const nuevoArt = {
      "codigo": nuevoCodigo,
      "nombre": nuevoNombre,
      "precio": nuevoPrecio,
      "categoria": nuevaCateg
   }
   const creaArt = await datosColecc.insertOne(nuevoArt)
   if (creaArt) {
      nuevoArt.msjEstado = 'Artículo agregado satisfactoriamente'
      res.status(200).json(nuevoArt)
   } else {
      res.status(400).json({msjEstado : `No se pudo crear el nuevo artículo`})
   }
   await desconectaMongoDB()
}


module.exports = { agregaArticulo }