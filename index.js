const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: []
  }
];

function logRequests(req, res, next) {
  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(params => params.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project does not exists" });
  }
  return next();
}

// lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//cria um novo projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

//editar projeto
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(params => params.id == id);

  project.title = title;

  return res.json(project);
});

// deleta o projeto
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(params => params.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

// cria uma tarefa
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(params => params.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3333);
