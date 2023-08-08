const { buscaTodo } = require('../controlador/buscaTodo')
const { buscaCodigo } = require('../controlador/buscaCodigo')
const { buscaNombre } = require('../controlador/buscaNombre')
const { agregaArticulo } = require('../controlador/agregaArt')
const { modifPrecio } = require('../controlador/modifPrecio')
const { borraArticulo } = require('../controlador/borraArt')

const { buscaPrecio, buscaRangoPrecio, errorReq } = require('../controlador/controladores')

let rutearIni = require('express').Router()
let rutear = require('express').Router()
let rutearErr = require('express').Router()

rutearIni.get('/', (req,res)=>{     // peticion raiz
   res.status(200).json({msjEstado : 'Bienvenido a la web de insumos de computación'})
})

rutear.get('/', buscaTodo)
rutear.get('/all', buscaTodo)

rutear.get('/id/:Ncodigo', buscaCodigo)
rutear.get('/id/*', buscaCodigo)

rutear.get('/nombre/:Nnombre', buscaNombre)
rutear.get('/nombre/*', )

rutear.post('/nuevo', agregaArticulo)

rutear.patch('/reempPrecio/:Ncodigo', modifPrecio)
rutear.patch('/reempPrecio/*', modifPrecio)

rutear.delete('/borraCodigo/:Ncodigo', borraArticulo)
rutear.delete('/borraCodigo/*', borraArticulo)


rutear.get('/precio/eq/:NPrecio', buscaPrecio)
rutear.get('/precio/gt/:NPrecio', buscaPrecio)
rutear.get('/precio/gte/:NPrecio', buscaPrecio)
rutear.get('/precio/lt/:NPrecio', buscaPrecio)
rutear.get('/precio/lte/:NPrecio', buscaPrecio)
rutear.get('/precio/ran/:NRango', buscaRangoPrecio)

rutearErr.all('/*', errorReq)

module.exports = {rutearIni, rutear, rutearErr}
