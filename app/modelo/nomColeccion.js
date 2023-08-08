const nomColeccion = (urlBase) =>{
   switch (urlBase){
      case '/computacion' :
         return 'computacion'
      default :
         return ''
   }
}


module.exports = {nomColeccion}
