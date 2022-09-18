import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import "./style.css";

import logoImg from "../../assets/logo.png"

import api from "../../services/api";
import SprintNew from "../SprintNew";

export default function Projeto() {

  const [Projetos, setProjetos] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");
  const projetoId = localStorage.getItem("idProjeto");



  // Dados dos componentes de cada sprint, por ora 1 sprint equivale a 1 componente: Justificar no artigo o porque!
  const nomeComponente = localStorage.getItem("nome");
  const tipoComponente = localStorage.getItem("tipo");
  const iPlanComponente = localStorage.getItem("iPlan");
  const tRelPlanComponente = localStorage.getItem("tRelPlan");
  const tamPlanComponente = localStorage.getItem("tamPlan");
  const itensRComponente = localStorage.getItem("itensR");
  const tamRComponente = localStorage.getItem("tamR");


  useEffect(() => {
    api
      .get("profile/projeto", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        console.log(response.data)
        setProjetos(response.data);
      });
  }, [empresaId]);

  function handleLogout() {

    localStorage.clear()
    history.push('/')
  }



  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="SCEMT" />
        <span>Bem vindo, {empresaName}</span>


        <Link className="button" to="/sprintNew">
          Nova Sprint
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#38b6ff"></FiPower>
        </button>
      </header>
      {
        // eslint-disable-next-line
        Projetos.map((Projeto) => {
          // eslint-disable-next-line
          if (projetoId == Projeto.id) {
            return (
              <div>
                <h1>Dados do projeto {Projeto.nome}</h1>
                <br />
                <div className="row">
                  <div className="col-6">
                    <ul>
                      <li key={Projeto.id}>
                        <strong>NOME DO PROJETO :</strong>
                        <p>{Projeto.nome}</p>

                        <strong>EQUIPE RESPONSÁVEL :</strong>
                        <p>
                          {Projeto.equipe_id.map((equipe) => {
                            return `${equipe.nome} - `
                          })}
                        </p>

                        <strong>DATA INICIAL DO PROJETO :</strong>
                        <p>{Projeto.dataI}</p>

                        <strong>DATA FINAL DO PROJETO :</strong>
                        <p>{Projeto.dataF}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        })}
    </div>
  )
}



return (
        for (let index = 0; index < SprintNew.length; index++) {
  SprintNew.map((Componente) => {
    return (
      <div className="col-6">
        <div className="row">
          <div className="col-3 text-center header">
            <p className="dadosSprint">Sprint.map(())</p>
          </div>
          <div className="col-2 text-center header">
            <p className="dadosSprint">Sprint.map[id].tipo</p>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col-4 text-center header">
                <p className="dadosSprint">Sprint.map[id].itensPlanejados</p>
              </div>
              <div className="col-4 text-center header">
                <p className="dadosSprint">Sprint.map[id].tamanhoRelativoPlanejado</p>
              </div>
              <div className="col-4 text-center header">
                <p className="dadosSprint">Sprint.map[id].tamanhoPlanejado</p>
              </div>
            </div>
          </div>
          <div className="col-2 text-center header">
            <div className="row">
              <div className="col-6 text-center header">
                <p className="dadosSprint">Sprint.map[id].itensReal</p>
              </div>
              <div className="col-6 text-center header">
                <p className="dadosSprint">Sprint.map[id].tamanhoReal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
    })