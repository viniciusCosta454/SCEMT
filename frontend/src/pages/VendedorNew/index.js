import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"
import { mask, unMask } from 'remask'

export default function VendedorNew() {
  const [nome, setNome] = useState("")
  const [cpf,setCpf] = useState("")
  const [sexo,setSexo] = useState("") 
  const [nacimento,setNacimento] = useState("") 
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newVendedor(e){
    e.preventDefault()

    const data = {
      nome,
      cpf,
      sexo,
      nacimento
    }

    try {
      await api.post("vendedor",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/vendedor")
    } catch (error) {
      alert("Erro ao cadastrar vendedor")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar Novo Vendedor</h1>
          <p>
            Descreva os dados do vendedor preenchendo todos os campos.
          </p>
          <Link className="back-link" to="/vendedor">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={newVendedor}>
            <input 
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome do Vendedor"/>
            <input 
              value={cpf}
              onChange={e => setCpf((mask(unMask(e.target.value),['999.999.999.99'])))}
              placeholder="CPF do Vendedor"/>
            <input
              value={sexo}
              onChange={e => setSexo(e.target.value)}
              placeholder="Sexo do Vendedor"/>
            <input 
              value={nacimento}
              onChange={e => setNacimento((mask(unMask(e.target.value),['99/99/9999'])))}
              placeholder="Data de Nascimento do Vendedor"/>
        <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}