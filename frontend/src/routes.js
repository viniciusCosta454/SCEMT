import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Membro from "./pages/Membro";
import MembroNew from "./pages/MembroNew";
import MembroEdit from "./pages/MembroEdit";
import Projeto from "./pages/Projeto";

import ProjetoDados from "./pages/ProjetoDados";
import Componente from "./pages/ProjetoDados";

import ProjetoNew from "./pages/ProjetoNew";
import RelatorioM from "./pages/RelatorioM";
import Help from "./pages/Help";
import Equipe from "./pages/Equipe";
import EquipeNew from "./pages/EquipeNew";
import EquipeEdit from "./pages/EquipeEdit";
//import SprintNew from "./pages/SprintNew";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/cadastro" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/membro" component={Membro} />
        <Route path="/membroNew" component={MembroNew} />
        <Route path="/membroEdit" component={MembroEdit} />
        <Route path="/projetos" component={Projeto} />

        <Route path="/projetoDados" component={ProjetoDados} />
        <Route path="/projetoDados" component={Componente} />

        <Route path="/novoProjeto" component={ProjetoNew} />
        <Route path="/relatorioM" component={RelatorioM} />
        <Route path="/help" component={Help} />
        <Route path="/equipe" component={Equipe} />
        <Route path="/equipeNew" component={EquipeNew} />
        <Route path="/equipeEdit" component={EquipeEdit} />
      </Switch>
    </BrowserRouter>
  );
}
