import React, { useMemo } from 'react';
import { scaleLinear, scaleTime } from '@visx/scale';
import { max, min, extent } from 'd3-array';
import { Brush } from '@visx/brush';
import { LinearGradient } from '@visx/gradient';
import { useLineChartStore, setFilteredDataBinder, filteredDataBinder } from './useLineChartStore';
import LineChartGroup from './LineChartGroup';
import BrushHandle from './BrushHandle';

const margin = { top: 0, right: 40, bottom: 90, left: 0 };
// accessors
const getXdata = (d) => d.x;
const getYdata = (d) => d.y;

const SecondaryChart = ({ data, width, height, fill, stroke }) => {
  console.log('🚀 ~ file: SecondaryChart.js ~ line 17 ~ SecondaryChart ~ width', width);
  const setFilteredData = useLineChartStore(setFilteredDataBinder);
  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(height - margin.top - margin.bottom, 0);

  const brushRef = React.useRef(null);

  // scales
  const xScale = useMemo(() => {
    return scaleLinear({
      range: [0, xMax],
      domain: extent(data, getXdata),
    });
  }, [xMax, data]);

  const yScale = useMemo(() => {
    return scaleLinear({
      range: [yMax + margin.top, margin.top],
      domain: [min(data, getYdata) - 0.2 || 0, max(data, getYdata) + 2 || 0],
      nice: true,
    });
    //
  }, [yMax, data]);

  const initialBrushPosition = React.useMemo(
    () => ({
      start: { x: xScale(getXdata(data[0])) },
      end: { x: xScale(getXdata(data[5])) },
    }),
    [xScale, data]
  );
  console.log('🚀 ~ file: SecondaryChart.js ~ line 50 ~ SecondaryChart ~ initialBrushPosition', initialBrushPosition);

  const onBrushChange = (domain) => {
    if (!domain) return;
    const { x0, x1, y0, y1 } = domain;
    const filteredData = data.filter((s) => {
      const x = getXdata(s);
      const y = getYdata(s);
      return x > x0 && x < x1 && y > y0 && y < y1;
    });

    setFilteredData(filteredData);
  };

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <LineChartGroup
          hideLeftAxis
          data={data}
          width={width}
          margin={{ ...margin }}
          yMax={yMax}
          xMax={xMax}
          xScale={xScale}
          yScale={yScale}
          stroke={stroke}
          fill={fill}
          // xTickFormat={(d) => {
          //   return numeral(d).format(d <= 100 ? '$0.00' : '$0,0');
          // }}
        />
        {/* a transparent ele that track the pointer event, allow us to display tooltip */}

        <LinearGradient id="brush-gradient" from="red" fromOpacity={0.3} to="blue" toOpacity={0.3} />
        {initialBrushPosition.end.x && (
          <Brush
            innerRef={brushRef}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            margin={margin}
            handleSize={8}
            resizeTriggerAreas={['left', 'right']}
            brushDirection="horizontal"
            initialBrushPosition={initialBrushPosition}
            onChange={onBrushChange}
            onClick={() => {
              setFilteredData(data);
            }}
            useWindowMoveEvents
            selectedBoxStyle={{
              fill: `url(#brush-gradient)`,
              stroke: 'red',
            }}
            renderBrushHandle={(props) => <BrushHandle {...props} />}
          />
        )}
      </svg>
    </div>
  );
};

export default SecondaryChart;
