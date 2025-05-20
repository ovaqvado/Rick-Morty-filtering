import { useState } from 'react';
import styled from 'styled-components';
import { ButtonsBox } from '../Buttons';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input/Input';
import { useData } from '../providers/DataProvider';

const optionsStatus = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'unknown' }
];
const optionsGender = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Genderless', label: 'Genderless' },
  { value: 'unknown', label: 'unknown' }
];
const optionsSpecies = [
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Poopybutthole', label: 'Poopybutthole' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Robot', label: 'Robot' },
  { value: 'unknown', label: 'unknown' },
  { value: 'Mythological Creature', label: 'Mythological Creature' }
];

export function Filtering() {
  const [status, setStatus] = useState(null);
  const [gender, setGender] = useState(null);
  const [species, setSpecies] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const { setApiURL } = useData();

  function handleReset() {
    setStatus(null);
    setGender(null);
    setSpecies(null);
    setName('');
    setType('');
    setApiURL('https://rickandmortyapi.com/api/character');
  }

  function handleApply() {
    const params = [];
    if (status) params.push(`status=${encodeURIComponent(status)}`);
    if (gender) params.push(`gender=${encodeURIComponent(gender)}`);
    if (species) params.push(`species=${encodeURIComponent(species)}`);
    if (name) params.push(`name=${encodeURIComponent(name)}`);
    if (type) params.push(`type=${encodeURIComponent(type)}`);

    const query = params.length ? `?${params.join('&')}` : '';
    setApiURL('https://rickandmortyapi.com/api/character' + query);
  }

  return (
    <FilterBox>
      <Dropdown
        value={status}
        onChange={setStatus}
        options={optionsStatus}
        placeholder="Status"
      />
      <Dropdown
        value={gender}
        onChange={setGender}
        options={optionsGender}
        placeholder="Gender"
      />
      <Dropdown
        value={species}
        onChange={setSpecies}
        options={optionsSpecies}
        placeholder="Species"
      />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
      />
      <ButtonsBox onApply={handleApply} onReset={handleReset} />
    </FilterBox>
  );
}

const FilterBox = styled.div`
  @media (min-width: 230px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px !important;
  }
  @media (min-width: 530px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 50px;
  }
`;
