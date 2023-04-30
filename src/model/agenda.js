const mongoose = require('mongoose')

const agendaSchema = new mongoose.Schema({
    projeto: {
        id: mongoose.Types.ObjectId,
        tipo: String,
        titulo: String,
        descricao: String,
        nome_cliente: String,
        previsao_conclusao: Date,
        horas_estimadas: Number,
        integrantes: [mongoose.Types.ObjectId]
    },
    apontamentos: [
        {
            colaborador: {
                id: mongoose.Types.ObjectId,
                nome: String
            },
            data: Date,
            hora_inicial: Date,
            hora_final: Date,
            saldo: Number,
            observacao: String
        }
    ]
}, 
{ collection: 'Agenda' })

exports.SchemaAgenda = agendaSchema
exports.ModelAgenda = mongoose.model('Agenda', agendaSchema)