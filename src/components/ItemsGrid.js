import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card/Card';
import { Popup } from './popup';
import { useData } from './providers';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const cardOnClickHandler = useCallback((props) => {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }, []);
  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((props) => (
        <Card key={props.id} onClickHandler={cardOnClickHandler} {...props} />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
