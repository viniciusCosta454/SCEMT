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
      <div className="container">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Criar nova Sprint</h1>
          <p>
            Preencha os campos solicitados com as informações da Sprint.
          </p>
          <Link className="back-link" to="/projetos">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para projetos
          </Link>
        </section>
        <div className='content'>
          <div className='form_header'>
            <div />
            <div>Planejado</div>
            <div>Atual</div>
          </div>
          <form onSubmit={newProjeto}>
            <div className='first_row'>
              <input 
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Vai ser um texto bem grande" />
              <select value={equipe_id.id} onChange={(e) => setEquipe(e.target.value)}>
                <option value="">Selec peq</option>
                { 
                listEquipes.map((e) => <option value={e.id}>{e.nome}</option>)
                }
              </select>
              <input 
                value={dataI}
                className="small_input"
                onChange={e => setDataI((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="numero"/>
              <select value={equipe_id.id} onChange={(e) => setEquipe(e.target.value)}>
                <option value="">Size</option>
                { 
                listEquipes.map((e) => <option value={e.id}>{e.nome}</option>)
                }
              </select>
              <input 
                value={dataF}
                className="small_input"
                onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="size"/>
              <input 
                value={dataF}
                className="small_input"
                onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="itens"/>
              <input 
                value={dataF}
                className="small_input"
                onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="size"/>
            </div>
            <div className='second_row'>
              <input 
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Vai ser um texto bem grande" />
              <select value={equipe_id.id} onChange={(e) => setEquipe(e.target.value)}>
                <option value="">Selec peq</option>
                { 
                listEquipes.map((e) => <option value={e.id}>{e.nome}</option>)
                }
              </select>
              <input 
                value={dataI}
                className="small_input"
                onChange={e => setDataI((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="numero"/>
              <select value={equipe_id.id} onChange={(e) => setEquipe(e.target.value)}>
                <option value="">Size</option>
                { 
                listEquipes.map((e) => <option value={e.id}>{e.nome}</option>)
                }
              </select>
              <input 
                value={dataF}
                className="small_input"
                onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="size"/>
              <input 
                value={dataF}
                className="small_input"
                onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="itens"/>
              <input 
                value={dataF}
                className="small_input"
                onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
                placeholder="size"/>
            </div>
          </form>
          <button className="button" type="submit">Criar Sprint</button>
        </div>
      </div>
    </div>
  );
}