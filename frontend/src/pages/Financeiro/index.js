import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./style.css";

import logoImg from "../../assets/logo.png"

import api from "../../services/api";

export default function Financeiro() {

  const [financeiro, setFinanceiro] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");


  useEffect(() => {
    api
      .get("profile/financeiro", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        setFinanceiro(response.data);
      });
  }, [empresaId]);

  async function handleDeleteProd(id){
      try {
        await api.delete(`financeiro/${id}`,{
            headers: {
              Authorization: empresaId
            }
          })

          setFinanceiro(financeiro.filter(financeiro => financeiro.id !== id))

      } catch (erro) {
          alert('Erro ao deletar financeiro, tente novamente.')
      }
  }

  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Keep Flux" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/home">
        Menu
        </Link>
       
        
        <Link className="button" to="/financeiroNew">
          Cadastrar Novo Financeiro
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Financeiros cadastrados</h1>

      <ul>
      
        {
        financeiro.map((financeiro) => (
          <li key={financeiro.id}>
            <strong>NOME DO FINANCEIRO :</strong>
            <p>{financeiro.nome}</p>
            <strong>CPF DO FINANCEIRO :</strong>
            <p>{financeiro.cpf}</p>
            <strong>SEXO DO FINANCEIRO :</strong>
            <p>{financeiro.sexo}</p>
            <strong>NASCIMENTO DO FINANCEIRO :</strong>
            <p>{financeiro.nacimento}</p>
            
            <button onClick={()=>handleDeleteProd(financeiro.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
  }