const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const modeloCarro = [
    "onix",
    "uno",
    "amarok",
];

const tipoCombustivel = [
    "gasolina",
    "flex",
    "diesel",
];

const marca = [
    "chevrolet",
    "fiat",
    "volkswagen",
];

const anoCarro = [
    2015,
    2003,
    2019
];

app.get('/', (req,res) =>{
    res.send("Bem Vido a locadora Velozes e Furiosos")
})

app.get('/carros', (req, res) =>{
    res.send(`
    ${modeloCarro},
    ${tipoCombustivel},
    ${marca},
    ${anoCarro}
    `)
})

app.get('/carros/:id', (req, res)=>{
    const id = req.params.id -1;
    const mod = modeloCarro[id];
    const tip = tipoCombustivel[id];
    const mar = marca[id];
    const ano = anoCarro[id];
    if (!mod || !tip || !mar || !ano){
        res.send("O Carro não consta na lista!!!");
    }
    res.send(`${mod}, ${tip}, ${mar}, ${ano}`);
});

app.post('/carros/:id', (req, res)=>{
    const mod = req.body.modelo;
    const tip = req.body.combustivel; 
    const mar = req.body.marca;
    const ano = req.body.ano;
    modeloCarro.push(mod);
    tipoCombustivel.push(tip);
    marca.push(mar);
    anoCarro.push(ano);

    res.send(`O carro ${mod}, tipo ${tip}, marca ${mar}, ano ${ano}
    foi adicionado ao catalogo com sucesso`)
});

app.put('/carros/:id', (req, res)=>{
    const id = req.params.id -1;
    const mod = req.body.modelo;
    const tip = req.body.combustivel; 
    const mar = req.body.marca;
    const ano = req.body.ano;
    if (!mod || !tip || !mar || !ano){
        res.send("O Carro não consta na lista!!!");
    }
    modeloCarro[id] = mod;
    tipoCombustivel[id] = tip;
    marca[id] = mar;
    anoCarro[id] = ano;

    res.send(`O carro' foi atualizado com Sucesso.
    Novo carro '${mod}'`)
});

app.delete('/carros/:id', (req, res)=>{
    const id = req.params.id -1;
    const modeloanterior = modeloCarro[id]
    modeloCarro.splice(id,1);
    tipoCombustivel.splice(id,1);
    marca.splice(id,1);
    anoCarro.splice(id,1);
    res.send(`"O Carro ${modeloanterior} excluido com sucesso."`)
  });


app.listen(port, ()=>{
    console.info(`App esta rodando em: http://localhost:${port}/`);
});

