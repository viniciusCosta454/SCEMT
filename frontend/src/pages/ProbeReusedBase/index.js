import React, { useState, useEffect } from "react";
import "./styleProbe.css";
import logoImg from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import { mask, unMask } from "remask";

export default function ProbeReusedBase() {
  const [baseName, setbaseName] = useState("");
  const [planBase, setplanBase] = useState("");
  const [planDel, setplanDel] = useState("");
  const [planMod, setplanMod] = useState("");
  const [planAdd, setplanAdd] = useState("");
  const [actualBase, setactualBase] = useState("");
  const [actualDel, setactualDel] = useState("");
  const [actualMod, setactualMod] = useState("");
  const [actualAdd, setactualAdd] = useState("");
  const [reusedName, setreusedName] = useState("");
  const [plan, setplan] = useState("");
  const [actual, setactual] = useState("");

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

  async function ProbeReusedBase(e) {
    e.preventDefault();

    const data = {
      baseName,
      planBase,
      planDel,
      planMod,
      planAdd,
      actualBase,
      actualDel,
      actualMod,
      actualAdd,
      reusedName,
      plan,
      actual,
      projeto_id,
    };

    console.log("data", data);

    try {
      await api.post("ProbeReusedBase", data, {
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
          <h1>Cadastrar Itens em Reuso e Base para o projeto</h1>
          <p>
            Preencha os campos solicitados com as informações do seu projeto.
          </p>
          <Link className="back-link" to="/projetoDados">
            <FiArrowLeft size={16} color="#38b6ff" />
            Voltar para dados do projetos
          </Link>
        </section>
        <form onSubmit={ProbeReusedBase}>
          <table className="tabela">
            <thead>
              <tr className="base">
                <th colSpan={1}></th>
                <th colSpan={4}>PLANEJADO BASE</th>
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
                <td><input
            value={baseName}
            onChange={(e) => setbaseName(e.target.value)}
            placeholder="Nome do item Base"
          /></td>
                <td><input
            value={planBase}
            onChange={(e) =>
              setplanBase(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
                <td><input
            value={planDel}
            onChange={(e) =>
              setplanDel(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
                <td><input
            value={planMod}
            onChange={(e) =>
              setplanMod(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
                <td><input
            value={planAdd}
            onChange={(e) =>
              setplanAdd(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
                <td><input
            value={actualBase}
            onChange={(e) =>
              setactualBase(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
                <td><input
            value={actualDel}
            onChange={(e) =>
              setactualDel(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
                <td><input
            value={actualMod}
            onChange={(e) =>
              setactualMod(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
                <td><input
            value={actualAdd}
            onChange={(e) =>
              setactualAdd(mask(unMask(e.target.value), ["999"]))
            }
            placeholder=""
          /></td>
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
                <td><input
            value={reusedName}
            onChange={(e) => setreusedName(e.target.value)}
            placeholder="Nome do item em Reuso"
          /></td>
                <td colSpan={2}><input
            value={plan}
            onChange={(e) =>
              setplan(mask(unMask(e.target.value), ["99999"]))
            }
            placeholder=""
          /></td>
                <td colSpan={2}><input
            value={actual}
            onChange={(e) =>
              setactual(mask(unMask(e.target.value), ["99999"]))
            }
            placeholder=""
          /></td>
              </tr>
            </tbody>

            <thead>
            <tr><select value={projeto_id.id} onChange={(e) => setprojeto_id(e.target.value)}>
              <option value="">Selecione o projeto</option>
              { 
              listProjetos.map((e) => <option value={e.id}>{e.nome}</option>)
              }
              </select></tr>
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
