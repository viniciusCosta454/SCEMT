const connection = require("../database/connection")

<<<<<<< Updated upstream:backend/src/controllers/SprintController.js
module.exports = {}
=======
module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Cost").count()

        const Projeto = await connection("Cost")
        .join("Projeto","Projeto.id","=","Projeto.id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "Projeto.*",
            "Empresas.name",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
            "Equipe.nome",
        ])
        
        response.header("X-Total-Count",count['count(*)'])
        return response.json(Projeto)
    },

    async create(request,response) {
        const {projeto_id, nome, tipo, iPlan, tRelPlan, tamPlan, tamR} = request.body
        const empresa_id = request.headers.authorization

        //Tratar campos vazios

        const [id] = await connection("Cost").insert({
            nome,
            tipo,
            iPlan,
            tRelPlan,
            tamPlan,
            tamR,
            projeto_id
        })

        return response.json({id})
    },


}
>>>>>>> Stashed changes:backend/src/controllers/CostController.js
