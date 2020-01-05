import React from 'react';

import { MdAssignment, MdAttachMoney, MdHelpOutline, MdPerson } from 'react-icons/md';

import { Container, Title, Panel, PanelCard, PanelInfo } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Title>
        <h2>Dashboard</h2>
      </Title>
      <Panel>
        <PanelCard to="/student">
          <PanelInfo>
            <div>
              <MdPerson size={72} color="#f17083"/>
            </div>
            <span>Alunos</span>
            <small>(25)</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/plan">
        <PanelInfo>
            <div>
              <MdAttachMoney size={72} color="#f17083"/>
            </div>
            <span>Planos</span>
            <small>(3)</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/enrollment">
        <PanelInfo>
            <div>
              <MdAssignment size={72} color="#f17083"/>
            </div>
            <span>Matrículas</span>
            <small>(7)</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/helpOrder">
          <PanelInfo>
            <div>
              <MdHelpOutline size={72} color="#f17083"/>
            </div>
            <span>Pedidos de Auxílio</span>
            <small>(8)</small>
          </PanelInfo>
        </PanelCard>
      </Panel>
    </Container>
  );
}
