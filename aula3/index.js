const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());


const filmes = [
    'Matrix',
    'Vingadores',
    'Velozes e Furiosos'
];

app.get('/', (req, res)=>{
    res.send("Hello World");
});

app.get('/filmes', (req, res)=>{
    res.send(filmes);
});
app.post('/filmes', (req, res)=>{
    const filme = req.body.filme;
    const id = filmes.length +1;
    filmes.push(filme);

    res.send(`O filme adicionado foi ${filme}.
    O id é ${id}`)
});

app.get('/filmes/:id', (req, res)=>{
    const id = req.params.id -1;
    const filme = filmes[id];

    if (!filme) {
        res.send('Filmes não encontrado');
    };
    res.send(filme);
});

app.put('/filmes/:id', (req, res)=>{
    const id = req.params.id -1;
    const filme = req.body.filme;

    filmes[id] = filme

    res.send(`Filme Atualizado com Sucesso: ${filme}`)
});

app.delete('/filmes/:id', (req, res)=>{
    const id = req.params.id -1;
    delete filmes [id];
 

    res.send("filme excluido com sucesso")
});

app.listen(port, function(){
    console.log(` App rodando em http://localhost:${port}/`)
});


// //sugestao da galera SPLICE
// app.delete('/filmesSplice/:id', (req,res)=>{
//     const id = req.params.id-1;
//     filmes.splice(id,1)
//     //delete filmes[id]
//     res.send("Filme excluido com sucesso.")
//   });
  