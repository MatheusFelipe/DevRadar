import React from 'react';
import styled from 'styled-components';

const DevContainer = styled.li`
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  padding: 20px;
`;

const DevHeader = styled.header`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const DevAvatar = styled.img`
  border-radius: 50px;
  height: 54px;
  width: 54px;
`;

const DevInfo = styled.div`
  margin-left: 10px;
`;

const DevName = styled.strong`
  color: #333;
  display: block;
  font-size: 16px;
`;

const DevTechs = styled.span`
  color: #999;
  font-size: 13px;
  margin-top: 2px;
`;

const RemoveDev = styled.div`
  color: red;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 auto auto;
`;

const DevBio = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 20px;
  margin: 10px 0;
`;

const DevLink = styled.a`
  color: #8e4dff;
  font-size: 14px;
  text-decoration: none;
  :hover {
    color: #5a2ea6;
  }
`;

const DevItem = ({ dev, onRemove }) => (
  <DevContainer>
    <DevHeader>
      <DevAvatar src={dev.avatarUrl} alt={dev.name} />
      <DevInfo>
        <DevName>{dev.name}</DevName>
        <DevTechs>{dev.techs.join(', ')}</DevTechs>
      </DevInfo>
      <RemoveDev title="Remove usuário" onClick={onRemove}>
        X
      </RemoveDev>
    </DevHeader>
    <DevBio>{dev.bio}</DevBio>
    <DevLink href={`https://github.com/${dev.githubUsername}`}>Acessar perfil no GitHub</DevLink>
  </DevContainer>
);

export default DevItem;
