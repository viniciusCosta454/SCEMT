import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"
import { mask, unMask } from 'remask'

export default function NewIncident() {
  const [title, setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [value,setValue] = useState("")  
  const [quantidade,setQuantidade] = useState("") 
  const [anoFabricacao,setanoFabricacao] = useState("") 
  const [linkDaImagem,setLinkDaImagem] = useState("") 
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newVaga(e){ 
    e.preventDefault()

    const data = {
      title,
      description,
      value,
      quantidade,
      anoFabricacao,
      linkDaImagem
    }

    try {
      await api.post("produtos",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/profile")
    } catch (error) {
      alert("Erro ao cadastrar Produto")
    }

  }

 

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar Novo Produto</h1>
          <p>
            Descreva o produto detalhadamente para encontrar facilitar para a nossa equipe.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={newVaga} encType="multipart/form-data">
            <input 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nome do produto"/>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrção"/>
            <input 
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Preço do produto"/>
              <input 
              value={quantidade}
              onChange={e => setQuantidade(e.target.value)}
              placeholder="Quantidade do produto"/>
             <input 
              value={anoFabricacao}
              onChange={e => setanoFabricacao((mask(unMask(e.target.value),['9999'])))}
              placeholder="Ano de fabricação"/>
              <input 
              value={linkDaImagem}
              onChange={e => setLinkDaImagem(e.target.value)}
              placeholder="link da imagem"/>
              <div id="photos-preview"></div>
        <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}