import React, { useCallback, memo } from 'react';
import { localPoint } from '@visx/event';
import { BarRounded } from '@visx/shape';
import { useSpring, animated, config } from 'react-spring';

const getXValue = (d) => d.id;
const getYValue = (d) => Number(d.value);

const Bar = memo(({ bar, xScale, yScale, yMax, showTooltip, hideTooltip }) => {
  const letter = getXValue(bar);
  const barWidth = xScale.bandwidth();
  const barHeight = yMax - (yScale(getYValue(bar)) ?? 0);
  const barX = xScale(letter);
  //   const barY = yMax - barHeight;

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: config.default,
    // onRest: () => {
    //   setAnimationCompleted(true);
    // },
  });

  // console.log('🚀 ~ file: index.js ~ line 56 ~ BarChart ~ { scale, ...rest }', {
  //   scale,
  //   hasAnimated: scale.hasAnimated,
  // });
  const AnimatedBar = animated(BarRounded);

  const handleMouseOver = useCallback(
    (event) => {
      const left = barX + barWidth / 2;
      const eventSvgCoords = localPoint(event);
      showTooltip({
        tooltipData: bar,
        tooltipTop: eventSvgCoords?.y,
        tooltipLeft: left,
      });
    },
    [showTooltip, bar, barWidth, barX]
  );

  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

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
      onMouseMove={handleMouseOver}
      onMouseLeave={handleMouseLeave}

      // onClick={() => {
      //   if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
      // }}
    />
  );
});

export default Bar;
