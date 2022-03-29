import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower} from "react-icons/fi";
import imagemRelatorio from "./imagens/relatorio.png";
import imagemCliente from "./imagens/cliente.png";
import imagemEditestoque from "./imagens/editestoque.png";
import imagemEntrega from "./imagens/entrega.png";
import imagemEstoque from "./imagens/estoque.png";
import imagemPedidos from "./imagens/pedidos.png";
import imagemProduto from "./imagens/produto.png";
import imagemMenu from "./imagens/menu.png";

import "./style.css";

import logoImg from "../../assets/logo.png";

export default function RelatorioM() {

  const history = useHistory();

  const empresaName = localStorage.getItem("nomeEmpresa");

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  
  return (
    <div className="help">
     
      <header>
        <img src={logoImg} alt="Keep Flux" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/menu">
        Menu
        </Link>
       
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Dicas para o uso do sistema</h1>
      <ul>
      <li>
            <strong>RELATÓRIO:</strong>
            <p>Ao clicar em relatório nosso sistema irá fornecer quantos pedidos 
              já foram realizados, e o valor total acumulado da sua empresa
            </p>
            <img src={imagemRelatorio} className="helpimg" alt="Keep Flux" />
            
        </li>
        <li>
            <strong>CADASTRAR UM CLIENTE:</strong>
            <p>Coloque todos os dados do cliente de acordo com o que se pede, os campos possuem
                verificação, seguindo o estilo não ocorrerá erros
            </p>
            <img src={imagemCliente} className="helpimg" alt="Keep Flux"/>
            
        </li>
        <li>
            <strong>EDITAR O ESTOQUE:</strong>
            <p>Nessa área você pode mudar a quantidade de um produto em seu estoque ou sua observação
            </p>
            <img src={imagemEditestoque} className="helpimg" alt="Keep Flux"/>
            
        </li>
        <li>
            <strong>AGENDAR UMA ENTREGA:</strong>
            <p>Nessa área você pode agendar a entrega de algum pedido realizado, assim
              vai poder ter controle das suas entregas
            </p>
            <img src={imagemEntrega} className="helpimg" alt="Keep Flux"/>
            
        </li>
        <li>
            <strong>VERIFICAR SEU ESTOQUE:</strong>
            <p>Nessa área você pode verificar todos os produtos cadastrados no sistema, e sua quantidade além de outras
              informações
            </p>
            <img src={imagemEstoque} className="helpimg" alt="Keep Flux"/>
            
        </li>
        <li>
            <strong>PEDIDO:</strong>
            <p>Nessa área você pode verificar todos os seus pedidos realizados no sistema,
              podendo vizualizar dados do cliente e do produto comprado
            </p>
            <img src={imagemPedidos} className="helpimg" alt="Keep Flux"/>
            
        </li>
        <li>
            <strong>COMO CADASTRAR UM NOVO PRODUTO:</strong>
            <p>Nessa página vai ser possível cadastrar um novo produto que antes não era vendido,
              sendo necessário colocar os dados do produto e uma imagem desse produto
            </p>
            <img src={imagemProduto} className="helpimg" alt="Keep Flux"/>
            
        </li>
        <li>
            <strong>MENU DO SISTEMA:</strong>
            <p>Nessa página vai ser possível verificar todas as funcionalidades que o sistema oferece para o usuário
              do sistema
            </p>
            <img src={imagemMenu} className="helpimg" alt="Keep Flux"/>
            
        </li>
        
        
      </ul>
    </div>
  );
}