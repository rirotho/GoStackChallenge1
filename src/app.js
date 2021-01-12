/*
A rota deve receber title, url e techs dentro do corpo da requisição, 
sendo a URL o link para o github desse repositório. 
Ao cadastrar um novo projeto, 
ele deve ser armazenado dentro de um objeto no seguinte 
formato: {  id: "uuid", title: 'Desafio Node.js', 
            url: 'http://github.com/...', 
            techs: ["Node.js", "..."],
            likes: 0 }; 
 Certifique-se que o ID seja um UUID, e de sempre iniciar os likes como 0.



*/

const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const countLikes = 0;

app.get("/repositories", (request, response) => {
  // TODO
  const { id } = request;
  response.send(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO

  const { title, url, techs, likes } = request.body;

  if (likes === true) {
    countLikes = countLikes + 1;
  }

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: countLikes
  }

  repositories.push(repository);

  response.json({
    id: "uuid",
    title: title,
    url: url,
    techs: techs,
    likes: countLikes
  })
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  console.log("ID:");
  console.log(id);
  console.log("Fim ID:");
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  console.log("Index:");
  console.log(repositoryIndex);
  console.log("Fim Index:");
  if (repositoryIndex < 0) {
    return response.status(400).send("Error");
  }

  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;
  return response.json({
    message: "Changed"
  })

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).send("Error");
  }

  repositories.splice(repositoryIndex, 1);
  response.json({
    message: "Deleted"
  })
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).send("Error");
  }
  repositories[repositoryIndex].likes += 1;
  response.json({
    message: "Liked"
  })
});

module.exports = app;
