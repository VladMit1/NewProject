import React, { useState, useEffect } from 'react';
import { SelectAdd } from './SelectAdd';
import { Enemy } from '../Units/Enemy';
const landStyle = {
   height: '100%',
   width: '100%',

};
export const Select = ({ map, onDelete, onEdit, headers }) => {
   const [editMode, setEditMode] = useState(false);
   const [texture, setTexture] = useState('');
   console.log(map);
   useEffect(() => {
      if (map.name === 'null') {
         setTexture(() => {
            return 'url(../img/Texture.png)';
         });
      }
      if (map.name === '1') {
         setTexture(() => {
            return 'url(../img/StoneTexture.png)100% 100% no-repeat ';
         });
      }
   }, []);

   const handleEdit = () => setEditMode((prevEdtiMode) => !prevEdtiMode);

   const handleSubmit = (data) => {
      onEdit(data, map.id);
      headers(data);
   };

   return (
      <>
         <div style={landStyle}>
            <button
               key={map.id}
               onClick={handleEdit}
               style={{
                  height: 50,
                  width: 50,
                  border: 'none',
                  background: texture
               }}
            >
               <div>{map.x}:{map.y}</div>
            </button>
            {editMode && (
               <SelectAdd onSubmit={handleSubmit} title="Zapisz" id={map.id} />
            )}
         </div>
      </>
   );
};
