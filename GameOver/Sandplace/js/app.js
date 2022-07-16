import '../scss/main.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Window } from './Window';

import { Pathfind } from './Astar/PathFind';
document.oncontextmenu = () => {
   return false;
};
const App = () => {
   return (
      <>
         <Window />
      </>
   );
};

ReactDOM.render(<App />, document.getElementById('app'));
