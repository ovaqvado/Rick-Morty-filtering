import styled from 'styled-components';

export function Input({ placeholder, value, onChange }) {
  return (
    <InputBox value={value} onChange={onChange} placeholder={placeholder} />
  );
}

const InputBox = styled.input`
  border: 1px solid #83bf46;
  box-sizing: border-box;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 16px;
  background: #263750;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  color: white;
  outline: none;
  ::placeholder {
    padding-top: 20px;
    color: rgba(179, 179, 179, 1);
    font-size: 16px;
    font-weight: 600;
  }
  @media (min-width: 230px) {
    width: 240px;
    height: 40px;
  }
  @media (min-width: 530px) {
    width: 180px;
    height: 40px;
  }
`;
