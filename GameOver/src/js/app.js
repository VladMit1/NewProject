import '../scss/main.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Window } from './Window';
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
