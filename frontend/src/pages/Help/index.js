import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import imagem1 from "./imagens/1.png";
import imagem2 from "./imagens/2.png";
import imagem3 from "./imagens/3.png";
import imagem4 from "./imagens/4.png";
import imagem5 from "./imagens/5.png";
import imagem6 from "./imagens/6.png";
import imagem7 from "./imagens/7.png";
import imagem8 from "./imagens/8.png";
import imagem9 from "./imagens/9.png";
import imagem10 from "./imagens/10.png";
import imagem11 from "./imagens/11.png";
import imagem12 from "./imagens/12.png";
import imagem13 from "./imagens/13.png";
import imagem14 from "./imagens/14.png";
import imagem15 from "./imagens/15.png";
import imagem16 from "./imagens/16.png";
import imagem17 from "./imagens/17.png";
import imagem18 from "./imagens/18.png";
import imagem19 from "./imagens/19.png";
import imagem20 from "./imagens/20.png";
import imagem21 from "./imagens/21.png";
import imagem22 from "./imagens/22.png";
import imagem23 from "./imagens/23.png";
import imagem24 from "./imagens/24.png";

import "./style.css";

import logoImg from "../../assets/logo.png";

export default function Help() {
  const history = useHistory();

  const empresaName = localStorage.getItem("nomeEmpresa");

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="help">
      <header>
        <img src={logoImg} alt="Keep Flux" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/menu">
          Menu
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#38b6ff"></FiPower>
        </button>
      </header>
      <h1>User Guide SCEMT</h1>

      <div className="lista">
        <strong>LOGIN</strong>
        <p>
          Depois de receber nosso código de acesso, será possível realizar o login seguindo os passoas a seguir:
        </p>
        <img src={imagem1} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>PÁGINA INICIAL</strong>
        <p>
          Essa é a primeira página do sistema, nela você encontra todos os seus projetos em andamentos e outras funcionalidades a seguir:
        </p>
        <img src={imagem2} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>ACESSAR O MENU</strong>
        <p>
          Com o botão localizado ao lado do botão de logout é possível acessar o menu do sistema
        </p>
        <img src={imagem3} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>VISUALIZAR MINHAS EQUIPES</strong>
        <p>
          Ao lado do botão "Projetos" temos o botão "Equipes", nele você será encaminhado para a página com todas as suas equipes cadastradas
        </p>
        <img src={imagem4} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>CADASTRAR NOVA EQUIPE</strong>
        <p>
          Com o botão "Cadastrar Nova Equipe" você será encaminhado para a página para criar uma nova equipe, nesta página também existe outros tipos de funcionalidades listados a seguir:
        </p>
        <img src={imagem5} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>CADASTRANDO UMA NOVA EQUIPE</strong>
        <p>
          Nessa página você pode nomear sua nova equipe de acordo com a imagem a seguir:
        </p>
        <img src={imagem6} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>VISUALIZAR MEUS FUNCIONÁRIOS</strong>
        <p>
          Logo abaixo do botão "projetos" temos o botão "Funcionários" que irá encaminhar para a página com todos os Funcionários cadastrados
        </p>
        <img src={imagem7} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>CADASTRAR NOVO FUNCIONÁRIO</strong>
        <p>
          Nessa página é possível cadastrar um novo Funcionário como é mostrado a seguir:
        </p>
        <img src={imagem8} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>CADASTRANDO NOVO FUNCIONÁRIO</strong>
        <p>
          Nessa página é necessário preencher todos os campos solicitados com as informações do seu funcionário e atribuir uma equipe que ele vai participar
        </p>
        <img src={imagem9} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>DELETAR OU EDITAR UM FUNCIONÁRIO</strong>
        <p>
          Nessa página vai ser possível deletar seus funcionários ou editar a equipe que eles estão cadastrados, como é mostrado a seguir:
        </p>
        <img src={imagem10} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>EDITANDO A EQUIPE DO FUNCIONÁRIO</strong>
        <p>
          Nessa página vai ser possível alterar a equipe que o funcionário esta cadastrado, basta selecionar a nova equipe no campo disponibilizado como na imagem a seguir:
        </p>
        <img src={imagem11} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>CRIAR NOVO PROJETO</strong>
        <p>
          Ao lado do botão de logout temos o botão para criar um novo projeto como é mostrado na imagem a seguir:
        </p>
        <img src={imagem12} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>CRIANDO NOVO PROJETO</strong>
        <p>
          Nessa página é necessário que você preencha todos os campos solicitados e selecione todas as equipes que vão trabalhar naquele projeto.
          Lembrando que as equipes que serão listadas são as equipes cadastradas no sistema
        </p>
        <img src={imagem13} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MEUS PROJETOS</strong>
        <p>
          Nessa página é listado todos os projetos criados, cada projeto possui um botão que permite acessar os dados sobre aquele projeto específico
          e é dentro do projeto que será solicitado mais informações sobre ele, para que seja feito o cálculo do PROBE, COCOMO e 
          a geração de gráficos
        </p>
        <img src={imagem14} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>DADOS SOBRE O PROJETO</strong>
        <p>
          Nessa página é listado todas as informações sobre o projeto, a informação é separada em 4 partes, sendo elas 
          os dados de reuso e base do PROBE, os novos itens adicionados, a tabela com os dados do COCOMO e por último
          o gráfico , mas antes de aparecer é necessário cadastrar cada uma delas como é mostrado na imagem a seguir:
        </p>
        <img src={imagem15} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem16} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem17} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem18} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem19} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem20} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem21} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem22} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem23} className="helpimg" alt="Keep Flux" />
      </div>
      <div className="lista">
        <strong>MENU DO SISTEMA:</strong>
        <p>
          Nessa página vai ser possível verificar todas as funcionadivdades que
          o sistema oferece para o usuário do sistema
        </p>
        <img src={imagem24} className="helpimg" alt="Keep Flux" />
      </div>
    </div>
  );
}
