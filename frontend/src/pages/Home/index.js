import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import "./style.css";

import logoImg from "../../assets/logo.png";

export default function Home() {
  const history = useHistory();

  const empresaName = localStorage.getItem("nomeEmpresa");
  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Keep Flux" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/menu">
          Funcionário
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Gerente Painel de {empresaName}</h1>
      <ul>
        <Link className="button" to="/clientes">
          Clientes
        </Link>
         <Link className="button" to="/vendedor">
          Vendedor
        </Link>
        <Link className="button" to="/prod/new">
          Cadastrar Produto
        </Link>
        <Link className="button" to="/profile">
          Estoque
        </Link>
        <Link className="button" to="/pedidos">
          Pedidos
        </Link>
       <Link className="button" to="/entrega">
          Entregas
        </Link>
       
        <Link className="button" to="/relatorioM">
          Relatórios
        </Link>
        <Link className="button" to="/financeiro">
          Financeiro
        </Link>
       
       
      </ul>
    </div>
  );
}
