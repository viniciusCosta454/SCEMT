import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"
import { mask, unMask } from 'remask'

export default function MembroNew() {
  const [nome, setNome] = useState("")
  const [cpf,setCpf] = useState("")
  const [numero,setNumero] = useState("")  
  const [endereco,setEndereco] = useState("") 
  const [email,setEmail] = useState("") 
  const [sexo,setSexo] = useState("") 
  const [nacimento,setNacimento] = useState("") 
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newMembro(e){
    e.preventDefault()

    const data = {
      nome,
      cpf,
      numero,
      endereco,
      email,
      sexo,
      nacimento
    }

    try {
      await api.post("Membro",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/Membro")
    } catch (error) {
      alert("Erro ao cadastrar Membro")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Cadastrar Novo Membro</h1>
          <p>
            Descreva os dados do membro preenchendo todos os campos solicitados.
          </p>
          <Link className="back-link" to="/membro">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para Membros
          </Link>
        </section>
        <form onSubmit={newMembro}>
        <input 
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome"/>
            <input 
              value={cpf}
              onChange={e => setCpf((mask(unMask(e.target.value),['999.999.999-99'])))}
              placeholder="CPF"/>
            <input 
              value={numero}
              onChange={e => setNumero((mask(unMask(e.target.value),['(99) 9 9999-9999'])))}
              placeholder="Telefone"/>
              <input 
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              placeholder="Endereço"/>
              <input 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"/>
              <input 
              value={sexo}
              onChange={e => setSexo(e.target.value)}
              placeholder="Sexo"/>
              <input 
              value={nacimento}
              onChange={e => setNacimento((mask(unMask(e.target.value),['99/99/9999'])))}
              placeholder="Data de Nascimento"/>
        <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}