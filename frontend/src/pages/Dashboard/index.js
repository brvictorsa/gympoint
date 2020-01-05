import React from 'react';
import { Container, Title, Panel, PanelCard, PanelInfo } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Title>
        <h2>Dashboard</h2>
      </Title>
      <Panel>
        <PanelCard to="/students">
          <PanelInfo>
            <span>Alunos</span>
            <small>(25)</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/plans">
        <PanelInfo>
            <span>Planos</span>
            <small>(3)</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/enrollments">
        <PanelInfo>
            <span>Matrículas</span>
            <small>(7)</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/help-orders">
          <PanelInfo>
            <span>Pedidos de Auxílio</span>
            <small>(8)</small>
          </PanelInfo>
        </PanelCard>
      </Panel>
    </Container>
  );
}
