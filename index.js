const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//FAKE DB
const db =  {
    games: [
        {   id: 1,
            name: 'fifa 14',
            year: 2013,
            price: 10
        },

        {
            id: 2,
            name: 'days gone',
            year: 2019,
            price: 100
        }
    ]
}


//INICIANDO O SERVIDOR
app.listen(4000, ()=>{
    console.log('server init')
})


//DEFININDO ROTAS

//retornandos todos
app.get('/games', (req,res)=>{
    res.statusCode = 200
    res.send(db.games)
})

//retornando apenas um
app.get('/game/:id',(req,res)=>{
    if(!isNaN(req.params.id)){
        let id = parseInt(req.params.id)

        value = db.games.find(i => i.id == id)
        if(value != undefined){
            res.statusCode = 200
            res.json(value)
        }else{
            res.statusCode = 404
            res.send('value not found in db')
        }
    }else{
        res.statusCode = 400
        res.send("type value not accepted")
    }
    
})

//cadastrando um jogo
app.post('/game', (req,res)=>{
    let {id, name, year, price} = req.body
    let verify = db.games.find(v => v.id == id)
    if(verify == undefined){
        res.statusCode = 200
        db.games.push({id, name, year, price})
        res.json(id,name,year,price)
    }else{
        res.statusCode = 400
        res.send('id já encontrado, não será possivel adicionar')
    }
})

//deletando um game
app.delete('/game/:id', (req,res)=>{
    if(!isNaN(req.params.id)){
        let id = parseInt(req.params.id)
        let verify = db.games.findIndex(v => v.id == id)
        if(verify != -1){
            res.statusCode = 200
            db.games.splice(verify, 1)
            res.send("")
        }else{
            res.statusCode = 404
            res.send("")
        }
    }
})

//alterar dados
app.put('/game/:id', (req,res)=>{
    if(!isNaN(req.params.id)){
        let id = parseInt(req.params.id)
        let verify = db.games.find(v => v.id == id)
    
        if(verify != undefined){
            let {name, year, price} = req.body
            if(name != undefined){
                verify.name = name
            }

            if(year != undefined){
                verify.year = year
            }

            if(price != undefined){
                verify.price = price
            }
            res.statusCode = 200
            res.send('')
        }else{
            res.statusCode = 404
        }
    }else{
        res.statusCode = 400
    }
})


