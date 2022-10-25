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
        <span>Bem vindo, {empresaName}</span>
        <Link className="button" to="/novoProjeto">
          Criar novo projeto
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#38b6ff"></FiPower>
        </button>
      </header>
      <h1>Painel de Gerenciamento {empresaName}</h1>
      <ul>
        <Link className="button" to="/projetos">
          Projetos
        </Link>
         <Link className="button" to="/equipe">
          Equipes
        </Link>
        <Link className="button" to="/membro">
          Meus Funcionários
        </Link>

        <Link className="button" to="/help">
          Help
        </Link>
       
       
      </ul>
    </div>
  );
}
