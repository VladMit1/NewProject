import React, { useState, useEffect } from 'react';

export const PauseStart = () => {
   const [time, setTime] = useState(0);
   const [isRunning, setIsRunning] = useState(true);

   useEffect(() => {
      if (isRunning) {
         const intervalId = setInterval(() => {
            setTime((time) => time + 1);
         }, 1000);

         return () => clearInterval(intervalId);
      }
   }, [isRunning]);

   const handleStop = () => {
      setIsRunning(false);
   };

   const handleStart = () => {
      setIsRunning(true);
   };

   return (
      <div style={{ display: 'flex', justifyContent: 'center', height: 30 }}>
         <button onClick={handleStop}>Pause</button>
         <h2>Time: {time}s</h2>
         <button onClick={handleStart}>Start</button>
      </div>
   );
};
