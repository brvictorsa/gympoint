import React from 'react';
import { Link } from  'react-router-dom';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo-header.png';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Gymmpoint" />
          </Link>
          <Link to="/student">ALUNOS</Link>
          <Link to="/plan">PLANOS</Link>
          <Link to="/enrollment">MATRÍCULAS</Link>
          <Link to="/helpOrder">PEDIDOS DE AUXÍLIO</Link>
        </nav>
        <Profile>
          <div>
            <strong>Victor Santos</strong>
            <Link to="/">sair do sistema</Link>
          </div>
        </Profile>
      </Content>
    </Container>
  );
}
