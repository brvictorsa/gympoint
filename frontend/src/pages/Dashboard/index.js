import React, { useState, useEffect } from 'react';

import { MdAssignment, MdAttachMoney, MdHelpOutline, MdPerson } from 'react-icons/md';
import { Container, Title, Panel, PanelCard, PanelInfo } from './styles';

import api from '../../services/api';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      const response = await api.get('dashboard');

      setData(response.data);
    }

    loadDashboardData();
  }, []);

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
            <small>({data.students})</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/plan">
        <PanelInfo>
            <div>
              <MdAttachMoney size={72} color="#f17083"/>
            </div>
            <span>Planos</span>
            <small>({data.plans})</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/enrollment">
        <PanelInfo>
            <div>
              <MdAssignment size={72} color="#f17083"/>
            </div>
            <span>Matrículas</span>
            <small>({data.enrollments})</small>
          </PanelInfo>
        </PanelCard>
        <PanelCard to="/helpOrder">
          <PanelInfo>
            <div>
              <MdHelpOutline size={72} color="#f17083"/>
            </div>
            <span>Pedidos de Auxílio</span>
            <small>({data.helpOrders})</small>
          </PanelInfo>
        </PanelCard>
      </Panel>
    </Container>
  );
}
