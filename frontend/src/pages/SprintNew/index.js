import React, { useState, useEffect } from 'react';
import "./style.css"
import logoImg from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import api from "../../services/api"
import { mask, unMask } from 'remask'

export default function SprintNew() {
  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState("")
  const [iPlan, setIPlan] = useState("")
  const [tRelPlan, setTRelPlan] = useState("")
  const [tamPlan, setTamPlan] = useState("")
  const [itensR, setItensR] = useState("")
  const [tamR, setTamR] = useState("")

  const tRelPlanOpts = ["VS", "SM", "MD", "LG", "VL"]
  const tipos = ["IO", "Calc", "Math", "Logic", "Visual"]


  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  useEffect(() => {
    api
      .get("/profile/equipe", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        console.log(response.data)
      });
  }, [empresaId]);

  async function newSprint(e) {
    e.preventDefault()

    const projeto_id = localStorage.getItem("idProjeto");

    const data = {
      projeto_id, nome, tipo, iPlan, tRelPlan, tamPlan, iPlan, itensR, tamR
    }

    try {
      await api.post("Sprint", data, {
        headers: {
          Authorization: empresaId
        }
      })
      history.push("/projetoDados")
    } catch (error) {
      alert("Erro ao cadastrar Sprint: " + error)
    }


  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <section>
            <img src={logoImg} className="LogoLogin" alt="SCEMT" />
            <h1>Criar nova Sprint</h1>
            <p>
              Preencha os campos solicitados com as informações da Sprint.
            </p>
            <Link className="back-link" to="/projetoDados">
              <FiArrowLeft size={16} color="#38b6ff" />
              Voltar para projetos
            </Link>
          </section>
        </div>

        <div className="col-8">
          <br />
          <div className="row">
            <div className="col-3 text-center header">
              Nome
            </div>
            <div className="col-2 text-center header">
              <p>Tipo</p>
            </div>
            <div className="col-5">
              <div className="row">
                <div className="col-12 text-center header">
                  <p>Planejado</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-center header">
                  <p>Itens</p>
                </div>
                <div className="col-4 text-center header">
                  <p>Tam. Rel.</p>
                </div>
                <div className="col-4 text-center header">
                  <p>Tam.</p>
                </div>
              </div>
            </div>
            <div className="col-2 text-center header">
              <div className="row">
                <div className="col-12 text-center header">
                  <p>Real</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-center header">
                  <p>Itens</p>
                </div>
                <div className="col-6 text-center header">
                  <p>Tam.</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={newSprint}>


            <div className="row">
              <div className="col-3">
                <input
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className='form-control' />
              </div>
              <div className="col-2">
                <select className='form-control' value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="">----</option>
                  {
                    tipos.map((e) => <option value={e}>{e}</option>)
                  }
                </select>
              </div>
              <div className="col-5">
                <div className="row">
                  <div className="col-4">
                    <input
                      value={iPlan}
                      onChange={e => setIPlan(e.target.value)}
                      className='form-control' />
                  </div>
                  <div className="col-4">
                    <select className='form-control' value={tRelPlan} onChange={(e) => setTRelPlan(e.target.value)}>
                      <option value="">----</option>
                      {
                        tRelPlanOpts.map((e) => <option value={e}>{e}</option>)
                      }
                    </select>
                  </div>
                  <div className="col-4">
                    <input
                      value={tamPlan}
                      onChange={e => setTamPlan(e.target.value)}
                      className='form-control' />
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-6">
                    <input
                      value={itensR}
                      onChange={e => setItensR(e.target.value)}
                      className='form-control' />
                  </div>
                  <div className="col-6">
                    <input
                      value={tamR}
                      onChange={e => setTamR(e.target.value)}
                      className='form-control' />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4 offset-8">
                <button className="button" type="submit">Criar Sprint</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}