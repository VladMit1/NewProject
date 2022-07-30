import React, { useState, useEffect } from 'react';
import { Node } from './Node';
import Astar from './astar';
import { Enemy } from '../Units/Enemy';
import '../../scss/main.scss';

export const Pathfind = () => {
   const cols = 50;
   const rows = 25;
   const NodeStartRow = 8;
   const NodeStartCol = 8;
   const NodeEndRow = 20;
   const NodeEndCol = 41;
   const [Grid, setGrid] = useState([]); //grid
   const [path, setPath] = useState([]);
   const [visitedNodes, setVisitedNodes] = useState([]);
   const [node, setNode] = useState({
      cx: null,
      cy: null
   });
   const [coords, setCoords] = useState(0);
   //const callFromNode = (dataNodeX, dataNodeY) => {
   //   setNode({
   //      cx: dataNodeX,
   //      cy: dataNodeY
   //   });
   //};

   useEffect(() => {
      initGrid();
      visualizePath();
   }, [node]);
   useEffect(() => {
      settingCoords();
   }, [path]);

   const initGrid = () => {
      const grid = new Array(rows);

      for (let i = 0; i < rows; i++) {
         grid[i] = new Array(cols);
      }
      createSpots(grid);
      setGrid(grid);
      addNeighbors(grid);
      const startNode = grid[NodeStartRow][NodeStartCol];
      const endNode = grid[NodeEndRow][NodeEndCol];
      let paths = Astar(startNode, endNode);
      setPath(paths.path);
      setVisitedNodes(paths.visitedNode);
   };
   // create grid
   const createSpots = (grid) => {
      for (let i = 0; i < rows; i++) {
         for (let j = 0; j < cols; j++) {
            grid[i][j] = new Spot(i, j);
         }
      }
   };
   //add neighbors
   const addNeighbors = (grid) => {
      for (let i = 0; i < rows; i++) {
         for (let j = 0; j < cols; j++) {
            grid[i][j].addneighbors(grid);
         }
      }
   };
   //create Wall
   //const getNewGridWithWall = (grid, x, y) => {
   //   console.log(x,y);
   //   for (let i = 0; i < rows; i++) {
   //      for (let j = 0; j < cols; j++) {
   //         const newGrid = grid.slice();
   //         const node = newGrid[x][y];
   //         console.log(node);
   //         if (!node.isStart && node.isEnd) {
   //            const newNode =
   //               node.isWall= true
   //            ;
   //            console.log(newNode);
   //            newGrid[x][y] = newNode;
   //         }
   //         return newGrid;
   //      }
   //   }
   //};
   //------------spots------------
   function Spot(i, j) {
      this.x = i;
      this.y = j;
      this.isStart = this.x === NodeStartRow && this.y === NodeStartCol;
      this.isEnd = this.x === NodeEndRow && this.y === NodeEndCol;
      this.g = 0;
      this.f = 0;
      this.h = 0;
      this.neighbors = [];
      this.isWall = false;
      this.previous = undefined;
      if (Math.random(1) < 0.2) {
         this.isWall = true;
      }
      if (this.x === NodeStartRow && this.y === NodeStartCol) {
         this.isWall = false;
      }
      if (this.x === NodeEndRow && this.y === NodeEndCol) {
         this.isWall = false;
      }

      this.addneighbors = function (grid) {
         let i = this.x;
         let j = this.y;
         if (i > 0) this.neighbors.push(grid[i - 1][j]);
         if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
         if (j > 0) this.neighbors.push(grid[i][j - 1]);
         if (j < cols - 1) this.neighbors.push(grid[i][j + 1]);
      };
   }

   const GridwithNodes = (
      <div className="grid">
         {Grid.map((row, rowIndex) => {
            return (
               <div key={rowIndex} className="row-wrapper">
                  {row.map((col, colIndex) => {
                     const { isEnd, isStart, isWall } = col;
                     return (
                        <Node
                           key={colIndex}
                           isEnd={isEnd}
                           isStart={isStart}
                           col={colIndex}
                           row={rowIndex}
                           isWall={isWall}
                           //callFromNode={callFromNode}
                           //Spot={getNewGridWithWall}
                        ></Node>
                     );
                  })}
               </div>
            );
         })}
      </div>
   );
   const settingCoords = () => {
      for (let i = 0; i <= visitedNodes.length; i++) {
         if (i === visitedNodes.length) {
            getCoords(path);
         }
      }
   };
   const getCoords = (shortPathNode) => {
      const getCoorsX = [];
      const nodeArray = [];
      for (let i = 0; i < shortPathNode.length; i++) {
         const node = shortPathNode[i];
         nodeArray.push(node);
         getCoorsX.push({
            left: node.y * 50,
            top: node.x * 50
         });
      }
      setCoords(getCoorsX.reverse());
   };

   const visualizeShortPath = (shortPathNode) => {
      for (let i = 0; i < shortPathNode.length; i++) {
         const node = shortPathNode[i];
         setTimeout(() => {
            document.getElementById(`node-${node.x}-${node.y}`).className =
               'node node-short-path';
         }, 10 * i);
      }
   };

   const visualizePath = () => {
      for (let i = 0; i <= visitedNodes.length; i++) {
         if (i === visitedNodes.length) {
            setTimeout(() => {
               visualizeShortPath(path);
            }, 2 * i);
         } else {
            setTimeout(() => {
               const node = visitedNodes[i];
               document.getElementById(`node-${node.x}-${node.y}`).className =
                  'node node-visited';
            }, 2 * i);
         }
      }
   };



   
   return (
      <div className="wrapper">
         <button
            onClick={visualizePath}
            style={{ position: 'fixed', bottom: 150, left: 50, zIndex: '3' }}
         >
            Wiew Path
         </button>
         <Enemy X={coords} />
         {GridwithNodes}
         {/*{GridwithNodesMini}*/}
      </div>
   );
};
