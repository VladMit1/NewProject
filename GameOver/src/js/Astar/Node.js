import React, { useState, useEffect } from 'react';

export const Node = ({
   isStart,
   isEnd,
   col,
   row,
   isWall,
   callFromNode,
   Spot
}) => {
   const idEvent = (e) => {
      console.log(e.target)
   }
// setTimeout(() => {})
//   const isClicked = () => {
//      callFromNode(row, col);
//   };

   const classes = isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : isEnd
      ? 'node-end'
      : '';
   return (
      <div
         onContextMenu={idEvent}
         //onClick={isClicked}
         //style={{ background:'url(../../img/Texture.png'}}
         className={`node ${classes}`}
         id={`node-${row}-${col}`}
      ></div>
   );
};
