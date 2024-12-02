import { Vector } from "../types/common";

export function addVector(v1: Vector, v2: Vector) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}

export function scaleVector(v: Vector, scale: number) {
  return {
    x: v.x * scale,
    y: v.y * scale,
  };
}
