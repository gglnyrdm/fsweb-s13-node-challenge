const express = require('express');
const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

const server = express();
server.use(express.json());
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;