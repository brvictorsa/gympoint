import React from 'react';

import { Container, Title, GridCard, Card } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Title>
        <h2>Dashboard</h2>
      </Title>
      <GridCard>
        <Card>
          <img src="" alt="" />
          <span>Alunos</span>
        </Card>
        <Card> Matrículas </Card>
        <Card> Planos </Card>
        <Card> Pedidos de Auxílio </Card>
      </GridCard>
    </Container>
  );
}
