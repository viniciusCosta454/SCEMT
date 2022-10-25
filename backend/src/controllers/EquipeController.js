const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Equipe").count()

        const Equipe = await connection("Equipe")
        .join("Empresas","Empresas.id","=","Equipe.empresa_id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "Equipe.*",
            "Empresas.name",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
        ])
    
        response.header("X-Total-Count",count['count(*)'])
        return response.json(Equipe)
    },

    async create(request,response) {
        const {nome/*, membro*/ } = request.body
        const empresa_id = request.headers.authorization

        //console.log(membro)

        const [id] = await connection("Equipe").insert({
            nome,
           // membro: membro.toString(),
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const Equipe = await connection("Equipe")
        .where("id",id)
        .select("empresa_id").first()

        if(Equipe.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Equipe").where("id",id).delete()

        return response.status(204).send()
    }
    
}