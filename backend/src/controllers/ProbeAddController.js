const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("ProbeAdd").count()

        const ProbeAdd = await connection("ProbeAdd")
        .join("Empresas","Empresas.id","=","ProbeAdd.empresa_id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "ProbeAdd.*",
            "Empresas.name",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
        ])
    
        response.header("X-Total-Count",count['count(*)'])
        return response.json(ProbeAdd)
    },

    async create(request,response) {
        const {addedName,partType,planItens,planRelSz,planSize,actualItens,actualSize,projeto_id } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("ProbeAdd").insert({
            addedName,
            partType,
            planItens,
            planRelSz,
            planSize,
            actualItens,
            actualSize,
            projeto_id,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const ProbeAdd = await connection("ProbeAdd")
        .where("id",id)
        .select("empresa_id").first()

        if(ProbeAdd.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("ProbeAdd").where("id",id).delete()

        return response.status(204).send()
    }
}