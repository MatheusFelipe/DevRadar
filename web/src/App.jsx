import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import devsAPI from './services/devsAPI';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

const AppContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  max-width: 1200px;
  padding: 60px 30px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Aside = styled.aside`
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  padding: 30px 20px;
  width: 320px;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Register = styled.strong`
  color: #333;
  display: block;
  font-size: 20px;
  text-align: center;
`;

const Main = styled.main`
  flex: 1;
  margin-left: 30px;
  @media (max-width: 1000px) {
    margin-left: 0;
    margin-top: 30px;
    width: 100%;
  }
`;

const Devs = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const App = () => {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    devsAPI.getDevs().then(setDevs);
  }, []);

  const onSubmit = data =>
    devsAPI.createDev(data).then(dev => {
      const oldDev = devs.find(d => d.id === dev.id);
      if (!oldDev) setDevs([...devs, dev]);
    });

  const onRemove = id =>
    devsAPI.removeDev(id).then(() => {
      setDevs(devs.filter(dev => dev.id !== id));
    });

  return (
    <AppContainer>
      <Aside>
        <Register>Cadastrar</Register>
        <DevForm onSubmit={onSubmit} />
      </Aside>
      <Main>
        <Devs>
          {devs.map(dev => (
            <DevItem key={dev.id} dev={dev} onRemove={() => onRemove(dev.id)} />
          ))}
        </Devs>
      </Main>
    </AppContainer>
  );
};

export default App;
