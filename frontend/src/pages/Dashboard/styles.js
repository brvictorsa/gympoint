import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 850px;
  border-radius: 4px;
  margin: 50px auto;
  color: #ee4d64;
`;

export const Title = styled.div`
  margin-top: 0px;
  padding: 25px 25px 25px 10px;

  @media(max-width: 620px) {
      margin-left: 30px;
   }
`;

export const Panel = styled.div`
  display: grid;
  grid-gap: 25px 25px;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 10px;

  @media(max-width: 620px) {
      grid-template-columns: repeat(1, 1fr);
      margin: 0 30px;
   }
`;

export const PanelCard = styled(Link)`
   display: flex;
   flex-shrink: 1;
   align-items: center;
   justify-content: center;
   border-radius: 16px;
   box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
   background-color: #fafafa;
   min-height: 230px;

   &:hover {
     transition: background-color .5s ease;
     background-color: #fdedef;
     box-shadow: 0 5px 5px 0 rgba(142, 42, 60, 0.28), 0 3px 1px -2px rgba(142, 42, 60, 0.4), 0 1px 5px 0 rgba(142, 42, 60, 0.24);
   }
`;

export const PanelInfo = styled.div`
  color: #ee4d64;
  span {
    margin-bottom: 5px;
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  }
  small {
    color: #f17083;
    font-size: 14px;
    margin-left: 5px;
  }
`;
