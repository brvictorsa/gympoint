import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  min-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      width: 135px;
      height: 24px;
    }
    a {
      font-weight: bold;
      color:#999999;
      margin-left: 12px;
    }
    /* active color: #444444 */
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #444444;
    }
  }
  a {
    display: block;
    margin-top: 2px;
    color: #de3b3b;
  }
`;
