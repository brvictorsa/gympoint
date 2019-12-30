import styled from 'styled-components';

export const Container = styled.div`
  max-width: 850px;
  border-radius: 4px;
  margin: 50px auto;
  color: #ee4d64;
  /* display: flex;
  flex-direction: row; */
`;

export const Title = styled.div`
  margin-top: 0px;
  padding: 25px 25px 25px 0;
`;

export const GridCard = styled.div`
  padding: 20px;
  min-height: 280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Card = styled.div`
  margin: 10px;
  min-width: 180px;
  min-height: 180px;
  border: 1px solid #ee4d64;
  border-radius: 4px;
  padding: 25px;
  background-color: #ee4d64;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
