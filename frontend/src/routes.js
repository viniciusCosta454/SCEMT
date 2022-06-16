import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";
import EditProd from "./pages/EditIncident";
import Clientes from "./pages/Cliente";
import ClientesNew from "./pages/ClienteNew";
import ClientesEdit from "./pages/ClientesEdit";
import Membro from "./pages/Membro";
import MembroNew from "./pages/MembroNew";
import MembroEdit from "./pages/MembroEdit";
import Entrega from "./pages/Entrega";
import EntregaNew from "./pages/EntregaNew";
import EntregaEdit from "./pages/EntregaEdit";
import Projeto from "./pages/Projeto";
import ProjetoDados from "./pages/ProjetoDados";
import ProjetoNew from "./pages/ProjetoNew";
import FazerPedido from "./pages/FazerPedido";
import PedidosNew from "./pages/PedidosNew";
import RelatorioM from "./pages/RelatorioM";
import Help from "./pages/Help";
import Financeiro from "./pages/Financeiro";
import FinanceiroNew from "./pages/FinanceiroNew";
import Equipe from "./pages/Equipe";
import EquipeNew from "./pages/EquipeNew";
import EquipeEdit from "./pages/EquipeEdit";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/cadastro" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/clientes" component={Clientes} />
        <Route path="/cliente/new" component={ClientesNew} />
        <Route path="/cliente/edit" component={ClientesEdit} />
        <Route path="/profile" component={Profile} />
        <Route path="/prod/new" component={NewIncident} />
        <Route path="/prod/edit" component={EditProd} />
        <Route path="/membro" component={Membro} />
        <Route path="/membroNew" component={MembroNew} />
        <Route path="/membroEdit" component={MembroEdit} />
        <Route path="/entrega" component={Entrega} />
        <Route path="/entregaNew" component={EntregaNew} />
        <Route path="/entregaEdit" component={EntregaEdit} />
        <Route path="/pedidos" component={FazerPedido} />
        <Route path="/pedido/new" component={PedidosNew} />
        <Route path="/projetos" component={Projeto} />
        <Route path="/projetoDados" component={ProjetoDados} />
        <Route path="/novoProjeto" component={ProjetoNew} />
        <Route path="/relatorioM" component={RelatorioM} />
        <Route path="/help" component={Help} />
        <Route path="/financeiro" component={Financeiro} />
        <Route path="/financeiroNew" component={FinanceiroNew} />
        <Route path="/equipe" component={Equipe} />
        <Route path="/equipeNew" component={EquipeNew} />
        <Route path="/equipeEdit" component={EquipeEdit} />
      </Switch>
    </BrowserRouter>
  );
}
