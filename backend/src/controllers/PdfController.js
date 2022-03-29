const connection = require("../database/connection");
const pdf = require("html-pdf");
const data = new Date();
const dia = data.getDate(); 
const mes = data.getMonth(); 
const ano = data.getFullYear();

module.exports = {
  async index(request, response) {

    const {id} = request.params

    const pedido = await connection("Pedido")
      .join("Clientes", "Clientes.cpf", "=", "Pedido.cpfDoComprador")
      .select(["Pedido.*", "Clientes.nome", "Clientes.endereco"]);

    var conteudo = `
        <h2>----------------------------------------------</h2>
        <h1>ID empresa : ${pedido[id-1].empresa_id}</h1>
        <h2>----------------------------------------------</h2>
        <h1>Dados do comprador:</h1>
        <h2>CPF : ${pedido[id-1].cpfDoComprador}</h2>
        <h2>Nome : ${pedido[id-1].nome}</h2>
        <h2>Endereco de entrega : ${pedido[id-1].endereco}</h2>
        <h2>----------------------------------------------</h2>
        <h1>Dados do produto:</h1>
        <h2>Produto : ${pedido[id-1].nomeDoProduto}</h2>
        <h2>Quantidade : ${pedido[id-1].quantidade}</h2>
        <h2>----------------------------------------------</h2>
        <h1>Dados da compra:</h1>
        <h2>Valor : ${Intl.NumberFormat("py-BR", {
          style: "currency",
          currency: "BRL",
        }).format(pedido[id-1].value)}</h2>
        <h2>Forma de pagamento :  ${pedido[id-1].formaPagamento}</h2>
        <h2>----------------------------------------------</h2>
        <h4>Nota Físcal gerada em ${dia}/${mes + 1}/${ano}.</h4>

        
    `;

    pdf.create(conteudo, {}).toFile(`../Notas/${pedido[id-1].id}.pdf`, (err, res) => {
      if (err) {
        console.log("Erro : ao gerar PDF");
      } else {
        console.log("PDF Gerado");
      }
    });

    return response.json(pedido)
  },
};
