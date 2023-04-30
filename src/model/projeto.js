const mongoose = require('mongoose')

const projetoSchema = new mongoose.Schema({
    titulo: {
        type: String,        
        required: true,
        trim: true
    },
    codigo_externo: String,
    descricao: String,
    nome_cliente: String,
    tipo: {
        type: String,
        enum: ['interno', 'externo']
    },
    etapa: {
        type: String,
        enum: ['backlog', 'analise', 'andamento', 'concluido', 'cancelado']
    },
    previsao_conclusao: Date,
    inicio_projeto: Date,
    final_projeto: Date,
    horas_estimadas: {
        type: Number,
        min: 0.00
    },
    colaboradores: [
        {
            id: mongoose.Types.ObjectId,
            nome: String,
            cargo: String,
            funcao: {
                id: mongoose.Types.ObjectId,
                nome: String
            },
            equipe: {
                id: mongoose.Types.ObjectId,
                nome: String
            }
        }
    ]
}, 
{ collection: 'Projeto' })

exports.SchemaProjeto = projetoSchema
exports.ModelProjeto = mongoose.model('Projeto', projetoSchema)