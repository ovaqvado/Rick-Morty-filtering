import styled from 'styled-components';
import { Button } from './Button';

export function ButtonsBox({ onReset, onApply }) {
  return (
    <ButtonsContainer>
      <Button onClick={onApply} variable="green">
        Apply
      </Button>
      <Button onClick={onReset} variable="red">
        Reset
      </Button>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  @media (min-width: 230px) {
    flex-direction: column;
    gap: 10px !important;
  }

  @media (min-width: 530px) {
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
`;
