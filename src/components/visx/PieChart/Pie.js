import React from 'react';
import { animated, to, useTransition } from 'react-spring';

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

const Pie = ({ arcs, path, getColor, getKey, onClickDatum }) => {
  const transitions = useTransition(arcs, {
    from: fromLeaveTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: fromLeaveTransition,
    keys: getKey,
  });

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
        onClick={() => onClickDatum(arc)}
        onTouchStart={() => onClickDatum(arc)}
      />
    </g>
  ));
};

export default Pie;
