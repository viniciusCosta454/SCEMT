const express = require("express")
var multer = require('./middlewares/multer')

const EmpresaController = require("./controllers/EmpresaController")
const ProdutoController = require("./controllers/ProdutoController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")
const ClienteController = require("./controllers/ClienteController")
const VendedorController = require("./controllers/VendedorController")
const PedidoController = require("./controllers/PedidoController")
const EntregaController = require("./controllers/EntregaController")
const PdfController = require("./controllers/PdfController")
const FinanceiroController = require("./controllers/FinanceiroController")

const routes = express.Router()

routes.post("/sessions",SessionController.create)

routes.get("/pdf/:id",PdfController.index)

routes.get("/profile",ProfileController.index)
routes.get("/profile/cliente",ProfileController.clientes)
routes.get("/profile/vendedor",ProfileController.vendedor)
routes.get("/profile/entrega",ProfileController.entrega)
routes.get("/profile/financeiro",ProfileController.financeiro)

routes.get("/empresas",EmpresaController.index)
routes.post("/empresas",EmpresaController.create)
routes.delete("/empresas",EmpresaController.delete)

routes.get("/produtos",ProdutoController.index)
routes.post("/produtos", multer.array("photos", 6),ProdutoController.create)
routes.delete("/produtos/:id",ProdutoController.delete)
routes.put('/produtos/:id', ProdutoController.edit)

routes.get("/clientes",ClienteController.index)
routes.post("/clientes",ClienteController.create)
routes.delete("/clientes/:id",ClienteController.delete)
routes.put('/clientes/:id', ClienteController.edit)

routes.get("/vendedor",PedidoController.index)
routes.post("/vendedor",VendedorController.create)
routes.delete("/vendedor/:id",VendedorController.delete)

routes.get("/financeiro",FinanceiroController.index)
routes.post("/financeiro",FinanceiroController.create)
routes.delete("/financeiro/:id",FinanceiroController.delete)

routes.get("/pedido",PedidoController.index)
routes.get("/soma",PedidoController.soma)
routes.post("/pedido",PedidoController.create)
routes.delete("/pedido/:id",PedidoController.delete)

routes.get("/entrega",EntregaController.index)
routes.post("/entrega",EntregaController.create)
routes.delete("/entrega/:id",EntregaController.delete)
routes.put('/entrega/:id', EntregaController.edit)

module.exports = routes