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
               onClick={handleEdit}
               style={{
                  height: 50,
                  width: 50,
                  border: 'none',
                  background: texture
               }}
            >
               <div>obj</div>
            </button>
            {editMode && (
               <SelectAdd onSubmit={handleSubmit} title="Zapisz" />
            )}
         </div>
      </>
   );
};
