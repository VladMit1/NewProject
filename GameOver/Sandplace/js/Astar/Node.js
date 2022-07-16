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
   const isClicked = () => {
      callFromNode(row, col);
   };

   const classes = isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : isEnd
      ? 'node-end'
      : '';
   return (
      <div
         onClick={isClicked}
         className={`node ${classes}`}
         id={`node-${row}-${col}`}
      ></div>
   );
};
