import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from  'react-router-dom';

import { Container, Content, Profile, LogoutButton } from './styles';
import { signOut } from '../../store/modules/auth/actions';
import logo from '~/assets/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

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
            <strong>Adminstrador</strong>
            <LogoutButton onClick={handleLogout}>sair do sistema</LogoutButton>
            {/* <Link to="/">sair do sistema</Link> */}
          </div>
        </Profile>
      </Content>
    </Container>
  );
}
