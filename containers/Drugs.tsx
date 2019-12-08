import React from 'react';

import DrugsComponent from '../components/DrugsComponent'
import useDrugs from '../hooks/useDrugs'

const Drugs = () => {
  const [drugs, setDrugs] = useDrugs()
  return (
    <DrugsComponent drugs={drugs} onDrugsUpdate={setDrugs} />
  );
};

export default Drugs;
