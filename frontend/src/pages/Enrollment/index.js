import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import { Container, PageInfo, Grid, GridRow, GridColumn, GridActions, LinkEdit, LinkDelete } from './styles';

import { FaPlus, FaCheckCircle } from 'react-icons/fa';

export default function Enrollment() {
  const headerTitles = ['Aluno', 'Plano', 'Início', 'Término', 'Ativa', ''];
  const [enrollment, setEnrollment] = useState([]);
  const [dataGrid, setDataGrid] = useState([]);

   const formattedDate = (date) => {
     return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt });
   }

  useMemo(() => {
    const formattedData = enrollment.map(item => {
       return {
         id: item.id,
         name: item.student.name,
         planTitle: item.plan.title,
         start_date: formattedDate(parseISO(item.start_date)),
         end_date: formattedDate(parseISO(item.end_date)),
         active: item.active,
       }
    });
    setDataGrid(formattedData);

  }, [enrollment]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');
      setEnrollment(response.data);
    }

    loadEnrollments();
  }, []);

  return (
    <Container>
      <PageInfo>
        <span>Gerenciando Matrículas</span>
        <Link to="/dashboard">
            <FaPlus name="FaPlus" size={16} color="#FFF"/>
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
              <GridColumn>{item.name}</GridColumn>
              <GridColumn>{item.planTitle}</GridColumn>
              <GridColumn>{item.start_date}</GridColumn>
              <GridColumn>{item.end_date}</GridColumn>
              <GridColumn><FaCheckCircle size={22} color={item.active ? "#2c6739" : "#c6c6c6"} /></GridColumn>
              <GridColumn actions>
                <GridActions>
                  <LinkEdit href="/enrollment/edit">editar</LinkEdit>
                  <LinkDelete href="/enrollment/delete">apagar</LinkDelete>
                </GridActions>
              </GridColumn>
            </GridRow>
          </>
        )) }
      </Grid>
    </Container>
  );
}


