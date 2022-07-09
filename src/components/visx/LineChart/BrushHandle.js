import React from 'react';
import { Group } from '@visx/group';

const BrushHandle = ({ x, height, isBrushActive }) => {
  const pathWidth = 8;
  const pathHeight = 15;
  if (!isBrushActive) {
    return null;
  }
  return (
    <Group left={x + pathWidth / 2} top={(height - pathHeight) / 2}>
      <path
        fill="#f2f2f2"
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke="#999999"
        strokeWidth="1"
        // eslint-disable-next-line no-inline-styles/no-inline-styles
        style={{ cursor: 'ew-resize' }}
      />
    </Group>
  );
};

export default BrushHandle;
