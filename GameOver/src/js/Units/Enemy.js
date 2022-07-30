import React, { useState, useEffect, useRef } from 'react';
export const Enemy = ({ X }) => {
   //const [enemyStyle, setenemyStyle] = useState({ style });
   const [move, setMove] = useState(0);
   const [start, setStart] = useState(null);
   const [end, setEnd] = useState(null);
   const [foundPath, setFoundPath] = useState([]);

   useEffect(() => {
      Array.isArray(X)
         ? X.map((x, t) => {
              setTimeout(() => {
                 setMove(x);
              }, 1000 * t);
           })
         : null;
   }, [X]);

   return (
      <button className="unit" style={{ ...move }}>
         <div></div>
      </button>
   );
};
