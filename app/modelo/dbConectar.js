const { MongoClient } = require("mongodb");
const { dbUrl } = require("../config/dbConfig");

const MngClient = new MongoClient(dbUrl)

const conectaMongoDB = async () =>{
   try {
      await MngClient.connect();
      //console.log('Conexión a MongoDB exitosa')
      return(MngClient)
   } 
   catch (error) {
      console.error ('Error al intentar conectar a MongoDB :', error )
      return null
   }
}

const desconectaMongoDB = async () =>{
   try {
      await MngClient.close();
      //console.log('Desconectado de MongoDB')
   } 
   catch (error) {
      console.error ('Error al intentar desconectar de MongoDB :', error )
   }
}

const mandaDatos = async (coleccion) => {
   const cliente = await conectaMongoDB()
   if (!cliente){
      return({'errorCod':500,'errorDesc':'Error al conectarse al servidor'})
   }
   
   const dbIntegrador = await cliente.db('Integrador')
   if (!dbIntegrador){
      return({'errorCod':500,'errorDesc':'Error al acceder a la base de datos <<Integrador>>'})
   }

   const datos = await dbIntegrador.collection(coleccion)
   if (!datos){
      return({'errorCod':500,'errorDesc':`Error al acceder a la colección <<${coleccion}>>`})
   } else {
      return datos
   }
}

module.exports = {mandaDatos, desconectaMongoDB}
