const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Projeto").count()

        const Projeto = await connection("Projeto")
        .join("Empresas","Empresas.id","=","Projeto.empresa_id")
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
        const {nome, dataI,dataF,equipe_id } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("Projeto").insert({
            nome,
            dataI,
            dataF,
            equipe_id,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const Projeto = await connection("Projeto")
        .where("id",id)
        .select("empresa_id").first()

        if(Projeto.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Projeto").where("id",id).delete()

        return response.status(204).send()
    }
    
}