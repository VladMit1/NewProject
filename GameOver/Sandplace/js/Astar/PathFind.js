import React, { useState, useEffect } from 'react';
import { Node } from './Node';
import Astar from './astar';
import { Enemy } from '../Units/Enemy';
import '../../scss/main.scss';

export const Pathfind = () => {
   const cols = 50;
   const rows = 25;
   const NodeStartRow = 4;
   const NodeStartCol = 1;
   const NodeEndRow = 4;
   const NodeEndCol = 12;
   const [Grid, setGrid] = useState([]);
   const [path, setPath] = useState([]);
   const [visitedNodes, setVisitedNodes] = useState([]);
   const [node, setNode] = useState({
      cx: null,
      cy: null
   });
   const [coords, setCoords] = useState([]);

   //console.log(coords);
   const callFromNode = (dataNodeX, dataNodeY) => {
      setNode({
         cx: dataNodeX,
         cy: dataNodeY
      });
   };

   useEffect(() => {
      initGrid();
   }, [node]);
   useEffect(() => {
      visualizePath();
   }, [path]);
   useEffect(() => {
      initGrid();
   }, []);

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
      if (this.x === NodeStartRow && this.y === NodeStartCol) {
         this.isWall = false;
      }
      if (this.x === NodeEndRow && this.y === NodeEndCol) {
         this.isWall = false;
      }
      if (this.x === node.cx && this.y === node.cy) {
         this.isWall = true;
      }

      this.previous = undefined;
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
                           callFromNode={callFromNode}
                           Spot={Spot}
                        ></Node>
                     );
                  })}
               </div>
            );
         })}
      </div>
   );

   const visualizeShortPath = (shortPathNode) => {
      for (let i = 0; i < shortPathNode.length; i++) {
         setTimeout(() => {
            const node = shortPathNode[i];
            document.getElementById(`node-${node.x}-${node.y}`).className =
               'node node-short-path';
            let thr = document
               .getElementById(`node-${node.x}-${node.y}`)
               .getBoundingClientRect();
            return setCoords(thr);
         }, 100 * i);
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
         {/*<button onClick={visualizePath}>visual path</button>*/}
         {/*<h1>Pathfind</h1>*/}
         <Enemy path={coords} />
         {GridwithNodes}
      </div>
   );
};
