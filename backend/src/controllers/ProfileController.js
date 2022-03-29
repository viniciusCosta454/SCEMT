const connection = require("../database/connection")

module.exports = {

    async index(request,response) {

        const empresa_id = request.headers.authorization

        const produtos = await connection("Produtos").where("empresa_id", empresa_id).select("*")

        return response.json(produtos)
    },
    async clientes(request,response) {

        const empresa_id = request.headers.authorization

        const clientes = await connection("Clientes").where("empresa_id", empresa_id).select("*")

        return response.json(clientes)
    },
    async vendedor(request,response) {

        const empresa_id = request.headers.authorization

        const vendedor = await connection("Vendedor").where("empresa_id", empresa_id).select("*")

        return response.json(vendedor)
    },
    async entrega(request,response) {

        const empresa_id = request.headers.authorization

        const entrega = await connection("Entrega").where("empresa_id", empresa_id).select("*")

        return response.json(entrega)
    },
    async financeiro(request,response) {

        const empresa_id = request.headers.authorization

        const financeiro = await connection("Financeiro").where("empresa_id", empresa_id).select("*")

        return response.json(financeiro)
    }
}