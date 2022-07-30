function Astar(startNode, endNode) {
   let openSet = []; //start Point
   let closedSet = []; //end Point
   let path = []; // short points
   let visitedNode = []; //all points
   openSet.push(startNode);
   while (openSet.length > 0) {
      let leastIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
         if (openSet[i].f < openSet[leastIndex].f) {
            leastIndex = i;
         }
      }
      let current = openSet[leastIndex];
      visitedNode.push(current);
      if (current === endNode) {
         let temp = current;
         path.push(temp);
         while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
         }
         return { path, visitedNode };
      }
      openSet = openSet.filter((elt) => elt !== current);
      closedSet.push(current);
      let neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
         let neighbor = neighbors[i];
         if (!closedSet.includes(neighbor) && !neighbor.isWall) {
            let tempG = current.g + 1;
            let newPath = false;
            if (openSet.includes(neighbor)) {
               if (tempG < neighbor.g) {
                  neighbor.g = tempG;
                  newPath = true;
               }
            } else {
               neighbor.g = tempG;
               newPath = true;
               openSet.push(neighbor);
            }
            if (newPath) {
               neighbor.h = heruistic(neighbor, endNode);
               //
               neighbor.f = neighbor.f + neighbor.g;
               //
               neighbor.previous = current;
            }
         }
      }
   }
   return { path, visitedNode, error: 'No path found!' };
}
function heruistic(a, b) {
   let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
   return d;
}
export default Astar;
