import React, { useState } from 'react';
import { animated, to, useTransition } from 'react-spring';
import { localPoint } from '@visx/event';
import ActivePieShape from './ActivePieShape';

const fromLeaveTransition = ({ endAngle }) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});

const enterUpdateTransition = ({ startAngle, endAngle }) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

const Pie = ({ arcs, path, getColor, getKey, hideTooltip, showTooltip, left, top, innerRadius, outerRadius }) => {
  console.log(
    '🚀 ~ file: Pie.js ~ line 20 ~ Pie ~ { arcs, path, getColor, getKey, hideTooltip, showTooltip, left, top, innerRadius, outerRadius }',
    { arcs, path, getColor, getKey, hideTooltip, showTooltip, left, top, innerRadius, outerRadius }
  );
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const transitions = useTransition(arcs, {
    from: fromLeaveTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: fromLeaveTransition,
    keys: getKey,
    onRest: () => setShouldAnimate(false),
  });

  const handleMouseMove = (event, arc) => {
    console.log('🚀 ~ file: index.js ~ line 56 ~ BarChart ~ { scale, ...rest }', arc);
    // const left = barX + barWidth / 2;
    const eventSvgCoords = localPoint(event);
    showTooltip({
      tooltipData: arc.data,
      tooltipTop: eventSvgCoords?.y,
      tooltipLeft: eventSvgCoords?.x,
    });
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  if (!shouldAnimate) {
    return arcs.map((arc) => {
      return (
        <g key={arc.data.id} onMouseMove={(e) => handleMouseMove(e, arc)} onMouseLeave={handleMouseLeave}>
          <path d={path(arc)} fill={getColor(arc)} />
          {/* <ActivePieShape left={left} top={top} innerRadius={innerRadius} outerRadius={outerRadius} /> */}
        </g>
      );
    });
  }

  // workaround for animation to only run on mount
  return transitions((props, arc, { key }) => (
    <g key={key}>
      <animated.path
        // compute tod path d attribute from intermediate angle values
        d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
          path({
            ...arc,
            startAngle,
            endAngle,
          })
        )}
        fill={getColor(arc)}
        // onClick={() => onClickDatum(arc)}
        // onTouchStart={() => onClickDatum(arc)}
      />
    </g>
  ));
};

export default Pie;
