const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Entrega").count()

        const entrega = await connection("Entrega")
        .join("Empresas","Empresas.id","=","Entrega.empresa_id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "Entrega.*",
            "Empresas.name",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
        ])
    
        response.header("X-Total-Count",count['count(*)'])
        return response.json(entrega)
    },

    async create(request,response) {
        const {IdPedido, dataEntrega, observacao } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("Entrega").insert({
            IdPedido,
            dataEntrega,
            observacao,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const entrega = await connection("Entrega")
        .where("id",id)
        .select("empresa_id").first()

        if(entrega.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Entrega").where("id",id).delete()

        return response.status(204).send()
    },
    async edit(request, response) {
        const { id } = request.params
        const { dataEntrega, observacao} = request.body
    
        await connection('Entrega')
          .where('id', id)
          .update({ dataEntrega, observacao})
    
        return response.status(204).send()
      }
}