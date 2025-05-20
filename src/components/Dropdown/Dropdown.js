import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const Dropdown = ({
  options = [],
  placeholder = 'Gender',
  onChange,
  value
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((option) => option.value === value) || null
  );
  const ref = useRef(null);

  useEffect(() => {
    setSelected(options.find((option) => option.value === value) || null);
  }, [value, options]);

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onChange(option.value);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelected(null);
    setOpen(false);
    onChange && onChange(null);
  };

  return (
    <DropdownContainer ref={ref}>
      <DropdownSelected onClick={() => setOpen((prev) => !prev)}>
        <span>{selected ? selected.label : placeholder}</span>
        <IconsBox>
          {selected ? (
            <ClearButton
              onClick={(e) => {
                e.stopPropagation();
                handleClear(e);
              }}
              title="Clear"
              tabIndex={-1}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M4 12L8 8L12 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  width="16px"
                  height="16px"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4L8 8L12 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ClearButton>
          ) : (
            <DropdownArrow open={open}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DropdownArrow>
          )}
        </IconsBox>
      </DropdownSelected>
      {open && (
        <DropdownList
          value={value || ''}
          onChange={(e) => onChange(e.target.value || null)}
        >
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option)}
              selected={selected?.value === option.value}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  @media (min-width: 530px) {
    position: relative;
    width: 180px;
    height: 40px;
    font-family: inherit;
    border-radius: 8px;
  }
  @media (min-width: 230px) {
    width: 100%;
  }
`;

const DropdownSelected = styled.div`
  @media (min-width: 230px) {
    border: 1px solid #83bf46;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border-radius: 8px;
    padding-left: 18px;
    background: #263750;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    color: white;
  }
  @media (min-width: 530px) {
    border: 1px solid #83bf46;
    width: 180px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 8px;
    padding-left: 18px;
    background: #263750;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    color: white;
  }
`;

const DropdownArrow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: ${({ open }) => (open ? '#fff' : 'rgba(179,179,179,1)')};
  transition: color 0.15s;
  ${({ open }) => open && 'transform:rotate(180deg);'}
  &:hover,
  &:focus {
    color: rgb(255, 255, 255);
  }
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  margin-left: 8px;
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #f5f5f5;
  transition: color 0.15s;
  &:hover,
  &:focus {
    color: rgba(131, 191, 70, 1);
  }
`;

const DropdownList = styled.ul`
  @media (min-width: 230px) {
    max-width: 240px;
    position: absolute;
    width: 100%;
    background: #fff;
    max-height: 180px !important;
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 4px;
    margin-top: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 999;
    box-shadow: 0px 1px 4px 0px rgba(12, 12, 13, 0.05);
    padding: 0;
    list-style: none;
    user-select: none;
    &::-webkit-scrollbar {
      width: 4px;
      background: rgba(217, 217, 217, 1);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(217, 217, 217, 1);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-button {
      display: none;
      width: 0;
      height: 0;
    }

    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: rgba(217, 217, 217, 1) #fff;
  }
`;

const DropdownItem = styled.li`
  @media (min-width: 230px) {
    user-select: none;
    max-width: 240px;
    padding: 8px;
    cursor: pointer;
    transition: background0.1s;
    ${({ selected }) => selected && 'background: #83bf4633; font-weight:600;'}
    &:hover {
      background: #83bf4633;
    }
  }
`;

const IconsBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  height: 100%;
`;
