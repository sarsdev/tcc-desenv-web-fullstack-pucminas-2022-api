const mongoose = require('mongoose')

/*
Temas: 
    - Dia
    - Noite
    - Frio
    - Quente
    - Marcante
    - Suave
*/
const temaSchema = new mongoose.Schema({
    titulo: String
}, 
{ collection: 'Tema' })

exports.SchemaTema = temaSchema
exports.ModelTema = mongoose.model('Tema', temaSchema)