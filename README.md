# gameShop
 api Rest de uma loja fictícia de games<br>

## Endpoints

### GET /games
endpoint responsável por retornar todos os jogos cadastrado
#### Parâmetros
nenhum
#### Respostas
```sh
Ok, 200
```
> caso essa resposta ocorra ele retornará todos os dados de games 

```
Bad Request, 400
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token não é setado.

```
Not Found, 404
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token é invalido.

##### Exemplo de resposta:
``` 
{
    "db": [
        {
            "id": 1,
            "name": "fifa 14",
            "year": 2013,
            "price": 10
        },
        {
            "id": 2,
            "name": "days gone",
            "year": 2019,
            "price": 100
        }
    ],
    "_auth": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImdhYnMiLCJlbWFpbCI6ImdhYnNAbWFpbC5jb20iLCJpYXQiOjE2MjI4MjU2NzUsImV4cCI6MTYyMjk5ODQ3NX0.ofnxoKyBmpMNr5dwnPiud9HMT5aWZXtceOq2dwXv3VI",
        "log": {
            "id": 1,
            "email": "gabs@mail.com"
        }
    }
}
```

### GET /game/:id
endpoint responsável por retorna o jogo dependendo pelo id recebido.

#### Parâmetros
- id
> Este parametro é o indentificador de cada game<br>
> ele obrigatoriamente deve ser do tipo inteiro

#### Respostas
```sh
Ok, 200
```
> caso essa resposta ocorra ele retornará o jogo que tenha o id igual ao recebido por parâmetro

```
Bad Request, 400
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o tipo de dado do parâmetro id for difente de int.

```
Not Found, 404
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando não é encontrado um game que tenha o id igual ao recebido por parâmetro.


```
Bad Request, 400
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token não é setado.

```
Not Found, 404
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token é invalido.

##### Exemplo de resposta:
```
{
    "id": 1,
    "name": "fifa 14",
    "year": 2013,
    "price": 10
}
```

### POST /auth
Endpoint responsável por autenticar o usuario e retornar o token valido para utilizar os outros endpoints.<br>

#### Parametro
Nenhum.

#### Respostas
```sh
Ok, 200
```
> caso essa resposta ocorra ele retornará o token

```
Internal Server Error, 500
```
> caso essa resposta ocorra ele não retornará o token.<br>
> Esse erro ocorre quando houver algum problema interno, referente ao servidor da aplicação.

```
Bad Request, 400
```
> caso essa resposta ocorra ele não retornará o token.<br>
> Esse erro ocorre quando os dados do login não forem encontrados.

##### Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImdhYnMiLCJlbWFpbCI6ImdhYnNAbWFpbC5jb20iLCJpYXQiOjE2MjI4MzI3MjgsImV4cCI6MTYyMzAwNTUyOH0.dCDhGGzAGqJaRuhrx-ceubpP1H-P26DewurLBCuYAG0"
}
```

### POST /game
endpoint responsável por criar um novo game

#### Parâmetros 
- id
> Este parâmetro deve ser um inteiro, ele é passado porque a api está consumindo um array que simula um bd
- name
- year
- price

#### Respostas
```sh
Ok, 200
```
> caso essa resposta ocorra ele retornará um objeto com os dados cadastrados

```
Bad Request, 400
```
> caso essa resposta ocorra, nada sera retornado.<br>
> Esse erro ocorre quando o Id setado já existir no banco de dados(no caso o array que simula o bd).<br>
> Caso utilizar essa api e desejar retirar essa validação ela ficará da seguinte maneira:

forma original: 
```
app.post('/game',auth,(req,res)=>{
    let {id, name, year, price} = req.body
    let verify = db.games.find(v => v.id == id) // aqui está ocorrendo a verificação pelo id
    if(verify == undefined){
        res.statusCode = 200
        db.games.push({id, name, year, price})
        res.json(id,name,year,price)
    }else{
        res.statusCode = 400
        res.send('id já encontrado, não será possivel adicionar')
    }
})
```

você pode validar por nome de produto:

```
  app.post('/game',auth,(req,res)=>{
    let {id, name, year, price} = req.body
    let verify = db.games.find(v => v.name == name) // aqui está ocorrendo a verificação pelo nome
    if(verify == undefined){
        res.statusCode = 200
        db.games.push({id, name, year, price})
        res.json(id,name,year,price)
    }else{
        res.statusCode = 400
        res.send('id já encontrado, não será possivel adicionar')
    }
})
```


```
Bad Request, 400
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token não é setado.

```
Not Found, 404
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token é invalido.

##### Exemplo de Resposta:

```
{
    "id": "3",
    "name": "league of legends",
    "year": 2009,
    "price": "100"
}
```

### DELETE /game/:id
Endpoint responsavel por deletar o game do banco

#### Parâmetros
- Id
> O Parâmetro deve ser um inteiro.<br>
> Ele é o indentificador do game que deve ser deletado.


#### Respostas
```sh
Ok, 200
```
> caso essa resposta ocorra ele retornará um objeto com a mensagem de sucesso.<br>

```sh
Not Found, 404
```
> caso essa resposta ocorra, foi porque o game a ser deletado não foi encontrado no bd.<br>


```
Bad Request, 400
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token não é setado.

```
Not Found, 404
```
> caso essa resposta ocorra ele não listara nada.<br>
> Esse erro ocorre quando o token é invalido.

##### Exemplo de Resposta:

```
{
    "msg": "game deletado com sucesso"
}
```


### PUT /game/:id
endpoint responsavel por fazer alteração no game desejado

#### Parâmetros
- id
> O Parâmetro deve ser um inteiro<br>
> Ele é o indentificador do game que vai ser alterado
- name 
> Este parâmetro vai ser recebido no post da requisição
- year
> Este parâmetro vai ser recebido no post da requisição
- price
> Este parâmetro vai ser recebido no post da requisição

#### Respostas

```sh
Ok, 200
```
> caso essa resposta ocorra, ele retornará um objeto com a mensagem de sucesso.<br>

```sh
Not Found, 404
```
> caso essa resposta ocorra, foi porque não foi encontrado no banco de dados um game com o id igual ao do parâmetro<br>

```sh
Not Found, 400
```
> caso essa resposta ocorra, foi porque o tipo de dado do parâmtro id, não é um inteiro<br>

##### Exemplo de Resposta:
```
{
    "msg": "game alterado com sucesso"
}
```

















