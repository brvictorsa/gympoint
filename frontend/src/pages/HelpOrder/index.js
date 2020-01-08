import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSyncAlt } from 'react-icons/fa';

import api from '../../services/api';

import { Container, PageInfo, Grid, GridRow, GridColumn, GridActions, LinkAnswer } from './styles';

export default function HelpOrder() {
  const headerTitles = ['Aluno', ''];
  const [dataGrid, setDataGrid] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/answer/help-orders', {
        attributes: ['id', 'question', 'student'],
      });
      setDataGrid(response.data);
    }

    loadHelpOrders();
  }, []);

  return (
    <Container>
      <PageInfo>
        <span>Pedidos de Auxílio</span>
        <Link to="/dashboard">
            <FaPlus size={16} color="#FFF"/>
            Cadastrar
        </Link>
      </PageInfo>

      <Grid>
        <GridRow>
          { headerTitles.map(title => (
            <GridColumn header>{title}</GridColumn>
          )) }
        </GridRow>

        { dataGrid && dataGrid.map((item) => (
          <>
            <GridRow key={item.id.toString()}>
              <GridColumn>{item.student.name}</GridColumn>
              <GridColumn actions>
                <GridActions>
                  <LinkAnswer href="/help-order/answer">responder</LinkAnswer>
                </GridActions>
              </GridColumn>
            </GridRow>
          </>
        )) }
      </Grid>
    </Container>
  );
}


