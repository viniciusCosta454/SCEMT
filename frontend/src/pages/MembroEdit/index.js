import React , { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link ,  useHistory  } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import { mask , unMask } from "remask"

import api from "../../services/api"

export default function MembroEdit() {
  
  
  const [numero, setNumero] = useState("")
  const [endereco,setEndereco] = useState("") 
  const [email, setEmail] = useState("") 
  const history = useHistory()
  const idClie = localStorage.getItem("idClie");

  async function edt(e){
    e.preventDefault()

    const data = {
        numero,
        endereco,
        email
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
          <h1>Editar Membro</h1>
          <p>
            Edite o Membro e mude suas informaçoes.
          </p>
          <Link className="back-link" to="/Membro">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={edt}>

            <input 
            value={numero}
            onChange={e => setNumero((mask(unMask(e.target.value),['(99) 9 9999-9999'])))}
              placeholder="Telefone do Membro"/>   
              <input 
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
              placeholder="Endereço do Membro"/>           
            <input 
            value={email}
            onChange={e => setEmail(e.target.value)}
              placeholder="Email do Membro"/>

        <button className="button" type="submit">Editar</button>
        </form>
      </div>
    </div>
  );
}