import styled, { css } from 'styled-components';

export function Button({ children, variable = 'green', onClick }) {
  return (
    <ButtonVariable $variant={variable} onClick={onClick}>
      {children}
    </ButtonVariable>
  );
}
const ButtonVariable = styled.button`
  width: 85px;
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 400;
  border-radius: 8px;
  transition: 0.3s;
  ${({ $variant }) =>
    $variant === 'green' &&
    css`
      border: 1px solid rgba(131, 191, 70, 1);
      background: none;
      color: rgba(131, 191, 70, 1);
      &:hover {
        background: rgba(131, 191, 70, 1);
        color: white;
      }
    `}
  ${({ $variant }) =>
    $variant === 'red' &&
    css`
      border: 1px solid rgba(255, 81, 82, 1);
      color: rgba(255, 81, 82, 1);
      background: none;
      &:hover {
        background: rgba(255, 81, 82, 1);
        color: white;
      }
    `}
    :hover {
    cursor: pointer;
  }
  @media (min-width: 230px) {
    width: 100%;
  }
`;
