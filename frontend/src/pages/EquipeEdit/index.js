import React , { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link ,  useHistory  } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"

import api from "../../services/api"

export default function EquipeEdit() {
  
  
  const [membro, setMembro] = useState("") 
  const history = useHistory()
  const idClie = localStorage.getItem("idClie");

  async function edt(e){
    e.preventDefault()

    const data = {
        membro
    }

    try {
      await api.put(`Equipe/${idClie}`,data)

      history.push("/Equipe")
    } catch (error) {
      alert("Erro ao Editar Equipe")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Editar Equipe</h1>
          <p>
            Edite a Equipe e mude suas informaçoes.
          </p>
          <Link className="back-link" to="/Equipe">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={edt}>
        
            <input 
            value={membro}
            onChange={e => setMembro(e.target.value)}
              placeholder="Novo Membro"/>

        <button className="button" type="submit">Editar</button>
        </form>
      </div>
    </div>
  );
}