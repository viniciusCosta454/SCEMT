import React ,{ useState } from "react";
import "./style.css";
import logoImg from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { mask , unMask } from "remask"

import api from "../../services/api"

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      numero,
      city,
      uf
    };
    try {
      const response = await api.post("empresas", data);

      alert(`Seu ID de Acesso : ${response.data.id}`);

      history.push("/")

    }catch(err){
      alert("Erro do cadastro Tente novamente")
    }
  }


  return (
    <div className="register-container">
      <div className="conteiner">
        <section>
          <img className="imgLogo" src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faca seu cadastro, e use esse sistema e mude .
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Ja tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister} >
        <input
            placeholder="Nome da Empresa"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={numero}
            onChange={e => setNumero(mask(unMask(e.target.value),['(99) 9 9999-9999']))}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
