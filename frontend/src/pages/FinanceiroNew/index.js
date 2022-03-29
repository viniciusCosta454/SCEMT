import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"
import { mask, unMask } from 'remask'

export default function FinanceiroNew() {
  const [nome, setNome] = useState("")
  const [cpf,setCpf] = useState("")
  const [sexo,setSexo] = useState("") 
  const [nacimento,setNacimento] = useState("") 
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newFinanceiro(e){
    e.preventDefault()

    const data = {
      nome,
      cpf,
      sexo,
      nacimento
    }

    try {
      await api.post("financeiro",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/financeiro")
    } catch (error) {
      alert("Erro ao cadastrar financeiro")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar Novo Financeiro</h1>
          <p>
            Descreva os dados do financeiro preenchendo todos os campos.
          </p>
          <Link className="back-link" to="/financeiro">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={newFinanceiro}>
            <input 
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome do Financeiro"/>
            <input 
              value={cpf}
              onChange={e => setCpf((mask(unMask(e.target.value),['999.999.999-99'])))}
              placeholder="CPF do Financeiro"/>
            <input
              value={sexo}
              onChange={e => setSexo(e.target.value)}
              placeholder="Sexo do Financeiro"/>
            <input 
              value={nacimento}
              onChange={e => setNacimento((mask(unMask(e.target.value),['99/99/9999'])))}
              placeholder="Data de Nascimento do Financeiro"/>
        <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}