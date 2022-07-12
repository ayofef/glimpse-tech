import React from 'react';
import { Link } from 'react-router-dom';
import { StyledWrapper, StyledHeader } from './styled';

const NAV = [
  {
    name: 'Nivo',
    path: '/',
  },
  {
    name: 'Recharts',
    path: '/recharts',
  },
  {
    name: 'Visx',
    path: '/visx',
  },
];

const Layout = ({ children }) => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <h1>
          <Link to="/">Charts Spike</Link>
        </h1>
        <ul>
          {NAV.map(({ name, path }) => {
            return (
              <li key={name}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </StyledHeader>
      {children}
    </StyledWrapper>
  );
};

export default Layout;
