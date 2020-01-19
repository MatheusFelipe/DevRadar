import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 30px;
`;

const InputBlock = styled.div`
  margin-top: 20px;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

const Label = styled.label`
  color: #acacac;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 14px;
  height: 32px;
  width: 100%;
`;

const Submit = styled.button`
  background: #7d40e7;
  border: 0;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  padding: 15px 20px;
  transition: background 0.5s;
  width: 100%;
  :hover {
    background: #6931ca;
  }
`;

const DevForm = ({ onSubmit }) => {
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      err => {
        window.console.error(err);
      },
      { timeout: 30000 }
    );
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ githubUsername, techs, latitude, longitude }).then(() => {
      setGithubUsername('');
      setTechs('');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputBlock>
        <Label htmlFor="githubUsername">
          Usuário do Github
          <Input
            name="githubUsername"
            id="githubUsername"
            required
            value={githubUsername}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </Label>
      </InputBlock>

      <InputBlock>
        <Label htmlFor="techs">
          Tecnologias
          <Input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
        </Label>
      </InputBlock>

      <InputGroup>
        <InputBlock>
          <Label htmlFor="latitude">
            Latitude
            <Input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </Label>
        </InputBlock>

        <InputBlock>
          <Label htmlFor="longitude">
            Longitude
            <Input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </Label>
        </InputBlock>
      </InputGroup>

      <Submit type="submit">Salvar</Submit>
    </Form>
  );
};
export default DevForm;
