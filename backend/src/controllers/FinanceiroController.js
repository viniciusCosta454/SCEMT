const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Financeiro").count()

        const vendedor = await connection("Financeiro")
        .join("Empresas","Empresas.id","=","Financeiro.empresa_id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "Financeiro.*",
            "Empresas.name",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
        ])
    
        response.header("X-Total-Count",count['count(*)'])
        return response.json(vendedor)
    },

    async create(request,response) {
        const {nome, cpf, sexo, nacimento } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("Financeiro").insert({
            nome,
            cpf,
            sexo,
            nacimento,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const financeiro = await connection("Financeiro")
        .where("id",id)
        .select("empresa_id").first()

        if(financeiro.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Financeiro").where("id",id).delete()

        return response.status(204).send()
    }
    
}