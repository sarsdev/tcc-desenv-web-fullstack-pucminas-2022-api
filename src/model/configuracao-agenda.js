const mongoose = require('mongoose')

const configuracaoAgendaSchema = new mongoose.Schema({
    id_colaborador: mongoose.Types.ObjectId,
    ordena_grid_por_ultimo: Boolean,
    mostra_obg_apos_apont: Boolean,
    encerra_apont_ao_iniciar_outro: Boolean,
    total_horas_jornada: Number,
    texto_padrao_obs: String
}, 
{ collection: 'ConfigAgenda' })

exports.SchemaConfigAgenda = configuracaoAgendaSchema
exports.ModelConfigAgenda = mongoose.model('ConfigAgenda', configuracaoAgendaSchema)