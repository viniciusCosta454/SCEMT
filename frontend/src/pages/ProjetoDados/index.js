import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower } from "react-icons/fi";
import grafico from "../../assets/grafico.png"

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
        
        <Link className="button" to="/home">
          Gereciador
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#38b6ff"></FiPower>
        </button>
      </header>
        {
          // eslint-disable-next-line
          Projetos.map((Projeto) => {
            if (projetoId === Projeto.id){
              return (
                <div>
              <h1>Dados do projeto {Projeto.nome}</h1>
              <ul>
              <li key={Projeto.id}>
            <strong>NOME DO PROJETO :</strong>
            <p>{Projeto.nome}</p>
            
            <strong>EQUIPE RESPONSÁVEL :</strong>
            <p>{Projeto.equipe}</p>

            <strong>DATA INICIAL DA SPRINT :</strong>
            <p>{Projeto.dataI}</p>

            <strong>DATA FINAL DA SPRINT :</strong>
            <p>{Projeto.dataF}</p>

            <strong>SALÁRIO DA EQUIPE :</strong>
            <p>{Intl.NumberFormat("py-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Projeto.salario)}</p>

            <strong>GASTOS GERAIS :</strong>
            <p>{Intl.NumberFormat("py-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Projeto.gastos)}</p>

            <strong>LUCRO ATUAL :</strong>
            <p>{Intl.NumberFormat("py-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Projeto.lucro)}</p>
            
            
          </li>
              </ul>
              </div>
              )
            }
          })
        }
        
     
        <img src={grafico} className="grafico" alt="Graf"/>
      
      
      
    </div>
  );
}