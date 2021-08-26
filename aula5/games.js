const express = require("express");
const app = express();

app.use(express.json());

const porta = 3000;

const games = [
  {
    id: 001,
    nome: "Super Mario World",
    urlImagem:
      "https://upload.wikimedia.org/wikipedia/pt/0/06/Super-Mario-World.jpg",
  },
  {
    id: 002,
    nome: "Killer Instinct",
    urlImagem:
      "https://4.bp.blogspot.com/-wnpMxu_JudU/V8svKiHfN1I/AAAAAAAACQU/-eFE92oYYscsrodu9AMwiMF3mZlMrImKwCLcB/s1600/Killer-Instinct.jpg",
  },
  {
    id: 003,
    nome: "Top Gear",
    urlImagem:
      "https://s2.glbimg.com/7wRs2j2dg9fbZpdIRG5TkSEMPSA=/0x0:913x579/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/l/A/zPe6OzRnitN3F1rd77Gw/captura-de-tela-2020-04-24-as-10.06.52.png",
  },
  {
    id: 004,
    nome: "Mortal Kombat Ultimate",
    urlImagem:
      "https://static.wikia.nocookie.net/mortalkombat/images/8/8a/Img_ultimate_mortal_kombat_3_capa_1.jpg/revision/latest?cb=20201022075714&path-prefix=pt-br",
  },
  {
    id: 005,
    nome: "Bomberman",
    urlImagem:
      "https://i0.wp.com/galaxianerd.com/wp-content/uploads/2018/02/super-bomberman-ps3-destravado-envio-via-email-D_NQ_NP_828190-MLB26633900091_012018-F.jpg",
  },
];

//funções

const getGamesValidos = () => games.filter(Boolean); //retorna apenas os itens validos na lista
const getGamesById = (id) => getGamesValidos().find((game) => game.id === id); // busca na lista o "id" e não o indice
const getIndexByGame = (id) =>
  getGamesValidos().findIndex((game) => game.id === id); //busca na lista o "index" de acordo com o id informado.

app.get("/games", (req, res) => {
  res.send(getGamesValidos());
});

app.get("/games/:id", (req, res) => {
  const id = +req.params.id; //uso do Unary Plus "+" para retornar o id como number
  const game = getGamesById(id);
  if (!game) {
    res.send("O game não consta na lista!!!");
  }
  res.send(game);
});

app.post("/games", (req, res) => {
  const game = req.body;
  if (!game || !game.nome || !game.urlImagem) {
    res.status(400).send({
      message: "O Game inserido não é valido, tente novamente!!",
    });
    return;
  }

  const ultimoGame = games[games.length - 1];

  if (games.length) {
    game.id = ultimoGame.id + 1;
    games.push(game);
  } else {
    game.id = 1;
    games.push(game);
  }

  res.send(`
  O game ${game.nome} foi adicionado com sucesso.
  Id: ${game.id}.
  `);
});

app.put("/games/:id", (req, res) => {
  const id = +req.body.id - 1;
  const gameIndex = getIndexByGame(id);

  if (gameIndex < 0) {
    res.status(404).send({
      message: "O Game não foi encontrado, tente novamente!!",
    });
    return;
  }

  const novoGame = req.body;
  if (!Object.keys(novoFilme).length) {
    res.status(400).send({
      message: "O Game não foi preenchido corretamente. Tente novamente!!",
    });
    return;
  }
  if (!novoGame || !novoGame.nome || !novoGame.urlImagem) {
    res.status(400).send({
      message: "O Game inserido não é valido, tente novamente!!",
    });
    return;
  }

  const game = getGamesById(id);

  games[gameIndex] = {
    //spread operator "..."
    ...game,
    ...novoGame,
  };
  res.send(games[gameIndex]);
});

app.delete("/games/:id", (req, res) => {
  const id = +req.params.id;
  const gameIndex = getIndexByGame(id);
  if (gameIndex < 0) {
    res.status(404).send({
      message: "O Game não foi encontrado, tente novamente!!",
    });
    return;
  }
  games.splice(gameIndex, 1);
  res.send({
    message: "O game foi excluido com sucesso",
  });
});

app.listen(porta, () => {
  console.info(`App esta rodando em: http://localhost:${porta}/`);
});
