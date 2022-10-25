const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Cocomo").count()

        const Cocomo = await connection("Cocomo")
        .join("Empresas","Empresas.id","=","Cocomo.empresa_id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "Cocomo.*",
            "Empresas.name",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
        ])
    
        response.header("X-Total-Count",count['count(*)'])
        return response.json(Cocomo)
    },

    async create(request,response) {
        const {precedencia,flexibilidade,arquitetura,coesao,maturidade,projeto_id } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("Cocomo").insert({
            precedencia,
            flexibilidade,
            arquitetura,
            coesao,
            maturidade,
            projeto_id,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const Cocomo = await connection("Cocomo")
        .where("id",id)
        .select("empresa_id").first()

        if(Cocomo.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Cocomo").where("id",id).delete()

        return response.status(204).send()
    }
}