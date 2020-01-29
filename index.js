const express = require("express");

const server = express();

server.use(express.json());

const users = ["Diego", "Cláudio", "Victor"];

// Middleware Global - Middlewar de log da nossa aplicação:
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url};`);

  next();

  console.timeEnd("Request");
});

// Middleware Local - Ele vai la no corpo da minha requisição e vai procurar se existe a informação name, caso nao encontre ele vai retornar um erro para o usuário com a mensagem.
// Caso nao entra nesse IF ele vai chamar o Middleware da rota normalmente.
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

// Middleware Local - Ele vai fazer a checagem para ver se o usuário está cadastrado dentro do nosso Array de users.
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

// Rota de mostrar todos os usuários:
server.get("/users", (req, res) => {
  return res.json(users);
});

// Rota de mostrar um único usuário por meio do seu index:
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

// Rota de criação de usuários:
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Rota para editar algum usuário:
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Rota para deletar algum usuário:
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
