const express = require("express") // aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir esta api no front-end

const conectaBancoDeDados = require('./bandoDeDados') // aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados() // aqui estou chamando a função que conecta o banco de dados

const mulher = require('./mulherModel')

const app = express() // aqui estou iniciando o app
app.use(express.json()) // aqui estou tratando a requisição (tratamento de dados na request). O body também será json
app.use(cors()) // aqui estou liberando a minha aplicação para ser usada a partir do front-end

const porta = 3333 // aqui estou criando a porta

// GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoDancoDeDados = await mulher.find()

        response.json(mulheresVindasDoDancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

// POST
async function criaMulher(request, response) {
    const novaMulher = new mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mullherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mullherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

// DELETE
async function deletaMulher(request, response) {
    try {
        await mulher.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Mulher deletada com sucesso!'})
    } catch (erro) {
        console.log(erro)
    }
}

// rotas
app.use(router.get('/mulheres', mostraMulheres)) // configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // configurei rota PATCH /mulheres
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei rota DELETE /mulheres

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta) // servidor ouvindo a porta