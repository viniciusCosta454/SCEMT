const connection = require("../database/connection")

module.exports = {

    async index(request,response) {

        const empresa_id = request.headers.authorization

        const empresa = await connection("Empresa").where("empresa_id", empresa_id).select("*")

        return response.json(empresa)
    },
    async membro(request,response) {

        const empresa_id = request.headers.authorization

        //const membro = await connection("Membro").where("empresa_id", empresa_id).select("*")

        const membro = await connection("Membro").where("Membro.empresa_id", empresa_id).join
        ("Equipe","Equipe.id","=","Membro.equipe_id").select(["Membro.*","Equipe.nome as equipe_nome"])

        return response.json(membro)
    },
    async equipe(request,response) {

        const empresa_id = request.headers.authorization

        const equipe = await connection("Equipe").where("empresa_id", empresa_id).select("*")

        // const equipe = await connection("Equipe").where("Equipe.empresa_id", empresa_id).select(["Equipe.*"])

        // const equipe = await connection("Equipe").where("Equipe.empresa_id", empresa_id).leftJoin("Membro","Membro.equipe_id","=", "Equipe.id").select(["Equipe.*","Membro.nome as membro_nome"])

        // const membros = await connection("Membro").where("Membro.empresa_id", empresa_id).select(["Membro.nome","Membro.equipe_id"])

        return response.json(equipe)
    },
    async listEquipes(request,response) {

        const empresa_id = request.headers.authorization

        // const equipe = await connection("Equipe").where("empresa_id", empresa_id).select("*")

        const equipe = await connection("Equipe").where("Equipe.empresa_id", empresa_id).select(["Equipe.*"])

        // const equipe = await connection("Equipe").where("Equipe.empresa_id", empresa_id).leftJoin("Membro","Membro.equipe_id","=", "Equipe.id").select(["Equipe.*","Membro.nome as membro_nome"])

        const membros = await connection("Membro").where("Membro.empresa_id", empresa_id).select(["Membro.nome","Membro.equipe_id"])

        return response.json({equipe, membros})
    },
    async projeto(request,response) {

        const empresa_id = request.headers.authorization

        //const projeto = await connection("Projeto").where("Projeto.empresa_id", empresa_id).join
        //("Equipe","Equipe.id","=","Projeto.equipe_id").select(["Projeto.*","Equipe.nome as equipe_nome"])

        const projetos = await connection("Projeto").where("Projeto.empresa_id", empresa_id).select(["Projeto.*"])
        const equipes = await connection("Equipe").where("Equipe.empresa_id", empresa_id).select(["Equipe.*"])

        projetos.forEach((prjt) => {
            const equipesLista = prjt.equipe_id.split(',')

            prjt.equipe_id = equipesLista.map((equipeId) => {
                return equipes.find((equipe) => equipe.id === Number(equipeId))
            })
        })

        return response.json(projetos);
    },

    async effort(request,response) {

        const empresa_id = request.headers.authorization

        const equipe = await connection("Effort").where("empresa_id", empresa_id).select("*")

        return response.json(equipe)
    },
    async cost(request,response) {

        const empresa_id = request.headers.authorization

        const cost = await connection("Cost").where("empresa_id", empresa_id).select("*")

        return response.json(equipe)
    },
    
}