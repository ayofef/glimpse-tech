import React, { useState } from 'react';
import { LinePath, AreaClosed } from '@visx/shape';
import { curveCardinal } from '@visx/curve';
import { useSpring, animated, config } from 'react-spring';
import { LinearGradient } from '@visx/gradient';

const LinePaths = ({ data, x, stroke, y, xMax, yScale, fill }) => {
  const [length, setLength] = useState(null);
  //   console.log('🚀 ~ file: LinePath.js ~ line 7 ~ LinePaths ~ length', length);
  const { strokeDasharray } = useSpring({
    // we do *not* animating this property, we just set it up
    from: {
      strokeDasharray: length,
    },
    to: {
      strokeDasharray: 0,
    },
    config: config.molasses,
  });
  //   console.log(
  //     '🚀 ~ file: LinePath.js ~ line 19 ~ LinePaths ~ strokeDasharray, strokeDashoffset',
  //     strokeDasharray,
  //     strokeDashoffset
  //   );
  const AnimatedPath = animated(LinePath);
  return (
    <AnimatedPath
      data={data}
      x={x}
      y={y}
      yScale={yScale}
      strokeWidth={2}
      stroke={stroke}
      //   strokeDashoffset={strokeDashoffset}
      //   strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDasharray}
      strokeDasharray={length}
      innerRef={(ref) => {
        // The ref is `null` on component unmount
        if (ref) {
          setLength(ref.getTotalLength());
        }
      }}
      curve={curveCardinal}
      shapeRendering="geometricPrecision"
    />
  );
};

export default LinePaths;
