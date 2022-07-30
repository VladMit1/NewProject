import React, { useState, useEffect } from 'react';
import { Matrix } from './Matrix';
import { PauseStart } from './PauseStart';
const styleHeader = {
   backgroundColor: 'gray',
   position: 'fixed',
   width: '100%',
   height: '2em',
   zIndex: 3
};

const styleFooter = {
   backgroundColor: 'gray',
   position: 'fixed',
   zIndex: 2,
   width: '100%',
   height: '12em',
   bottom: 0
};

const styleBar = {
   backgroundColor: 'gray',
   position: 'fixed',
   zIndex: 2,
   height: '100vh',
   width: '1em',
   opacity: 0
};

export const Window = () => {
   document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
         top()
      }
      if (e.key === 'ArrowDown') {
         down()
      }
      if (e.key === 'ArrowLeft') {
         left()
      }
      if (e.key === 'ArrowRight') {
         right()
      }
   });
   const top = () => {
      window.scrollBy(0, -25);
   };
   const down = () => {
      window.scrollBy(0, 25);
   };
   const right = () => {
      window.scrollBy(25, 0);
   };
   const left = () => {
      window.scrollBy(-25, 0);
   };
   return (
      <div>
         <header style={styleHeader} onMouseMove={top}>
            <PauseStart style={styleHeader} />
         </header>
         <main style={{ display: 'flex' }}>
            <div style={styleBar} onMouseMove={left}></div>
            <Matrix />
            <div style={{ ...styleBar, right: 0 }} onMouseMove={right}></div>
         </main>
         <footer style={styleFooter}></footer>
         <div
            style={{
               ...styleBar,
               width: '100%',
               height: '1em',
               bottom: 0,
               opacity: 0
            }}
            onMouseMove={down}
         ></div>
      </div>
   );
};
