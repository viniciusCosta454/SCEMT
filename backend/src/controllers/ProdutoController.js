
const connection = require("../database/connection")

module.exports = {

    async index (request,response) {

        const { page = 1 } = request.query

        const [ count ] = await connection("Produtos").count()

        console.log(count)

        const produtos = await connection("Produtos")
        .join("Empresas","Empresas.id","=","Produtos.empresa_id")
        .limit(5)
        .offset((page-1)*5)
        .select([
            "Produtos.*",
            "Empresas.name",
            "Empresas.email",
            "Empresas.numero",
            "Empresas.city",
            "Empresas.uf",
        ])
    
        response.header("X-Total-Count",count['count(*)'])
        return response.json(produtos)
    },

    async create(request,response) {
        const {title, description,value,quantidade,anoFabricacao,linkDaImagem } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("Produtos").insert({
            title,
            description,
            value,
            quantidade,
            anoFabricacao,
            linkDaImagem,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const produto = await connection("Produtos")
        .where("id",id)
        .select("empresa_id").first()

        if(produto.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Produtos").where("id",id).delete()

        return response.status(204).send()
    },
    async edit(request, response) {
        const { id } = request.params
        const { value ,quantidade } = request.body 
    
        await connection('Produtos')
          .where('id', id)
          .update({ value ,quantidade })
    
        return response.status(204).send()
      }
}