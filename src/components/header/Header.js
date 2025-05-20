import styled from 'styled-components';
import { Filtering } from '../Filtering';
import { Logo } from './Logo';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filtering />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  @media (min-width: 230px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  @media (min-width: 950px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 355px;
  }
`;
