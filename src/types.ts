export interface Point {
  x: number;
  y: number;
}

export type InputData = Point[] | number[];

export interface StripArea {
  left: number;
  right: number;
}

export interface AlgorithmStep {
  type: 'divide' | 'compare' | 'result';
  points?: Point[];
  midpoint?: number;
  pair?: [Point, Point];
  distance?: number;
  stripArea?: StripArea;
  message: string;
}

export interface KaratsubaStep {
  level: number;
  num1: number;
  num2: number;
  high1?: number;
  low1?: number;
  high2?: number;
  low2?: number;
  z0?: number;
  z1?: number;
  z2?: number;
  result: number;
  message: string;
}

export type AlgorithmType = 'closest-pair' | 'karatsuba';