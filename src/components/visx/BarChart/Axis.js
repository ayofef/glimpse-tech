import React, { useCallback, memo } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';

const AXIS_TYPES = {
  left: AxisLeft,
  bottom: AxisBottom,
  default: () => <div>&nbsp;</div>,
};

const Axis = memo(({ type, tickLabelDy, scale, tickLabelTextAnchor, top }) => {
  const Component = AXIS_TYPES[type] || AXIS_TYPES.default;
  const mergedTickLabelProp = useCallback(
    () => ({
      fill: '#6078EA',
      fontSize: 16,
      textAnchor: 'middle',
      ...(tickLabelDy && { dy: tickLabelDy }),
      ...(tickLabelTextAnchor && { textAnchor: tickLabelTextAnchor }),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tickLabelDy]
  );
  return (
    <Component
      scale={scale}
      hideTicks
      // hideZero
      // numTicks={5}
      // rangePadding={-38}
      // tickFormat={formatDate}
      stroke="#6078EA"
      // tickStroke={"purple3"}
      tickLabelProps={mergedTickLabelProp}
      {...(top && { top })}
    />
  );
});

export default Axis;
