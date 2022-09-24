const express = require("express")
var multer = require('./middlewares/multer')

const EmpresaController = require("./controllers/EmpresaController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")
const PdfController = require("./controllers/PdfController")
const MembroController = require("./controllers/MembroController")
const EquipeController = require("./controllers/EquipeController")
const ProjetoController = require("./controllers/ProjetoController")
const EffortController = require("./controllers/EffortController")
const CostController = require("./controllers/CostController")

const routes = express.Router()

routes.post("/sessions",SessionController.create)

routes.get("/pdf/:id",PdfController.index)

routes.get("/profile",ProfileController.index)
routes.get("/profile/membro",ProfileController.membro)
routes.get("/profile/equipe",ProfileController.equipe)
routes.get("/profile/listagem_equipes",ProfileController.listEquipes)
routes.get("/profile/projeto",ProfileController.projeto)
routes.get("/profile/effort",ProfileController.effort)
routes.get("/profile/cost",ProfileController.cost)

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
routes.get("/Projeto",ProjetoController.indexComponente)

routes.post("/Projeto",ProjetoController.create)
routes.post("/Projeto",ProjetoController.createComponente)

routes.delete("/Projeto/:id",ProjetoController.delete)
//routes.delete("/Projeto/:id",ProjetoController.deleteComponente)

<<<<<<< Updated upstream
//routes.get("/Sprint",SprintController.index)
//routes.post("/Sprint",SprintController.create)
//routes.delete("/Sprint/:id",SprintController.delete)
=======
routes.get("/Effort",EffortController.index)
routes.post("/Effort",EffortController.create)
//routes.delete("/Effort/:id",EffortController.delete)

routes.get("/Cost",CostController.index)
routes.post("/Cost",CostController.create)
//routes.delete("/Cost/:id",CostController.delete)
>>>>>>> Stashed changes

module.exports = routes