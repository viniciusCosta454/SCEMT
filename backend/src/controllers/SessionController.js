const connection = require("../database/connection")

module.exports = {

    async create(request, response ) {

        const { id } = request.body

        const empresa = await connection("Empresas")
        .where("id",id)
        .select("name")
        .first()

        if (!empresa) {

            return response.status(400).json({erro : "Nao encontramos empresa com esse ID"})
        }
        return response.json(empresa)
    }

}