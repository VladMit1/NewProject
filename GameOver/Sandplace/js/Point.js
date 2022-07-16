import React, { useState, useEffect } from 'react';
import { Enemy } from './Units/Enemy';
import { Select } from './select/Select';


const BASE_URL = 'http://localhost:4001';
const ENDPOINT = '/map';
const fullUrl = `${BASE_URL}${ENDPOINT}`;

export const Point = () => {
   const counter = [];
   const [maps, setMaps] = useState([]);
   //const [distans, setDistans] = useState([]);
   useEffect(() => {
      fetch(fullUrl)
         .then((response) => response.json())
         .then((data) => setMaps(data));
   }, []);
   
   return (
      <>
         {maps.map((m,x) => {
            //return m.map((map, y) => {
               //console.log(map);
                  return (
                     <Select key={x} x={x}  map={maps} fullUrl={fullUrl}>
                     
                     </Select>
                  );
               
            //});
         })}
      </>
   );
};
