import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"

import { mask , unMask } from "remask"

export default function ClienteNew() {
  const [nome, setNome] = useState("")
  const [cpf,setCpf] = useState("")
  const [numero,setNumero] = useState("")  
  const [endereco,setEndereco] = useState("") 
  const [email,setEmail] = useState("") 
  const [sexo,setSexo] = useState("") 
  const [nacimento,setNacimento] = useState("") 
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newCliente(e){
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
      await api.post("clientes",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/clientes")
    } catch (error) {
      alert("Erro ao cadastrar Cliente")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar Cliente</h1>
          <p>
            Cadastre o cliente e torneu membro da nossa equipe.
          </p>
          <Link className="back-link" to="/clientes">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={newCliente}>
            <input 
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome do Cliente"/>
            <input 
              value={cpf}
              onChange={e => setCpf((mask(unMask(e.target.value),['999.999.999-99'])))}
              placeholder="CPF do Cliente"/>
            <input 
              value={numero}
              onChange={e => setNumero((mask(unMask(e.target.value),['(99) 9 9999-9999'])))}
              placeholder="Telefone do Cliente"/>
              <input 
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              placeholder="Endereço do Cliente"/>
              <input 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email do Cliente"/>
              <input 
              value={sexo}
              onChange={e => setSexo(e.target.value)}
              placeholder="Sexo do Cliente"/>
              <input 
              value={nacimento}
              onChange={e => setNacimento((mask(unMask(e.target.value),['99/99/9999'])))}
              placeholder="Data de Nascimento do Cliente"/>
        <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
