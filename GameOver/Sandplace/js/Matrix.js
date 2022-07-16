import React, { useState, useEffect } from 'react';
import { Point } from './Point';
import { SelectManager } from './select/SelectManager';
import { Enemy } from './Units/Enemy';
import { Pathfind } from './Astar/PathFind';
export const Matrix = () => {
   const block = {
      //width: 2500,
      position: 'absolute',
      paddingTop: '2em',
      //paddingBottom:'20em',
      display: 'grid',
      //transform: 'rotateY(45deg)',
      gridTemplateColumns: 'repeat(5, 1fr)'
   };

   return (
      <>
         <Pathfind></Pathfind>
         {/*<SelectManager />*/}
      </>
   );
};
