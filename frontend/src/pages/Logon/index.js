import React,{useState} from 'react';

import { useHistory } from "react-router-dom"
import "./style.css"
import "../../global.css"
import heroImg from "../../assets/heroes.png"
import logoImg from "../../assets/logo.png"

import api from "../../services/api";

export default function Logon() {

  const [id,setId] = useState('')
  const history = useHistory()

  async function handleLogin(e){
    e.preventDefault()

    try {
      const response = await api.post("sessions",{id})
      localStorage.setItem('empresaId', id);
      
      localStorage.setItem("nomeEmpresa", response.data.name)
      console.log(response.data.name)

      history.push("projetos")

    } catch (error) {
      alert("Falha no login, tente novamente")
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
      <img src={logoImg} className="LogoLogin" alt="SCEMT"></img>
      <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>
          <input placeholder="Digite seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
        </form>
      </section>
      <img src={heroImg} className="imgHero" alt="Heros"/>
    
    </div>
    
  );
}
