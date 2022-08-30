import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower } from "react-icons/fi";

import "./style.css";

import logoImg from "../../assets/logo.png"

import api from "../../services/api";

export default function Projeto() {

  const [Projetos, setProjetos] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");
  const projetoId = localStorage.getItem("idProjeto");

  useEffect(() => {
    api
      .get("profile/Projeto", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        setProjetos(response.data);
      });
  }, [empresaId]);



  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }

  
  
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="SCEMT" />
        <span>Bem vindo, {empresaName}</span>
        
        
        <Link className="button" to="/sprintNew">
          Nova Sprint
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#38b6ff"></FiPower>
        </button>
      </header>
        {
          // eslint-disable-next-line
          Projetos.map((Projeto) => {
            // eslint-disable-next-line
            if (projetoId == Projeto.id){
              return (
                <div>
              <h1>Dados do projeto {Projeto.nome}</h1>
              <ul>
              <li key={Projeto.id}>
            <strong>NOME DO PROJETO :</strong>
            <p>{Projeto.nome}</p>
            
            <strong>EQUIPE RESPONSÁVEL :</strong>
            <p>{Projeto.equipe_nome}</p>

            <strong>DATA INICIAL DO PROJETO :</strong>
            <p>{Projeto.dataI}</p>

            <strong>DATA FINAL DO PROJETO :</strong>
            <p>{Projeto.dataF}</p>

            
            
          </li>
              </ul>
              </div>
              )
            }
          })
        }

      
      
      
    </div>
  );
}