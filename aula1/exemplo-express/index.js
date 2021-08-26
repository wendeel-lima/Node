const express = require('express');
const app = express();

app.get("/", function(req, res){
    res.send("Hello World")

})

app.get('/blue', function(req,res){
    res.send("Bem Vindo Blummer")
})

app.listen(3001)

console.log("Exemplo de node!!")