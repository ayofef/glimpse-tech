import React from 'react';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import LinePath from './LinePath';
// import { LinePath } from '@visx/shape';

export const AXIS_COLOR = 'blue';
export const AXIS_BOTTOM_TICK_LABEL_PROPS = (xTick) => ({
  textAnchor: 'middle',
  fontFamily: 'Roboto',
  fontSize: 15,
  fontWeight: '900',
  fill: AXIS_COLOR,
  ...(xTick === 1 && { dx: '0.2em' }),
});
export const AXIS_LEFT_TICK_LABEL_PROPS = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Roboto',
  fontSize: 15,
  fontWeight: '900',
  textAnchor: 'end',
  fill: AXIS_COLOR,
};

const LineChart = ({
  data,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  stroke,
  top,
  left,
  xTickFormat,
  children,
  xMax,
}) => {
  if (!data) return null;
  // accessors
  const getDate = (d) => d.x;
  const getStockValue = (d) => d?.y;

  if (width < 10) return null;
  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinePath
        data={data}
        x={(d) => xScale(getDate(d)) || 0}
        y={(d) => yScale(getStockValue(d)) || 0}
        strokeWidth={2}
        stroke={stroke}
        xMax={xMax}
      />
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax + margin.top}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={AXIS_COLOR}
          tickStroke={AXIS_COLOR}
          tickLabelProps={(props) => AXIS_BOTTOM_TICK_LABEL_PROPS(props)}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={6}
          stroke={AXIS_COLOR}
          tickStroke={AXIS_COLOR}
          tickLabelProps={() => AXIS_LEFT_TICK_LABEL_PROPS}
          tickFormat={(d) => {
            return xTickFormat ? xTickFormat(d) : d;
          }}
        />
      )}
      {children}
    </Group>
  );
};

export default LineChart;
