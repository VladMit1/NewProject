import React, { useEffect, useState } from 'react';
import { SelectAdd } from './SelectAdd';
import { Select } from './Select';
import '../../scss/main.scss';


const BASE_URL = 'http://localhost:4001';
const ENDPOINT = '/map';

const fullUrl = `${BASE_URL}${ENDPOINT}`;

export const SelectManager = ({ style }) => {
   const [maps, setMaps] = useState([]);
   useEffect(() => {
      fetch(fullUrl)
         .then((response) => response.json())
         .then((data) => setMaps(data));
   }, []);

   const handleSold = (id) =>
      fetch(`${fullUrl}/${id}`, { method: 'DELETE' })
         .then(() => fetch(fullUrl))
         .then((response) => response.json())
         .then((data) => setMaps(data));

   const onSubmit = (data) => {
      console.log('aaaaaa');
      fetch(`${fullUrl}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            name: data.name
         })
      })
         .then(() => fetch(fullUrl))
         .then((response) => response.json())
         .then((data) => setMaps(data));
   };

   const handleEdit = (data, id) => {
      fetch(`${fullUrl}/${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            name: data.name
         })
      })
         .then(() => fetch(fullUrl))
         .then((response) => response.json())
         .then((data) => setMaps(data));
   };

   if (!maps.length) {
      return <div>Fetching map...</div>;
   }
   console.log(maps);
   const GridwithNodes = (
      <div className="grid" style={{ marginTop:'2em'}}>
         {maps.map((row, i) => {
            return (
               <div key={i} className="row-wrapper">
                  {/*{row.map((col, j) => {
                     return (*/}
                        <Select
                           key={i}
                           //onDelete={handleSold}
                           map={row}
                           onEdit={handleEdit}
                        />
                  {/*//   );*/}
                  {/*//})}*/}
               </div>
            );
         })}
         <SelectAdd onSubmit={onSubmit} />
      </div>
   );
   return <>{ GridwithNodes }</>;
};
