const http = require('http');

http.createServer(function(req, res){
    res.end('<h1>Olá<h1>');
    
}).listen(3000);

console.log("meu servidor rodando")
