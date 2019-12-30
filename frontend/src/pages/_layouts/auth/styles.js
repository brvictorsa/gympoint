import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 50px 35px;
  height: 448px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 30px;
    margin-bottom: 30px;

    input {
      background: #fff;
      border-radius: 4px;
      border: 1px solid #dddddd;
      height: 44px;
      padding: 0 15px;
      color: #999999;
      margin: 0 0 15px;

      &::placeholder {
        width: 150px;
        height: 19px;
        color: #999999;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 400;
      }
    }

    label {
      width: 90px;
      height: 16px;
      color: #444444;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 15px;
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin-bottom: 10px;
      font-weight: normal;
      font-size: 80%;
      margin-top : -10px;
      padding-left: 5px;
    }

    button {
      margin: 0 0 5px;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
