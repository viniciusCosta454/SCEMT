import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import "./style.css";

import logoImg from "../../assets/logo.png";

import api from "../../services/api";

export default function Projeto() {
  const [Projetos, setProjetos] = useState([]);
  const [ProbeRb, setProbeRb] = useState({});
  const [ProbeAdd, setProbeAdd] = useState([]);
  const [Cocomo, setCocomo] = useState({});

  const history = useHistory();

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");
  const projetoId = localStorage.getItem("idProjeto");

  useEffect(() => {
    api
      .get(`profile/projetoDados/${projetoId}`, {
        headers: {
          Authorization: empresaId,
        },
      })
      .then((response) => {
        console.log("data", response.data);
        setProjetos(response.data.projetos);
        setProbeRb(response.data.probe.probe_reused);
        setProbeAdd(response.data.probe.probe_add);
        setCocomo(response.data.probe.cocomo);
      });
  }, [empresaId, projetoId]);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="SCEMT" />
        <span>Bem vindo, {empresaName}</span>

        <Link className="button" to="/projetos">
          Voltar para Meus Projetos
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
              <div className="dadosProjeto">
                <h1>Dados do projeto {Projeto.nome}</h1>
                <ul>
                  <div className="dadosPrincipaisProjeto">
                    <li key={Projeto.id}>
                      <strong>NOME DO PROJETO :</strong>
                      <p>{Projeto.nome}</p>

                      <strong>EQUIPE RESPONSÁVEL :</strong>
                      <p>
                        {Projeto.equipe_id.map((equipe) => {
                          return `${equipe.nome} - `;
                        })}
                      </p>

                      <strong>DATA INICIAL DO PROJETO :</strong>
                      <p>{Projeto.dataI}</p>

                      <strong>DATA FINAL DO PROJETO :</strong>
                      <p>{Projeto.dataF}</p>

                      <Link className="button" to="/probeReusedBase">
                        Adicionar Itens de Reuso/Base para o Probe
                      </Link>
                      <Link className="button" to="/probeAdd">
                        Adicionar novos itens para o Probe
                      </Link>
                      <Link className="button" to="/cocomo">
                        COCOMO
                      </Link>
                      <Link className="button" to="/">
                        GERAR GRÁFICO
                      </Link>
                    </li>
                  </div>
                  <div className="DivTabela">
                    <table className="tabelaDadosProbe">
                      <thead>
                        <tr className="titulo">
                          <th colSpan={9}>PROBE</th>
                        </tr>

                        <tr className="base">
                          <th colSpan={1}></th>
                          <th colSpan={4}>BASE PLANEJADA</th>
                          <th colSpan={4}>ACTUAL BASE</th>
                        </tr>
                        <tr className="headBase">
                          <th className="nomeBase"> ITENS BASE</th>
                          <th> BASE</th>
                          <th> DEL</th>
                          <th> MOD</th>
                          <th> ADD</th>
                          <th> BASE</th>
                          <th> DEL</th>
                          <th> MOD</th>
                          <th> ADD</th>
                        </tr>
                      </thead>
                      <tbody className="bodyBase">
                        <tr>
                          <td>{ProbeRb?.baseName}</td>
                          <td>{ProbeRb?.planBase}</td>
                          <td>{ProbeRb?.planDel}</td>
                          <td>{ProbeRb?.planMod}</td>
                          <td>{ProbeRb?.planAdd}</td>
                          <td>{ProbeRb?.actualBase}</td>
                          <td>{ProbeRb?.actualDel}</td>
                          <td>{ProbeRb?.actualMod}</td>
                          <td>{ProbeRb?.actualAdd}</td>
                        </tr>
                      </tbody>

                      <thead>
                        <tr className="headBase">
                          <th className="nomeBase">ITENS EM REUSO</th>
                          <th colSpan={2}>PLANEJADO</th>
                          <th colSpan={2}>ACTUAL</th>
                        </tr>
                      </thead>
                      <tbody className="bodyBase">
                        <tr>
                          <td>{ProbeRb?.reusedName}</td>
                          <td colSpan={2}>{ProbeRb?.plan}</td>
                          <td colSpan={2}>{ProbeRb?.actual}</td>
                        </tr>
                      </tbody>

                      <thead>
                        <tr className="base">
                          <th colSpan={4}></th>
                          <th colSpan={3}>ITENS PLANEJADOS</th>
                          <th colSpan={2}>ACTUAL ITENS</th>
                        </tr>
                        <tr className="headBase">
                          <th className="nomeBase" colSpan={2}>
                            {" "}
                            ITENS ADICIONADOS
                          </th>

                          <th colSpan={2}> TIPO</th>
                          <th> ITENS</th>
                          <th> TAM REL</th>
                          <th> TAM</th>
                          <th> ITENS</th>
                          <th> TAM</th>
                        </tr>
                      </thead>
                      <tbody className="bodyBase">
                        {ProbeAdd.map((probeAdd) => {
                          return (
                            <tr>
                              <td colSpan={2}>{probeAdd?.addedName}</td>
                              <td colSpan={2}>{probeAdd?.partType}</td>
                              <td>{probeAdd?.planItens}</td>
                              <td>{probeAdd?.planRelSz}</td>
                              <td>{probeAdd?.planSize}</td>
                              <td>{probeAdd?.actualItens}</td>
                              <td>{probeAdd?.actualSize}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <table className="tabelaDadosCocomo">
                      <thead>
                        <tr className="titulo">
                          <th colSpan={4}>COCOMO</th>
                        </tr>
                        <tr className="cocomoTitulo">
                          <th colSpan={3}>Descrição</th>
                          <th colSpan={1}>Escala: 0 - 5</th>
                        </tr>
                      </thead>
                      <tbody className="bodyCocomo">
                        <tr>
                          <td colSpan={3}>Precedência</td>
                          <td colSpan={1}>{Cocomo?.precedencia}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}>Flexibilidade do Desenvolvimento</td>
                          <td colSpan={1}>{Cocomo?.flexibilidade}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}>Arquitetura/Solução de Riscos</td>
                          <td colSpan={1}>{Cocomo?.arquitetura}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}>Coesão da Equipe</td>
                          <td colSpan={1}>{Cocomo?.coesao}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}>Maturidade do Processo</td>
                          <td colSpan={1}>{Cocomo?.maturidade}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}>PM Necessário</td>
                          <td colSpan={1}>formula</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ul>
              </div>
            );
          }
        })
      }
    </div>
  );
}
