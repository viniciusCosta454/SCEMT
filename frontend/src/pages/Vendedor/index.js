import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./style.css";

import logoImg from "../../assets/logo.png"

import api from "../../services/api";

export default function Vendedor() {

  const [vendedor, setVendedor] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");


  useEffect(() => {
    api
      .get("profile/vendedor", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        setVendedor(response.data);
      });
  }, [empresaId]);

  async function handleDeleteProd(id){
      try {
        await api.delete(`vendedor/${id}`,{
            headers: {
              Authorization: empresaId
            }
          })

          setVendedor(vendedor.filter(vendedor => vendedor.id !== id))

      } catch (erro) {
          alert('Erro ao deletar Vendedor, tente novamente.')
      }
  }

  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Keep Flux" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/home">
        Menu
        </Link>
       
        
        <Link className="button" to="/vendedorNew">
          Cadastrar Novo Vendedor
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Vendedores cadastrados</h1>

      <ul>
      
        {
        vendedor.map((vendedor) => (
          <li key={vendedor.id}>
            <strong>NOME DO VENDEDOR :</strong>
            <p>{vendedor.nome}</p>
            <strong>CPF DO VENDEDOR :</strong>
            <p>{vendedor.cpf}</p>
            <strong>SEXO DO VENDEDOR :</strong>
            <p>{vendedor.sexo}</p>
            <strong>NASCIMENTO DO VENDEDOR :</strong>
            <p>{vendedor.nacimento}</p>
            
            <button onClick={()=>handleDeleteProd(vendedor.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
  }