import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./style.css";

import logoImg from "../../assets/logo.png"

import api from "../../services/api";

export default function Projeto() {

  const [Projetos, setProjetos] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");


  useEffect(() => {
    api
      .get("profile/Projeto", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        console.log(response.data)
        setProjetos(response.data);
      });
  }, [empresaId]);
  

  async function handleDeleteProd(id){
      try {
        await api.delete(`Projeto/${id}`,{
            headers: {
              Authorization: empresaId
            }
          })

          setProjetos(Projetos.filter(Projeto => Projeto.id !== id))

      } catch (erro) {
          alert('Erro ao deletar Projeto, tente novamente.')
      }
  }

  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }
  function salvar(id){
    localStorage.setItem('idProjeto', id);
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
      <h1>Projetos em andamento</h1>

      <ul>
        {
        Projetos.map(Projeto => (
          <li key={Projeto.id}>
            <strong>NOME DO PROJETO :</strong>
            <p>{Projeto.nome}</p>
            
            <strong>EQUIPE RESPONSÁVEL :</strong>
            <p>{Projeto.equipe_nome}</p>

            <Link onClick={()=>salvar(Projeto.id)} className="button" to="/projetoDados">
             Acessar dados do projeto
            </Link>

            
            
            <button onClick={()=>handleDeleteProd(Projeto.id)} type="button">
              <FiTrash2 size={20} color="#38b6ff"></FiTrash2>
            </button>
            
            
          </li>
        ))}
      </ul>
      
    </div>
  );
}