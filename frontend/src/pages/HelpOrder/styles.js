import styled from 'styled-components';

export const Container = styled.div`
  color: #444444;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

 export const PageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  max-width: 700px;
  margin-top: 30px;

  span {
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #ee4d64;
    font-size: 14px;
    font-weight: 700;
    height: 39px;
    min-width: 150px;
    border: 0;
    border-radius: 5px;
    padding: 5px 15px;
    text-transform: uppercase;

    svg {
      margin-right: 5px;
    }
  }
 `;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  max-width: 700px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 25px;
  padding: 30px;
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  border-bottom: 1px solid #eeeeee;

  &:last-child {
    border: none;
  }
`;

export const GridColumn = styled.div`
  min-width: 100%;
  min-height: 20px;
  padding: 20px 0;
  font-size: ${ props => (props.header ? '16px' : '15px')};
  font-weight: ${ props => (props.header ? '600' : '100')};
  text-transform: ${ props => (props.header ? 'uppercase' : 'inherit')};
  color: #666666;
`;

export const GridActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

`;

export const LinkAnswer = styled.a`
  color: #4d85ee;
`;


