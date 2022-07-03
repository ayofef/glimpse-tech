/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { attachCompletetdTasksToUsers } from '../../nivo/constant';
import Bar from './Bar';
import Axis from './Axis';

// accessors
const getXValue = (d) => d.id;
const getYValue = (d) => Number(d.value);
const margin = { top: 40, right: 30, bottom: 50, left: 40 };

const BarChart = ({ todos, width, height }) => {
  // const [animationCompleted, setAnimationCompleted] = useState(false);
  const { showTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft, tooltipTop } = useTooltip();
  // console.log(
  //   '🚀 ~ file: index.js ~ line 31 ~ BarChart ~ { showTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft, tooltipTop }',
  //   { showTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft, tooltipTop }
  // );

  const completedTasksByUsers = useMemo(() => {
    const x = attachCompletetdTasksToUsers(todos);
    return x;
  }, [todos]);
  // console.log('🚀 ~ file: index.js ~ line 14 ~ completedTasksByUsers ~ completedTasksByUsers', completedTasksByUsers);
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: completedTasksByUsers.map(getXValue),
        padding: 0.1,
      }),
    [xMax, completedTasksByUsers]
  );
  // console.log('🚀 ~ file: index.js ~ line 41 ~ BarChart ~ xScale', xScale);
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...completedTasksByUsers.map(getYValue)) + 3],
      }),
    [yMax, completedTasksByUsers]
  );

  return (
    <>
      {/* For responsive we use ParentSize */}
      <svg ref={containerRef} width={width} height={height}>
        {/* Further optimisation will be to memorize GradientTealBlue, and Group  */}
        <GradientTealBlue id="teal" />
        {/* <rect width={width} height={height} fill="url(#teal)" rx={14} /> */}
        <Group left={margin.left} top={margin.top}>
          {completedTasksByUsers.map((d) => {
            // better implementation will be to copute these values and memorize instead of calculating during the loop

            return (
              <Bar
                key={`bar-${d.id}`}
                bar={d}
                xScale={xScale}
                yScale={yScale}
                yMax={yMax}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
              />
            );
          })}

          <Axis scale={xScale} type="bottom" top={yMax} />

          <Axis scale={yScale} type="left" tickLabelDy="0.2em" tickLabelTextAnchor="end" />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal top={tooltipTop} left={tooltipLeft}>
          <div>
            <strong>{tooltipData.id}</strong>
          </div>
          <div>{tooltipData.value}℉</div>
        </TooltipInPortal>
      )}
    </>
  );
};

BarChart.propTypes = {};

export default BarChart;
