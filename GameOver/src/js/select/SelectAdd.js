import React, { useState } from 'react';

export const SelectAdd = ({ onSubmit, title = 'Dodaj',id }) => {
   const [values, setValues] = useState({
      name: ''
   });

   const [errors, setErrors] = useState({});

   const isValid = () => {
      const errors = {};

      if (!values.name) {
         errors.name = 'Object is required';
      }

      setErrors(errors);
      console.log(!!Object.values(errors).length);
      return !Object.values(errors).length;
   };

   const handleChange = (event) => {
      const value = event.target.value;
      const name = event.target.name;
      console.log(value,name);
      setValues((prevValues) => ({
         ...prevValues,
         [name]: value
      }));
   };

   const handleSubmit = (event) => {
      //event.preventDefault();
      console.log(onSubmit);
      onSubmit &&
         isValid() &&
         onSubmit({
            name: values.name
         });
   };

   return (
      <form
         onSubmit={handleSubmit}
         style={{
            display: 'block',
            padding: 10,
            position: 'fixed',
            bottom: '0',
            left: '0',
            zIndex: 4
         }}
      >
         <div>
            <label>{ id}</label>
            <input
               type="text"
               name="name"
               value={values.name}
               onChange={handleChange}
            />
         </div>
         <input type="submit" value={title} />

         {Object.entries(errors).map(([key, value]) => {
            return (
               value && (
                  <div
                     key={key}
                     style={{ color: 'red', backgroundColor: 'yellow' }}
                  >
                     {key}: {value}
                  </div>
               )
            );
         })}
      </form>
   );
};
