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


        //const probe = await connection("Projeto").where("Projeto.empresa_id", empresa_id).join
        //("ProbeReusedBase","ProbeReusedBase.projeto_id","=","Projeto.id").join
        //("ProbeAdd","ProbeAdd.projeto_id","=","Projeto.id").select(["Projeto.*","ProbeReusedBase.*","PorbeAdd.*"])

        return response.json(projetos);
    },
    async probeAdd(request,response) {

        const empresa_id = request.headers.authorization

        const probeAdd = await connection("ProbeAdd").where("empresa_id", empresa_id).select("*")

        return response.json(probeAdd)
    },
    async probeReusedBase(request,response) {

        const empresa_id = request.headers.authorization

        const probeReusedBase = await connection("ProbeReusedBase").where("empresa_id", empresa_id).select("*")

        return response.json(probeReusedBase)
    },
    async cocomo(request,response) {

        const empresa_id = request.headers.authorization

        const cocomo = await connection("Cocomo").where("empresa_id", empresa_id).select("*")

        return response.json(cocomo)
    },
    async projetoDados(request,response) {
        
        const empresa_id = request.headers.authorization;
        const {projetoId} = request.params;

        const projetos = await connection("Projeto").where("Projeto.empresa_id", empresa_id).select(["Projeto.*"])
        const equipes = await connection("Equipe").where("Equipe.empresa_id", empresa_id).select(["Equipe.*"])

        projetos.forEach((prjt) => {
            const equipesLista = prjt.equipe_id.split(',')

            prjt.equipe_id = equipesLista.map((equipeId) => {
                return equipes.find((equipe) => equipe.id === Number(equipeId))
            })
        })

        
        const probeRb = await connection("ProbeReusedBase").where("ProbeReusedBase.projeto_id", projetoId).select("ProbeReusedBase.*")
        const probeAdd = await connection("ProbeAdd").where("ProbeAdd.projeto_id", projetoId).select("ProbeAdd.*")
        
        const cocomo = await connection("Cocomo").where("Cocomo.projeto_id", projetoId).select("Cocomo.*")

        const probe = {
            probe_reused: probeRb[0],
            probe_add: probeAdd,
            cocomo: cocomo[0],
        }

        return response.json({projetos, probe});
    }
}