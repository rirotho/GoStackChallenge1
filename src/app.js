const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const countLikes = 0;

app.get("/repositories", (request, response) => {
  const { id } = request;
  response.send(repositories);
});

app.post("/repositories", (request, response) => {
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
  response.send({
    message: "Post successful!"
  })
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
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
