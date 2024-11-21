import { Point, AlgorithmStep } from '../types';

export function closestPairAlgorithm(points: Point[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  function euclideanDistance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  function bruteForce(points: Point[]): [number, [Point, Point]] {
    let minDist = Infinity;
    let closestPair: [Point, Point] = [points[0], points[1]];
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = euclideanDistance(points[i], points[j]);
        steps.push({
          type: 'compare',
          points: points,
          pair: [points[i], points[j]],
          distance: dist,
          message: `Comparing points (${points[i].x},${points[i].y}) and (${points[j].x},${points[j].y}). Distance: ${dist.toFixed(2)}`
        });
        
        if (dist < minDist) {
          minDist = dist;
          closestPair = [points[i], points[j]];
        }
      }
    }
    return [minDist, closestPair];
  }

  function closestSplitPair(px: Point[], py: Point[], delta: number, bestPair: [Point, Point]): [number, [Point, Point]] {
    const midX = px[Math.floor(px.length / 2)].x;
    const sy = py.filter(p => p.x >= midX - delta && p.x <= midX + delta);
    
    steps.push({
      type: 'divide',
      points: px,
      midpoint: midX,
      message: `Checking split pairs around x = ${midX} with delta = ${delta.toFixed(2)}`
    });

    let minDist = delta;
    
    for (let i = 0; i < sy.length; i++) {
      for (let j = i + 1; j < Math.min(i + 7, sy.length); j++) {
        const dist = euclideanDistance(sy[i], sy[j]);
        steps.push({
          type: 'compare',
          points: sy,
          pair: [sy[i], sy[j]],
          distance: dist,
          message: `Comparing split pair (${sy[i].x},${sy[i].y}) and (${sy[j].x},${sy[j].y}). Distance: ${dist.toFixed(2)}`
        });
        
        if (dist < minDist) {
          minDist = dist;
          bestPair = [sy[i], sy[j]];
        }
      }
    }
    return [minDist, bestPair];
  }

  function recursiveClosestPair(px: Point[], py: Point[]): [number, [Point, Point]] {
    if (px.length <= 3) {
      return bruteForce(px);
    }

    const mid = Math.floor(px.length / 2);
    const qx = px.slice(0, mid);
    const rx = px.slice(mid);
    const midpoint = px[mid].x;

    steps.push({
      type: 'divide',
      points: px,
      midpoint: midpoint,
      message: `Dividing points at x = ${midpoint}`
    });

    const qy = py.filter(p => p.x <= midpoint);
    const ry = py.filter(p => p.x > midpoint);

    const [dl, pairL] = recursiveClosestPair(qx, qy);
    const [dr, pairR] = recursiveClosestPair(rx, ry);
    
    const [delta, bestPair] = dl < dr ? [dl, pairL] : [dr, pairR];
    return closestSplitPair(px, py, delta, bestPair);
  }

  const px = points.sort((a, b) => a.x - b.x);
  const py = points.sort((a, b) => a.y - b.y);
  const [distance, pair] = recursiveClosestPair(px, py);

  steps.push({
    type: 'result',
    points: points,
    pair: pair,
    distance: distance,
    message: `Found closest pair: (${pair[0].x},${pair[0].y}) and (${pair[1].x},${pair[1].y}) with distance ${distance.toFixed(2)}`
  });

  return steps;
}