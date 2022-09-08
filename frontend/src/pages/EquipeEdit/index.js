import React , { useState, useEffect } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link ,  useHistory  } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
//import { mask , unMask } from "remask"

import api from "../../services/api"

export default function EquipeEdit() {
  
  
  const [equipe_id, setEquipe] = useState("")
  const [listEquipes, setlistEquipes] = useState([]);

  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  const idClie = localStorage.getItem("idClie");


  useEffect(() => {
    api
      .get("/profile/equipe", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
      console.log(response.data)
        setlistEquipes(response.data);
      });
  }, [empresaId]);


  async function edit(e){
    e.preventDefault()

    const data = {
        equipe_id
    }

    try {
      await api.put(`Membro/${idClie}`,data)

      history.push("/Membro")
    } catch (error) {
      alert("Erro ao Editar Membro")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Alterar Equipe do Membro</h1>
          <p>
            Mude qual equipe que o membro atual pertence
          </p>
          <Link className="back-link" to="/Membro">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={edit}>

        <select value={equipe_id.id} onChange={(e) => setEquipe(e.target.value)}>
              <option value="">Selecione a Equipe</option>
              { 
              listEquipes.map((e) => <option value={e.id}>{e.nome}</option>)
              }
              </select>

        <button className="button" type="submit">Editar</button>
        </form>
      </div>
    </div>
  );
}