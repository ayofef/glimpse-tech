/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState } from 'react';
import { BarRounded } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { ScaleSVG } from '@visx/responsive';
import { AxisBottom } from '@visx/axis';
import { useSpring, animated, config } from 'react-spring';
import { StyledWrapper } from './styled';
import { attachCompletetdTasksToUsers } from '../../nivo/constant';

const verticalMargin = 120;

// accessors
const getXValue = (d) => d.id;
const getYValue = (d) => Number(d.value);

const BarChart = ({ todos }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const completedTasksByUsers = useMemo(() => {
    const x = attachCompletetdTasksToUsers(todos);
    return x;
  }, [todos]);
  console.log('🚀 ~ file: index.js ~ line 14 ~ completedTasksByUsers ~ completedTasksByUsers', completedTasksByUsers);

  const xMax = 900;
  const yMax = 700 - verticalMargin;

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
  console.log('🚀 ~ file: index.js ~ line 41 ~ BarChart ~ xScale', xScale);
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...completedTasksByUsers.map(getYValue))],
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

  console.log('🚀 ~ file: index.js ~ line 56 ~ BarChart ~ { scale, ...rest }', {
    scale,
    hasAnimated: scale.hasAnimated,
  });
  const AnimatedBar = animated(BarRounded);
  return (
    <StyledWrapper>
      {/* For responsive */}
      <ScaleSVG width={900} height={700}>
        <GradientTealBlue id="teal" />
        {/* <rect width={900} height={700} fill="url(#teal)" rx={14} /> */}
        <Group top={verticalMargin / 2}>
          {completedTasksByUsers.map((d) => {
            // better implementation will be to copute these values and memorize instead of calculating during the loop
            const letter = getXValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getYValue(d)) ?? 0);
            const barX = xScale(letter);
            // const barY = yMax - barHeight;
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

                // onClick={() => {
                //   if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                // }}
              />
            );
          })}
        </Group>

        {animationCompleted && (
          <AxisBottom
            top={yMax + 60}
            scale={xScale}
            hideTicks
            hideZero
            numTicks={5}
            rangePadding={-38}
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
      </ScaleSVG>
    </StyledWrapper>
  );
};

BarChart.propTypes = {};

export default BarChart;
