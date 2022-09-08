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
  

  const [equipesProjeto,setequipesProjeto] = useState([])
  const [equipes,setEquipes] = useState([])

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
        
        setEquipes(response.data);
      });
  }, [empresaId]);

  

  async function newProjeto(e){
    e.preventDefault()
    
    const data = {
      nome,
      dataI,
      dataF,
      equipe_id:equipesProjeto
    }

    console.log('data', data)

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
            Preencha os campos solicitados com as informações do seu projeto e selecione as equipes
            que fazem parte dele.
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
              placeholder="Data Inicial do Projeto"/>
            <input 
              value={dataF}
              onChange={e => setDataF((mask(unMask(e.target.value),['99/99/9999'])))}
              placeholder="Data Final do Projeto"/>
              

              
              {
                
          equipes.map(equipelist => ( <div id='divcheckbox'> <input className='checkbox' type="checkbox" onChange={e => { 

            if (equipesProjeto.includes( equipelist.nome) ) {
              for( var i = 0; i < equipesProjeto.length; i++){ 
    
                if ( equipesProjeto[i] === equipelist.nome) { 
            
                  equipesProjeto.splice(i, 1); 
                }
            
            }
            } else {
              equipesProjeto.push(equipelist.id)
            }
            
            setequipesProjeto(equipesProjeto)}} id={equipelist.id} name={equipelist.nome} value={equipelist.nome} /><h1 id='name'>{equipelist.nome}</h1></div>))
            
              }
              
        <button className="button" type="submit">Criar Projeto</button>
        </form>
      </div>
    </div>
  );
}