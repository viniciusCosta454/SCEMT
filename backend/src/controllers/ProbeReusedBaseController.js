const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("ProbeReusedBase").count();

    const ProbeReusedBase = await connection("ProbeReusedBase")
      .join("Empresas", "Empresas.id", "=", "ProbeReusedBase.empresa_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "ProbeReusedBase.*",
        "Empresas.name",
        "Empresas.numero",
        "Empresas.city",
        "Empresas.uf",
      ]);

    response.header("X-Total-Count", count["count(*)"]);
    return response.json(ProbeReusedBase);
  },

  async create(request, response) {
    const {
      baseName,
      planBase,
      planDel,
      planMod,
      planAdd,
      actualBase,
      actualDel,
      actualMod,
      actualAdd,
      reusedName,
      plan,
      actual,
      projeto_id,
    } = request.body;
    const empresa_id = request.headers.authorization;

    const [id] = await connection("ProbeReusedBase").insert({
        baseName,
        planBase,
        planDel,
        planMod,
        planAdd,
        actualBase,
        actualDel,
        actualMod,
        actualAdd,
        reusedName,
        plan,
        actual,
        projeto_id,
      empresa_id,
    });

    return response.json({ id });
  },
  async delete(request,response){

      const {id} = request.params
      const empresa_id = request.headers.authorization

      const ProbeReusedBase = await connection("ProbeReusedBase")
      .where("id",id)
      .select("empresa_id").first()

      if(ProbeReusedBase.empresa_id !== empresa_id){
          return response.status(401).json({erro : "Operacao nao pode ser completada"})
      }
      await connection("ProbeReusedBase").where("id",id).delete()

      return response.status(204).send()
  }
};
