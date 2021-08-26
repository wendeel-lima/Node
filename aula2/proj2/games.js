const express = require('express');
const app = express();

const porta = 3000;

app.use(express.json());

const games = [
    'Bomberman',
    'SuperMarioWorld',
    'KillerInstitct',
    'MortalKombat'
];

aleatorio = (min, max) => {
    Math.floor(Math.random() * (max - min)) + min;
};

jogos = (id) => {
    games[id];
}
app.get('/', (req,res) =>{
    res.send("Bem vindo a Game dvd mania");
});

app.get('/games', (req, res)=>{
    res.send(games);
});

app.get('/games/:id', (req, res)=>{
    const id = req.params.id -1;
    const game = games[id];
    if (!game ){
        res.send("O game não consta na lista!!!");
        console.warn("O game não consta na lista!!!")
    }
    res.send(game);   
});

app.post('/games/:id', (req, res)=>{
    const game = req.body.game;
    const id = game.length +1;
    games.push(game);

    res.send(`O Game '${game}' foi adicionado com sucesso.
    O id é '${id}'`) 
});

app.put('/games/:id', (req, res)=>{
    const id = req.params.id -1;
    const game = req.body.game;
    const gameAnterior = games[id]
    if (!game){
        res.send("O game não consta na lista!!!");
        console.warn("O game não consta na lista!!!")
    }
    
    games[id] = game

    res.send(`O game '${gameAnterior}' foi atualizado com Sucesso.
    Novo game '${game}'`)
});

app.delete('/games/:id', (req,res)=>{
    const id = req.params.id-1;
    const gameAnterior = games[id]
    games.splice(id,1)
    res.send(`"Game: '${gameAnterior}' excluido com sucesso."`)
  });

app.get('/aleatorio', (req, res)=>{
    res.send(`${jogos(aleatorio(0, games.length))}`);
});

app.listen(porta, ()=>{
    console.info(`App esta rodando em: http://localhost:${porta}/`);
});