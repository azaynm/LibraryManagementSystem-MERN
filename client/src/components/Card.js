import React from 'react';
import { useNavigate } from "react-router-dom";



function Card({person}) {

  const navigate = useNavigate();

  return(
    <button onClick={()=> navigate(`/book/${person._id}`)}>
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 grid-item">
      <img className="br-100 h2 w2 dib" alt={person.name} src={person.image} style={{width:'250px'}}/>
      <div>
        <h2>{person.title}</h2>
        <p>{person.author}</p>
        <p>{person.price}</p>
      </div>
    </div>
    </button>
  );
}

export default Card;