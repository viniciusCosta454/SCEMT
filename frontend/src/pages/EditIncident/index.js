import React , { useState } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link ,  useHistory  } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"

import api from "../../services/api"

export default function NewIncident() {
  
  const [quantidade, setQuan] = useState("")
  const [value,setValue] = useState("")  
  const history = useHistory()
  const ProdId = localStorage.getItem("idProd");

  async function edt(e){
    e.preventDefault()

    const data = {
      value,
      quantidade
    }

    try {
      await api.put(`produtos/${ProdId}`,data)

      history.push("/profile")
    } catch (error) {
      alert("Erro ao editar Produto")
    }

  }

  return (
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Keep-Flux" />
          <h1>Editar Produto</h1>
          <p>
            Edite o Produto e altere o valor de Preço e quantidade no estoque.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={edt}>

            <input 
            value={value}
            onChange={e => setValue(e.target.value)}
              placeholder="Preço do produto"/>            
            <input 
            value={quantidade}
            onChange={e => setQuan(e.target.value)}
              placeholder="Quantidade do produto"/>

        <button className="button" type="submit">Editar</button>
        </form>
      </div>
    </div>
  );
}