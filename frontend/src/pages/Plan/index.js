import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import api from '../../services/api';

import { Container, PageInfo, Grid, GridRow, GridColumn, GridActions, LinkEdit, LinkDelete } from './styles';

export default function Plan() {
  const headerTitles = ['Título', 'Duração', 'Valor p/ Mês', ''];
  const [plan, setPlan] = useState([]);
  const [dataGrid, setDataGrid] = useState([]);

  const formattedPrice = (price) => {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  useMemo(() => {
    let count = 0;
    const formattedPlans = plan.map(item => {
      ++count;
      return {
        id: count,
        title: item.title,
        duration: item.duration === 1 ? `${item.duration} mês` : `${item.duration} meses`,
        price: formattedPrice(item.monthly_price),
      }
    });

    setDataGrid(formattedPlans);
  }, [plan]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlan(response.data);
    }

    loadPlans();
  }, []);

  return (
    <Container>
      <PageInfo>
        <span>Gerenciando Planos</span>
        <Link to="/dashboard">
            <MdAdd size={22} color="#FFF"/>
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
              <GridColumn>{item.title}</GridColumn>
              <GridColumn>{item.duration}</GridColumn>
              <GridColumn>{item.price}</GridColumn>
              <GridColumn actions>
                <GridActions>
                  <LinkEdit href="/plan/edit">editar</LinkEdit>
                  <LinkDelete href="/plan/delete">apagar</LinkDelete>
                </GridActions>
              </GridColumn>
            </GridRow>
          </>
        )) }
      </Grid>
    </Container>
  );
}

