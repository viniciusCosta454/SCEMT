const crypto = require("crypto")
const connection = require("../database/connection")

module.exports = {

    async index (request,response) {
        const empresas = await connection("Empresas").select("*")
    
        return response.json(empresas)
    },
    
    async create(request,response) {

        const {name,email,numero,city,uf} = request.body

        const id = crypto.randomBytes(2).toString("HEX")
    
        await connection("Empresas").insert({
            id,
            name,
            email,
            numero,
            city,
            uf
        })
        return response.json({id})

    },
    async delete(request,response){

        const {id} = request.body

        await connection("Empresas").where("id",id).delete()

        return response.status(204).send()
    }
    
}