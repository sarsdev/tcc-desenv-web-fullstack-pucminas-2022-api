const fs = require('fs')
const { ModelUsuario } = require('./../model/usuario')
const { ModelPermissao } = require('./../model/permissao')
const { ModelAcessibilidade } = require('./../model/acessibilidade')
const { ModelFuncao } = require('./../model/funcao')
const { ModelEquipe } = require('./../model/equipe')
const { ModelProjeto } = require('./../model/projeto')
const { ModelAgenda } = require('./../model/agenda')
const { ModelConfigAgenda } = require('./../model/configuracao-agenda')

// Inicial

exports.RetornarTesteInicialApi = new Promise((resolve, reject) => {
    fs.readFile('./docs/api-doc.html', 'utf8', function(err, data){
        if(err){
            reject('Bem vindo ao ApontaDev! Estamos sem a documentação no momento (')
            return
        }
        resolve(data)
    })
}).catch(() => 'Bem vindo ao ApontaDev! Estamos sem a documentação no momento (')

// Usuário

exports.ListaUsuarios = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.email){
        filtro = { ...filtro, email: params.email }
    }
    await ModelUsuario.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno
}

exports.InsereUsuario = async (dados) => {
    let retorno = {}
    const usuario = new ModelUsuario(dados)
    await usuario.save()
        .then(info => { 
            InsereConfigAgenda({
                id_colaborador: info._id,
                ordena_grid_por_ultimo: false,
                mostra_obg_apos_apont: false,
                encerra_apont_ao_iniciar_outro: false,
                total_horas_jornada: 28800000,
                texto_padrao_obs: ''
            })
            retorno = { erro: false, dados: info } 
        })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaUsuario = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelUsuario.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

// Permissão

exports.ListaPermissoes = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.tipo){
        filtro = { ...filtro, tipo: params.tipo }
    }
    if(params.idusuario){
        filtro = { ...filtro, "usuario.selecionados.id": params.idusuario }
    }
    if(params.tela){
        filtro = { ...filtro, "usuario.tela.id": params.tela }
    }
    await ModelPermissao.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno
}

exports.InserePermissao = async (dados) => {
    let retorno = {}
    const permissao = new ModelPermissao(dados)
    await permissao.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.RemovePermissao = async (params) => {
    let retorno = {}
    if(params.id) {
        let filtro = { _id: params.id }
        await ModelPermissao.deleteOne(filtro)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O parâmetro id do documento não foi informado na requisição' }
    }
    return retorno
}

// Acessibilidade

exports.ListaPadroesAcessibilidade = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.email){
        filtro = { ...filtro, "usuario.email": params.email }
    }
    await ModelAcessibilidade.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno
}

exports.InserePadroesAcessibilidade = async (dados) => {
    let retorno = {}
    const padrao = new ModelAcessibilidade(dados)
    await padrao.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaPadroesAcessibilidade = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelAcessibilidade.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

// Função

exports.ListaFuncoes = async (params) => {    
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.nome){
        filtro = { ...filtro, nome: { '$regex': params.nome, '$options': 'i' } }
    }
    await ModelFuncao.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno
}

exports.InsereFuncao = async (dados) => {
    let retorno = {}
    const funcao = new ModelFuncao(dados)
    await funcao.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaFuncao = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelFuncao.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

// Equipe

exports.ListaEquipes = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.nome){
        filtro = { ...filtro, nome: { '$regex': params.nome, '$options': 'i' } }
    }
    await ModelEquipe.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno  
}

exports.InsereEquipe = async (dados) => {
    let retorno = {}
    const equipe = new ModelEquipe(dados)
    await equipe.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaEquipe = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelEquipe.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

// Projeto

exports.ListaProjetos = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.usuarioid){
        filtro = { ...filtro, "colaboradores.id": params.usuarioid }
    }
    await ModelProjeto.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno  
}

exports.InsereProjeto = async (dados) => {
    let retorno = {}
    const projeto = new ModelProjeto(dados)
    await projeto.save()
        .then(info => {
            InsereAgenda({
                projeto: {
                    id: info._id,
                    tipo: info.tipo,
                    titulo: info.titulo,
                    descricao: info.descricao,
                    nome_cliente: info.nome_cliente,
                    previsao_conclusao: info.previsao_conclusao,
                    horas_estimadas: info.horas_estimadas,
                    integrantes: info.colaboradores && info.colaboradores.length > 0 ? info.colaboradores.map(v => v.id) : []
                },
                apontamentos: []
            })
            retorno = { erro: false, dados: info } 
        })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaProjeto = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelProjeto.updateOne(filtro, dados)
            .then(info => {
                ListarAgenda({ projetoid: dados._id })
                .then((agenda) => {
                    agenda.dados[0].projeto.tipo = dados.tipo
                    agenda.dados[0].projeto.titulo = dados.titulo
                    agenda.dados[0].projeto.descricao = dados.descricao
                    agenda.dados[0].projeto.nome_cliente = dados.nome_cliente
                    agenda.dados[0].projeto.previsao_conclusao = dados.previsao_conclusao
                    agenda.dados[0].projeto.horas_estimadas = dados.horas_estimadas
                    agenda.dados[0].projeto.integrantes = dados.colaboradores && dados.colaboradores.length > 0 ? dados.colaboradores.map(v => v.id) : []
                    AtualizarAgenda(agenda.dados[0])
                })
                retorno = { erro: false, dados: info } 
            })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

// Agenda

const ListarAgenda = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.projetoid){
        filtro = { ...filtro, "projeto.id": params.projetoid }
    }
    if(params.usuarioid){
        filtro = { ...filtro, "projeto.integrantes": params.usuarioid }
    }
    await ModelAgenda.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno  
}
exports.ListaAgenda = ListarAgenda

const InsereAgenda = async (dados) => {
    let retorno = {}
    const agenda = new ModelAgenda(dados)
    await agenda.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

const AtualizarAgenda = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelAgenda.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}
exports.AtualizaAgenda = AtualizarAgenda

// Configuração da Agenda

const ListarConfigAgenda = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.usuarioid){
        filtro = { ...filtro, id_colaborador: params.usuarioid }
    }
    await ModelConfigAgenda.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno  
}
exports.ListaConfigAgenda = ListarConfigAgenda

const InsereConfigAgenda = async (dados) => {
    let retorno = {}
    const agenda = new ModelConfigAgenda(dados)
    await agenda.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

const AtualizarConfigAgenda = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelConfigAgenda.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}
exports.AtualizaConfigAgenda = AtualizarConfigAgenda