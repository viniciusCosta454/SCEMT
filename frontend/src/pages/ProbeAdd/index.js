import React, { useState, useEffect } from "react";
import "./styleProbe.css";
import logoImg from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import { mask, unMask } from "remask";

export default function ProbeAdd() {
  const [addedName, setaddedName] = useState("");
  const [partType, setpartType] = useState("");
  const [planItens, setplanItens] = useState("");
  const [planRelSz, setplanRelSz] = useState("");
  const [planSize, setplanSize] = useState("");
  const [actualItens, setactualItens] = useState("");
  const [actualSize, setactualSize] = useState("");

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

  async function ProbeAdd(e) {
    e.preventDefault();

    const data = {
      addedName,
      partType,
      planItens,
      planRelSz,
      planSize,
      actualItens,
      actualSize,
      projeto_id,
    };

    console.log("data", data);

    try {
      await api.post("ProbeAdd", data, {
        headers: {
          Authorization: empresaId,
        },
      });

      history.push("/projetoDados");
    } catch (error) {
      alert("Erro ao cadastrar Itens  de Reuso e Base do Probe");
    }
  }

  return (
    <div className="containerProbe">
      <div className="conteiner">
        <section>
          <img src={logoImg} className="LogoLogin" alt="SCEMT" />
          <h1>Cadastrar Itens novos</h1>
          <p>
            Preencha os campos solicitados com as informações do seu projeto.
          </p>
          <p>
            Tipos: CALC, DATA, IO, LOGIC, SETUP, TEXT
          </p>
          <p>
            Tamanho Relativo: VS,
          </p>
          <Link className="back-link" to="/projetoDados">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para dados do projetos
          </Link>
        </section>
        <form onSubmit={ProbeAdd}>
          <table className="tabela">
            <thead>
              <tr className="base">
                <th colSpan={4}></th>
                <th colSpan={3}>ITENS PLANEJADO</th>
                <th colSpan={2}>ACTUAL ITENS</th>
              </tr>
              <tr className="headBase">
                <th className="nomeBase" colSpan={2}>
                  {" "}
                  ITENS ADICIONADOS
                </th>

                <th colSpan={2}> TIPO </th>
                <th> ITENS</th>
                <th> TAM REL</th>
                <th> TAM</th>
                <th> ITENS</th>
                <th> TAM</th>
              </tr>
            </thead>
            <tbody className="bodyBase">
              <tr>
                <td colSpan={2}>
                  <input
                    value={addedName}
                    onChange={(e) => setaddedName(e.target.value)}
                    placeholder="Nome do novo item "
                  />
                </td>
                <td colSpan={2}>
                  <input
                    value={partType}
                    onChange={(e) => setpartType(e.target.value.toUpperCase())}
                    placeholder=""
                  />
                </td>

                <td>
                  <input
                    value={planItens}
                    onChange={(e) =>
                      setplanItens(mask(unMask(e.target.value), ["999"]))
                    }
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    value={planRelSz}
                    onChange={(e) => setplanRelSz(e.target.value.toUpperCase())}
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    value={planSize}
                    onChange={(e) =>
                      setplanSize(mask(unMask(e.target.value), ["999"]))
                    }
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    value={actualItens}
                    onChange={(e) =>
                      setactualItens(mask(unMask(e.target.value), ["999"]))
                    }
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    value={actualSize}
                    onChange={(e) =>
                      setactualSize(mask(unMask(e.target.value), ["999"]))
                    }
                    placeholder=""
                  />
                </td>
              </tr>
            </tbody>

            <thead>
              <tr>
                <select
                  value={projeto_id.id}
                  onChange={(e) => setprojeto_id(e.target.value)}
                >
                  <option value="">Selecione o projeto</option>
                  {listProjetos.map((e) => (
                    <option value={e.id}>{e.nome}</option>
                  ))}
                </select>
              </tr>
            </thead>
          </table>

          <button className="button" type="submit">
            Salvar dados do Probe
          </button>
        </form>
      </div>
    </div>
  );
}
