import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import api from '../../services/api';

import { Container, PageInfo, Grid, GridRow, GridColumn, GridActions, LinkEdit, LinkDelete } from './styles';

export default function Student() {
  const headerTitles = ['Nome', 'E-mail', 'Idade', ''];
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function laodStudents() {
      const response = await api.get('students', {
        attributes: ['id', 'name', 'email', 'age'],
      });
      setStudent(response.data);
    }

    laodStudents();
  }, []);

  return (
    <Container>
      <PageInfo>
        <span>Gerenciando Alunos</span>
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

        { student && student.map((item) => (
          <>
            <GridRow key={item.id.toString()}>
              <GridColumn>{item.name}</GridColumn>
              <GridColumn>{item.email}</GridColumn>
              <GridColumn>{item.age}</GridColumn>
              <GridColumn actions>
                <GridActions>
                  <LinkEdit href="/student/edit">editar</LinkEdit>
                  <LinkDelete href="/student/delete">apagar</LinkDelete>
                </GridActions>
              </GridColumn>
            </GridRow>
          </>
        )) }
      </Grid>
    </Container>
  );
}
