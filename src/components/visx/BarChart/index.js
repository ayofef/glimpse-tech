/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState } from 'react';
import { BarRounded } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useTooltip, Tooltip, useTooltipInPortal } from '@visx/tooltip';
import { ScaleSVG } from '@visx/responsive';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useSpring, animated, config } from 'react-spring';
import { localPoint } from '@visx/event';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { StyledWrapper } from './styled';
import { attachCompletetdTasksToUsers } from '../../nivo/constant';

const verticalMargin = 120;

// accessors
const getXValue = (d) => d.id;
const getYValue = (d) => Number(d.value);
const margin = { top: 40, right: 30, bottom: 50, left: 40 };

const BarChart = ({ todos, width, height }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
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
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
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

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: config.default,
    onRest: () => {
      setAnimationCompleted(true);
    },
  });

  // console.log('🚀 ~ file: index.js ~ line 56 ~ BarChart ~ { scale, ...rest }', {
  //   scale,
  //   hasAnimated: scale.hasAnimated,
  // });
  const AnimatedBar = animated(BarRounded);

  return (
    <>
      {/* For responsive */}
      <svg ref={containerRef} width={width} height={height}>
        <GradientTealBlue id="teal" />
        {/* <rect width={width} height={height} fill="url(#teal)" rx={14} /> */}
        <Group left={margin.left} top={margin.top}>
          {completedTasksByUsers.map((d) => {
            // better implementation will be to copute these values and memorize instead of calculating during the loop
            const letter = getXValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getYValue(d)) ?? 0);
            const barX = xScale(letter);
            const barY = yMax - barHeight;
            return (
              <AnimatedBar
                key={`bar-${letter}`}
                x={barX}
                // y={barY}
                y={scale.to((s) => yMax - s * barHeight)}
                width={barWidth}
                height={barHeight}
                fill="url(#teal)"
                radius={Math.min(barWidth, barHeight) / 2}
                top
                onMouseMove={(event) => {
                  const left = barX + barWidth / 2;
                  const eventSvgCoords = localPoint(event);
                  showTooltip({
                    tooltipData: d,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: left,
                  });
                }}
                onMouseLeave={() => hideTooltip()}

                // onClick={() => {
                //   if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                // }}
              />
            );
          })}
          {animationCompleted && (
            <AxisBottom
              top={yMax}
              scale={xScale}
              hideTicks
              hideZero
              // numTicks={5}
              // rangePadding={-38}
              // tickFormat={formatDate}
              stroke="red"
              // tickStroke={"purple3"}
              tickLabelProps={() => ({
                fill: 'url(#teal)',
                fontSize: 16,
                textAnchor: 'middle',
              })}
            />
          )}

          {animationCompleted && (
            <AxisLeft
              scale={yScale}
              hideTicks
              // hideZero
              // numTicks={5}
              // rangePadding={-38}
              // tickFormat={formatDate}
              stroke="red"
              // tickStroke={"purple3"}
              tickLabelProps={() => ({
                fill: 'url(#teal)',
                fontSize: 16,
                textAnchor: 'end',
                transform: 'translateY(2px)',
                // x: 0
                dy: '0.2em',
              })}
            />
          )}
        </Group>
      </svg>

      {tooltipOpen && (
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

const BarChantWIthParent = ({ todos }) => (
  <ParentSize parentSizeStyles={{ height: '400px' }}>
    {({ width, height }) => <BarChart width={width} height={height} todos={todos} />}
  </ParentSize>
);

export default BarChantWIthParent;
