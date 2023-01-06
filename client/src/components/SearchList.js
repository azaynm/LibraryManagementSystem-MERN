import React from 'react';
import Card from './Card';
import '../index.css';


function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(person =>  <Card key={person.id} person={person} />); 
  return (
    <div className='grid-container'>
      {filtered}
    </div>
  );
}

export default SearchList;