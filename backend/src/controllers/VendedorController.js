const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Vendedor").count()

        const vendedor = await connection("Vendedor")
        .join("Empresas","Empresas.id","=","Vendedor.empresa_id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "Vendedor.*",
            "Empresas.name",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
        ])
    
        response.header("X-Total-Count",count['count(*)'])
        return response.json(vendedor)
    },

    async create(request,response) {
        const {nome, cpf,numero,endereco,email,sexo,nacimento } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("Vendedor").insert({
            nome,
            cpf,
            numero,
            endereco,
            email,
            sexo,
            nacimento,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const vendedor = await connection("Vendedor")
        .where("id",id)
        .select("empresa_id").first()

        if(vendedor.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Vendedor").where("id",id).delete()

        return response.status(204).send()
    },
    async edit(request, response) {
        const { id } = request.params
        const { numero ,endereco, email} = request.body
    
        await connection('Vendedor')
          .where('id', id)
          .update({ numero , endereco, email })
    
        return response.status(204).send()
      }
    
}