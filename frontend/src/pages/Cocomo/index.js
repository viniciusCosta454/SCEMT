import React, { useState, useEffect } from "react";
import "./styleCocomo.css";
import logoImg from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function Cocomo() {
  const [precedencia, setprecedencia] = useState("");
  const [flexibilidade, setflexibilidade] = useState("");
  const [arquitetura, setarquitetura] = useState("");
  const [coesao, setcoesao] = useState("");
  const [maturidade, setmaturidade] = useState("");

  const [projeto_id, setprojeto_id] = useState("");
  const [listProjetos, setlistProjetos] = useState([]);

  const history = useHistory();
  const empresaId = localStorage.getItem("empresaId");

  useEffect(() => {
    api
      .get("/profile/projeto", {
        headers: {
          Authorization: empresaId,
        },
      })
      .then((response) => {
        console.log(response.data);
        setlistProjetos(response.data);
      });
  }, [empresaId]);

  async function Cocomo(e) {
    e.preventDefault();

    const data = {
      precedencia,
      flexibilidade,
      arquitetura,
      coesao,
      maturidade,
      projeto_id,
    };

    console.log("data", data);

    try {
      await api.post("Cocomo", data, {
        headers: {
          Authorization: empresaId,
        },
      });

      history.push("/projetoDados");
    } catch (error) {
      alert("Erro ao cadastrar dados do Cocomo");
    }
  }

  return (
    <div className="containerProbe">
      <div className="conteiner">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Cadastrar dados do Cocomo</h1>
          <p>
            Preencha os campos solicitados com as informações do seu projeto.
          </p>
          <Link className="back-link" to="/projetoDados">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para dados do projetos
          </Link>
        </section>
        <form onSubmit={Cocomo}>
          <table className="tabelaDadosCocomo">
            <thead>
              <tr className="cocomoTitulo">
                <th colSpan={3}>Descrição</th>
                <th colSpan={1}>Escala: 0 - 5</th>
              </tr>
            </thead>
            <tbody className="bodyCocomo">
              <tr>
                <td colSpan={3}>Projeto</td>
                <td colSpan={1}>
                  <select
                    value={projeto_id}
                    onChange={(e) => setprojeto_id(e.target.value)}
                  >
                    <option value="">Selecione o projeto</option>
                    {listProjetos.map((e) => (
                      <option value={e.id}>{e.nome}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Precedência</td>
                <td colSpan={1}>
                  <select
                    value={precedencia}
                    onChange={(e) => setprecedencia(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Flexibilidade do Desenvolvimento</td>
                <td colSpan={1}>
                  <select
                    value={flexibilidade}
                    onChange={(e) => setflexibilidade(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Arquitetura/Solução de Riscos</td>
                <td colSpan={1}>
                  <select
                    value={arquitetura}
                    onChange={(e) => setarquitetura(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Coesão da Equipe</td>
                <td colSpan={1}>
                  <select
                    value={coesao}
                    onChange={(e) => setcoesao(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Maturidade do Processo</td>
                <td colSpan={1}>
                  <select
                    value={maturidade}
                    onChange={(e) => setmaturidade(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <button className="button" type="submit">
            Salvar dados do Cocomo
          </button>
        </form>
      </div>
    </div>
  );
}
