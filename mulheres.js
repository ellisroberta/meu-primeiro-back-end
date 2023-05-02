const express = require("express") // aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid') // aqui estou iniciando o UUID

const conectaBancoDeDados = require('./bandoDeDados') // aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados() // aqui estou chamando a função que conecta o banco de dados

const app = express() // aqui estou iniciando o app
app.use(express.json()) // aqui estou tratando a requisição. O body também será json
const porta = 3333 // aqui estou criando a porta

// aqui estou criando a lista inicial de mulherea
const mulheres = [
    {
        id: '1',
        nome: 'Simara Conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e Instrutora'
    },
    {
        id: '2',
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'Fundadora PrograMaria'
    },
    {
        id: '3',
        nome: 'Nina da Hora',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Hacker antirracista'
    }
]

// GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}

// POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

//PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher
        }
    }

    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }

    response.json(mulheres)
}

// DELETE
function deletaMulher(request, response) {
    function  todasMenosEla(mulher) {
        if (mulher.id !== request.params.id)
        return mulher
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
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