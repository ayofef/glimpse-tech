import styled from 'styled-components';

export const StyledWrapper = styled.div``;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  background-color: #0b0f1f;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    li {
      list-style-type: none;
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;
