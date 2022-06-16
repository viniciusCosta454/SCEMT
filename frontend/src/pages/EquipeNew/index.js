import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"

export default function EquipeNew() {
  const [nome, setNome] = useState("")
  const [membro,setMembro] = useState("")
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newEquipe(e){
    e.preventDefault()

    const data = {
      nome,
      membro
    }

    try {
      await api.post("Equipe",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/Equipe")
    } catch (error) {
      alert("Erro ao cadastrar Equipe")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Cadastrar Nova Equipe</h1>
          <p>
            Descreva o nome e os membros dessa equipe.
          </p>
          <Link className="back-link" to="/equipe">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para Equipes
          </Link>
        </section>
        <form onSubmit={newEquipe}>
        <input 
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome da Equipe"/>
            
              <input 
              value={membro}
              onChange={e => setMembro(e.target.value)}
              placeholder="Membros da Equipe"/>
              
        <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}