const express = require("express")
var multer = require('./middlewares/multer')

const EmpresaController = require("./controllers/EmpresaController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")
const PdfController = require("./controllers/PdfController")
const MembroController = require("./controllers/MembroController")
const EquipeController = require("./controllers/EquipeController")
const ProjetoController = require("./controllers/ProjetoController")
const ProbeAddController = require("./controllers/ProbeAddController")
const ProbeReusedBaseController = require("./controllers/ProbeReusedBaseController")

const routes = express.Router()

routes.post("/sessions",SessionController.create)

routes.get("/pdf/:id",PdfController.index)

routes.get("/profile",ProfileController.index)
routes.get("/profile/membro",ProfileController.membro)
routes.get("/profile/equipe",ProfileController.equipe)
routes.get("/profile/listagem_equipes",ProfileController.listEquipes)
routes.get("/profile/projeto",ProfileController.projeto)
routes.get("/profile/probeAdd",ProfileController.probeAdd)
routes.get("/profile/probeReusedBase",ProfileController.probeReusedBase)
routes.get("/profile/projetoDados/:projetoId",ProfileController.projetoDados)

routes.get("/empresas",EmpresaController.index)
routes.post("/empresas",EmpresaController.create)
routes.delete("/empresas",EmpresaController.delete)

routes.get("/Membro",MembroController.index)
routes.post("/Membro",MembroController.create)
routes.delete("/Membro/:id",MembroController.delete)
routes.put('/Membro/:id', MembroController.edit)

routes.get("/Equipe",EquipeController.index)
routes.post("/Equipe",EquipeController.create)
routes.delete("/Equipe/:id",EquipeController.delete)

routes.get("/Projeto",ProjetoController.index)
routes.post("/Projeto",ProjetoController.create)
routes.delete("/Projeto/:id",ProjetoController.delete)

routes.get("/ProbeAdd",ProbeAddController.index)
routes.post("/ProbeAdd",ProbeAddController.create)
routes.delete("/ProbeAdd/:id",ProbeAddController.delete)

routes.get("/ProbeReusedBase",ProbeReusedBaseController.index)
routes.post("/ProbeReusedBase",ProbeReusedBaseController.create)
routes.delete("/ProbeReusedBase/:id",ProbeReusedBaseController.delete)

module.exports = routes