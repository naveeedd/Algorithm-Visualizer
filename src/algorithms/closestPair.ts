import { Point, AlgorithmStep } from '../types';

export function closestPairAlgorithm(points: Point[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  // Helper to calculate Euclidean distance between two points
  // Time Complexity: O(1) since it involves constant number of operations
  function euclideanDistance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  // Check for special cases like insufficient points, duplicate points,
  // or points lying on the same axis (X or Y).
  // Time Complexity: O(n) where n is the number of points
  if (points.length < 2) {
    steps.push({
      type: 'error',
      points: points,
      message: 'Insufficient points: At least two points are required.'
    });
    return steps;
  }

  // If there are exactly two points, directly calculate and return the distance
  if (points.length === 2) {
    const distance = euclideanDistance(points[0], points[1]);
    steps.push({
      type: 'result',
      points: points,
      pair: [points[0], points[1]],
      distance: distance,
      message: `Only two points, directly calculated distance: ${distance.toFixed(2)}`
    });
    return steps;
  }

  if (new Set(points.map(p => `${p.x},${p.y}`)).size !== points.length) {
    steps.push({
      type: 'error',
      points: points,
      message: 'Duplicate points detected.'
    });
    return steps;
  }

  const allOnXAxis = points.every(p => p.y === points[0].y);
  const allOnYAxis = points.every(p => p.x === points[0].x);

  if (allOnXAxis) {
    steps.push({
      type: 'special-case',
      points: points,
      message: 'All points lie on the same horizontal line (x-axis).'
    });
  } else if (allOnYAxis) {
    steps.push({
      type: 'special-case',
      points: points,
      message: 'All points lie on the same vertical line (y-axis).'
    });
  }

  // Brute force approach to find closest pair when points are 3 or fewer
  // Time Complexity: O(n^2), where n is the number of points
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

  // Merge sort to sort points based on the x and y coordinates
  // Time Complexity: O(n log n), where n is the number of points
  function mergeSort(points: Point[], compareFn: (a: Point, b: Point) => number): Point[] {
    if (points.length <= 1) return points;

    const mid = Math.floor(points.length / 2);
    const left = mergeSort(points.slice(0, mid), compareFn);
    const right = mergeSort(points.slice(mid), compareFn);

    return merge(left, right, compareFn);
  }

  // Merge helper for mergeSort
  // Time Complexity: O(n), where n is the number of points
  function merge(left: Point[], right: Point[], compareFn: (a: Point, b: Point) => number): Point[] {
    const result: Point[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (compareFn(left[i], right[j]) <= 0) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);

    return result;
  }

  // Recursive divide-and-conquer approach to find closest pair
  // Time Complexity: O(n log n), where n is the number of points
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

  // Function to check the closest pair in the region around the midpoint
  // Time Complexity: O(n), where n is the number of points
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

  // Sorting the points based on x and y coordinates
  // Time Complexity: O(n log n), where n is the number of points
  const px = mergeSort(points, (a, b) => a.x - b.x);
  const py = mergeSort(points, (a, b) => a.y - b.y);

  // Find the closest pair using divide-and-conquer approach
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
