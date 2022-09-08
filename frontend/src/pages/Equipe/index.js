import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
//import { FaWhmcs } from "react-icons/fa"

import "./style.css";

import logoImg from "../../assets/logo.png"

import api from "../../services/api";

export default function Equipe() {

  const [Equipes, setEquipes] = useState([]);
  const [Membros, setMembros] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");


  useEffect(() => {
    api
      .get("profile/listagem_equipes", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        console.log(response.data)
        setEquipes(response.data.equipe); 
        setMembros(response.data.membros);
      });
  }, [empresaId]);

  async function handleDeleteProd(id){
      try {
        await api.delete(`Equipe/${id}`,{
            headers: {
              Authorization: empresaId
            }
          })
          
          setEquipes(Equipes.filter(Equipe => Equipe.id !== id))

      } catch (erro) {
          alert('Erro ao deletar Equipe, tente novamente.')
      }
  }

  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }
 /* function salvar(id){
    localStorage.setItem('idClie', id);
  }*/


  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="SCEMT" />
        <span>Bem vindo, {empresaName}</span>
        <Link className="button" to="/home">
          Menu
        </Link>
        <Link className="button" to="/EquipeNew">
          Cadastrar Nova Equipe
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#38b6ff"></FiPower>
        </button>
      </header>
      <h1>Equipes Cadastradas</h1>

      <ul>
        {
        Equipes.map(Equipe => (
          <li key={Equipe.id}>
            <strong>NOME DA EQUIPE :</strong>
            <p>{Equipe.nome}</p>
            
            <strong>MEMBROS DA EQUIPE :</strong>
            <p>{Membros.map((membro) => {
              if (membro.equipe_id === String(Equipe.id)) {
                return `${membro.nome}, `
              }
              return ''
            })}</p>

            
            
            <button onClick={()=>handleDeleteProd(Equipe.id)} type="button">
              <FiTrash2 size={20} color="#38b6ff"></FiTrash2>
            </button>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
  }