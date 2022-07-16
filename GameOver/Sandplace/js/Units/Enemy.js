import React, { useState, useEffect } from 'react';

const style = {
   className: 'range',
   height: 50,
   width: 50,
   backgroundColor: 'violet',
   position: 'absolute',
   zIndex: 2,
   borderRadius: '50%',
   border: '2px solid gray'
};
export const Enemy = ({ path }) => {
   const [enemyStyle, setenemyStyle] = useState({ style });
   const [move, setMove] = useState(path);

   useEffect(() => {
      const moveEn = [];
      moveEn.push(move);
      //console.log(moveEn);
      setMove(path);
   }, [path]);
   console.log(path);

   return (
      <div style={{ ...style, left: move.x, top: move.y }}>
         <div className="unit" height={50} width={50}></div>
      </div>
   );
};
