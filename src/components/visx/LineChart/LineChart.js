/* eslint-disable no-inline-styles/no-inline-styles */
import React, { useMemo, useCallback } from 'react';
import numeral from 'numeral';
import { useTooltip, TooltipWithBounds, defaultStyles as defaultToopTipStyles } from '@visx/tooltip';
import { scaleLinear, scaleTime } from '@visx/scale';
import { localPoint } from '@visx/event';
import { Line, Bar } from '@visx/shape';
import { max, min, extent, bisector } from 'd3-array';
import LineChartGroup from './LineChartGroup';
import { attachCompletetdTasksToUsers } from '../../nivo/constant';

// accessors
const getXdata = (d) => d.x;
const getYdata = (d) => d.y;
const getFormatValue = (d) => numeral(d?.y || 0).format('$0,0.00');
const bisectDate = bisector((d) => d.x).right;
const margin = { top: 40, right: 40, bottom: 90, left: 60 };

const LineChart = ({ width, height, todos }) => {
  const { showTooltip, hideTooltip, tooltipData, tooltipTop = 0, tooltipLeft = 0 } = useTooltip();

  const data = useMemo(() => {
    if (!todos) return [];
    return attachCompletetdTasksToUsers(todos).map(({ id, value }) => ({ x: id, y: value }));
  }, [todos]);
  console.log('🚀 ~ file: LineChart.js ~ line 33 ~ data ~ data', data);

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(height - margin.top - margin.bottom, 0);

  // scales
  const xScale = useMemo(() => {
    return scaleTime({
      range: [0, xMax],
      domain: extent(data, getXdata),
      clamp: true,
      nice: true,
    });
  }, [xMax, data]);
  console.log('🚀 ~ file: LineChart.js ~ line 39 ~ xScale ~ xScale', extent(data, getXdata));

  const yScale = useMemo(() => {
    return scaleLinear({
      range: [yMax + margin.top, margin.top],
      domain: [min(data, getYdata) - 0.2 || 0, max(data, getYdata) || 0],
      nice: true,
      clamp: true,
    });
    //
  }, [yMax, data]);

  // tooltip handler
  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      const currX = x - margin.left;
      const x0 = xScale.invert(currX);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;

      // calculate the cursor position and convert where to position the tooltip box.
      if (d1 && getXdata(d1)) {
        d = x0.valueOf() - getXdata(d0).valueOf() > getXdata(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }

      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: yScale(getYdata(d)),
      });
    },
    [showTooltip, yScale, xScale, data]
  );

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <div style={{ position: 'relative', margin: '0 0 1rem' }}>
      <svg width={width} height={height}>
        <LineChartGroup
          data={data}
          width={width}
          margin={{ ...margin }}
          yMax={yMax}
          xMax={xMax}
          xScale={xScale}
          yScale={yScale}
          stroke="green"
          xTickFormat={(d) => {
            return numeral(d).format(d <= 100 ? '$0.00' : '$0,0');
          }}
        />
        {/* a transparent ele that track the pointer event, allow us to display tooltip */}
        <Bar
          x={margin.left}
          y={margin.top * 2}
          width={xMax + 5}
          height={yMax}
          fill="transparent"
          rx={14}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />
        {/* drawing the line and circle indicator to be display in cursor over a
              selected area */}
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: margin.top * 2 }}
              to={{ x: tooltipLeft, y: yMax + margin.top * 2 }}
              stroke="red"
              strokeWidth={2}
              opacity={0.5}
              pointerEvents="none"
              strokeDasharray="5,2"
            />

            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1 + margin.top}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + margin.top}
              r={5}
              fill="blue"
              stroke="white"
              strokeWidth={2}
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
      {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - 12}
            left={tooltipLeft}
            style={{
              ...defaultToopTipStyles,
              // eslint-disable-next-line no-inline-styles/no-inline-styles
              background: 'yellow',
              // eslint-disable-next-line no-inline-styles/no-inline-styles
              padding: '0.5rem',
              // eslint-disable-next-line no-inline-styles/no-inline-styles
              fontSize: '1.2rem',
              // eslint-disable-next-line no-inline-styles/no-inline-styles
              color: '#272727',
            }}
          >
            {/* // eslint-disable-next-line no-inline-styles/no-inline-styles */}
            <ul style={{ padding: '0', margin: '0', listStyle: 'none' }}>
              {/* // eslint-disable-next-line no-inline-styles/no-inline-styles */}
              <li style={{ paddingBottom: '0.25rem' }}>
                {/* // eslint-disable-next-line no-inline-styles/no-inline-styles */}
                {/* <b>{format(getXdata(tooltipData), 'PPpp')}</b> */}
              </li>
              <li>
                {tooltipData.x}: <b>{`${getFormatValue(tooltipData)}`}</b>
              </li>
            </ul>
          </TooltipWithBounds>
        </div>
      )}
    </div>
  );
};

export default LineChart;
