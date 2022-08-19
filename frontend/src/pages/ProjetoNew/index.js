import React, { useState, useEffect } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"
import { mask, unMask } from 'remask'

export default function ProjetoNew() {
  const [nome, setNome] = useState("")
  const [dataI, setDataI] = useState("")
  const [dataF, setDataF] = useState("")  
  const [salario,setSalario] = useState("") 
  const [gastos, setGastos] = useState("") 
  const [lucro, setLucro] = useState("") 
  const [equipe_id,setEquipe] = useState("") 
  const [listEquipes, setlistEquipes] = useState([]);
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

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

  async function newProjeto(e){
    e.preventDefault()
    
    const data = {
      nome,
      dataI,
      dataF,
      salario,
      gastos,
      lucro,
      equipe_id
    }

    try {
      await api.post("Projeto",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/projetos")
    } catch (error) {
      alert("Erro ao cadastrar Projeto")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Cadastrar Novo Projeto</h1>
          <p>
            Preencha os campos solicitados com as informações do seu projeto.
          </p>
          <Link className="back-link" to="/projetos">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para projetos
          </Link>
        </section>
        <form onSubmit={newProjeto}>
        <input 
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome do projeto"/>
            <input 
              value={dataI}
              onChange={e => setDataI((mask(unMask(e.target.value),['99/99/9999'])))}
              placeholder="Data Inicial da Sprint"/>
            <input 
              value={dataF}
              onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
              placeholder="Data Final da Sprint"/>
              <input 
              value={salario}
              onChange={e => setSalario(e.target.value)}
              placeholder="Custo de salários"/>
              <input 
              value={gastos}
              onChange={e => setGastos(e.target.value)}
              placeholder="gastos com o projeto"/>
              <input 
              value={lucro}
              onChange={e => setLucro(e.target.value)}
              placeholder="lucro"/>
              <select value={equipe_id.id} onChange={(e) => setEquipe(e.target.value)}>
              <option value="">Selecione a Equipe</option>
              { 
              listEquipes.map((e) => <option value={e.id}>{e.nome}</option>)
              }
              </select>
        <button className="button" type="submit">Criar Projeto</button>
        </form>
      </div>
    </div>
  );
}