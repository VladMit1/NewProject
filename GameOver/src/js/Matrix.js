import React, { useState, useEffect } from 'react';
import { Pathfind } from './Astar/PathFind';
export const Matrix = () => {
   const resetState = () => {
      window.location.reload();
   };
   return (
      <>
         <button
            onClick={resetState}
            style={{ position: 'fixed', zIndex: 5, bottom: 130, left: 50 }}
         >
            Restart
         </button>
         <Pathfind></Pathfind>
      </>
   );
};
