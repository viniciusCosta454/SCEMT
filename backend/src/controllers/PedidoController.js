const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const pedido = await connection("Pedido")
      .join("Clientes", "Clientes.cpf", "=", "Pedido.cpfDoComprador")
      .select(["Pedido.*", "Clientes.nome", "Clientes.endereco"]);

    return response.json(pedido);
  },
  async soma(request, response) {
    return response.json(await connection("Pedido").sum("value as Valor"));
  },
  async create(request, response) {
    const { cpfDoComprador, nomeDoProduto, value, formaPagamento, quantidade } = request.body;
    const empresa_id = request.headers.authorization;

    const [id] = await connection("Pedido").insert({
      cpfDoComprador,
      nomeDoProduto,
      value,
      formaPagamento,
      quantidade,
      empresa_id,
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const empresa_id = request.headers.authorization;

    const produto = await connection("Pedido")
      .where("id", id)
      .select("empresa_id")
      .first();

    if (produto.empresa_id !== empresa_id) {
      return response
        .status(401)
        .json({ erro: "Operacao nao pode ser completada" });
    }
    await connection("Pedido").where("id", id).delete();

    return response.status(204).send();
  },
};
