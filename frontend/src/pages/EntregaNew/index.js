import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/api"
import { mask, unMask } from 'remask'

export default function EntregaNew() {
  const [IdPedido, setIDPedido] = useState("")
  const [dataEntrega,setdataEntrega] = useState("")
  const [observacao,setobservacao] = useState("")  
  
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newEntrega(e){
    e.preventDefault()

    const data = {
      IdPedido,
      dataEntrega,
      observacao
    }

    try {
      await api.post("entrega",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/entrega")
    } catch (error) {
      alert("Erro ao cadastrar entrega")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Marcar nova entrega</h1>
          <p>
            Selecione o pedido e a data desejada para efetuar a entrega.
          </p>
          <Link className="back-link" to="/entrega">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={newEntrega}>
            <input 
              value={IdPedido}
              onChange={e => setIDPedido(e.target.value)}
              placeholder="Número do pedido"/>
            <input 
              value={dataEntrega}
              onChange={e => setdataEntrega(mask(unMask(e.target.value),['99/99/9999']))}
              placeholder="Data da entrega"/>
            <input 
              value={observacao}
              onChange={e => setobservacao(e.target.value)}
              placeholder="Observação sobre a entrega"/>
            
        <button className="button" type="submit">Agendar</button>
        </form>
      </div>
    </div>
  );
}
