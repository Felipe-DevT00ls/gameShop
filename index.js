const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require("cors")
const jwt = require('jsonwebtoken');
const secret = "jsjdsfhsjffa";


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



// MIDDLEWARE
const auth = (req, res, next) =>{
    let token = req.headers["authorization"]
    if(token != undefined){
        let auth = token.split(" ")[1]
        jwt.verify(auth, secret, (err, data)=>{
            if(err){
                res.statusCode = 400
                res.json({"err": "invalid token"})
            }else{
                res.statusCode = 200
                req.authenticated = auth
                req.dataLog = {id: data.id, name: data.name, email: data.email}
                next()
            }
        })

    }else{
        res.statusCode = 404
        res.json({"err": "not found token"})
    }
 }



//FAKE DB
const db =  {
    games: [
        {   
            id: 1,
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
    ],

    user: [
        {
            id: 1,
            name: "gabs",
            email: "gabs@mail.com",
            pass: "12345"
        },
        {
            id: 2,
            name: "mukinha",
            email: "mukinha@mail.com",
            pass: "mukinha123"
        }
    ]
}


//INICIANDO O SERVIDOR
app.listen(4000, ()=>{
    console.log('server init')
})


//DEFININDO ROTAS


    //GET
//retornandos todos
app.get('/games',auth, (req,res)=>{
    let {authenticated, dataLog} = req
    res.statusCode = 200
    res.json({db: db.games, "_auth": {"token": authenticated, "log": dataLog}})
})

//retornando apenas um
app.get('/game/:id',auth,(req,res)=>{
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

//autenticando usuario
app.post("/auth",auth,(req,res)=>{
    let {email, pass} = req.body
    value = db.user.find(data => data.email == email && data.pass == pass)
    if(value != undefined){
        jwt.sign({"id": value.id, "name": value.name, "email": value.email}, secret, {expiresIn: "48h"},(err, token)=>{
            if(err){
                res.statusCode = 500
                res.json({"err": "error :("})
            }else{
                res.json({"token": token})
            }
        })
    }else{
        res.statusCode = 400
        res.json({"err": "invalid credentials"})
    }
})


    //POST
//cadastrando um jogo
app.post('/game',auth,(req,res)=>{
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


    //DELETE
//deletando um game
app.delete('/game/:id',auth,(req,res)=>{
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


    //PUT
//alterar dados
app.put('/game/:id',auth,(req,res)=>{
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



