import React from 'react';
import { useMousePosition } from './customHooks';

import './MouseCircle.scss';

export default function MouseCircle() {
  return null; // TODO

  const { left, top } = useMousePosition();

  if (left === 0 && top === 0) {
    return null;
  }

  return (
    <svg className="MouseCircle" style={{ top, left }} width="100" height="100">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  )
}
