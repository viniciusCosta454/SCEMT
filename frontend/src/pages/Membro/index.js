import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { FaWhmcs } from "react-icons/fa"

import "./style.css";

import logoImg from "../../assets/logo.png"

import api from "../../services/api";

export default function Membro() {

  const [Membros, setMembros] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");


  useEffect(() => {
    api
      .get("profile/Membro", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        setMembros(response.data);
      });
  }, [empresaId]);

  async function handleDeleteProd(id){
      try {
        await api.delete(`Membro/${id}`,{
            headers: {
              Authorization: empresaId
            }
          })

          setMembros(Membros.filter(Membro => Membro.id !== id))

      } catch (erro) {
          alert('Erro ao deletar Membro, tente novamente.')
      }
  }

  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }
  function salvar(id){
    localStorage.setItem('idClie', id);
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="SCEMT" />
        <span>Bem vindo, {empresaName}</span>
        <Link className="button" to="/home">
          Menu
        </Link>
        <Link className="button" to="/membroNew">
          Cadastrar Novo Membro
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#38b6ff"></FiPower>
        </button>
      </header>
      <h1>Membros Cadastrados</h1>

      <ul>
        {
        Membros.map(Membro => (
          <li key={Membro.id}>
            <strong>NOME DO MEMBRO :</strong>
            <p>{Membro.nome}</p>
            <strong>CPF DO MEMBRO :</strong>
            <p>{Membro.cpf}</p>
            <strong>TELEFONE DO MEMBRO :</strong>
            <p>{Membro.numero}</p>
            <strong>ENDEREÇO DO MEMBRO :</strong>
            <p>{Membro.endereco}</p>
            <strong>EMAIL DO MEMBRO :</strong>
            <p>{Membro.email}</p>
            <strong>SEXO DO MEMBRO :</strong>
            <p>{Membro.sexo}</p>
            <strong>NASCIMENTO DO MEMBRO :</strong>
            <p>{Membro.nacimento}</p>
            <Link to="/MembroEdit" onClick={()=>salvar(Membro.id)} className="button2" type="button">
              <FaWhmcs size={20} color="#38b6ff"></FaWhmcs>
            </Link>
            <button onClick={()=>handleDeleteProd(Membro.id)} type="button">
              <FiTrash2 size={20} color="#38b6ff"></FiTrash2>
            </button>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
  }