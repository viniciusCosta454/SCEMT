const connection = require("../database/connection")

module.exports = {

    async index(request,response) {

        const empresa_id = request.headers.authorization

        const empresa = await connection("Empresa").where("empresa_id", empresa_id).select("*")

        return response.json(empresa)
    },
    async membro(request,response) {

        const empresa_id = request.headers.authorization

        const membro = await connection("Membro").where("empresa_id", empresa_id).select("*")

        return response.json(membro)
    },
    async equipe(request,response) {

        const empresa_id = request.headers.authorization

        const equipe = await connection("Equipe").where("empresa_id", empresa_id).select("*")

        return response.json(equipe)
    },
    async projeto(request,response) {

        const empresa_id = request.headers.authorization

        const projeto = await connection("Projeto").where("Projeto.empresa_id", empresa_id).join("Equipe","Equipe.id","=","Projeto.equipe_id").select(["Projeto.*","Equipe.nome as equipe_nome"])
        //const projeto = await connection("Projeto").where("empresa_id", empresa_id).select("*")
        
        
        return response.json(projeto)
    }
}