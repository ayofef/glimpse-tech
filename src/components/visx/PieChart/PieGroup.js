import React, { useMemo, memo } from 'react';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { Text } from '@visx/text';
import AnimatedPie from './Pie';

// accessors

const getXValue = (d) => d.id;
const getYValue = (d) => Number(d.value);
const margin = { top: 40, right: 30, bottom: 50, left: 40 };

const PieGroup = memo(({ chartData, width, height, hideTooltip, showTooltip, tooltipOpen, tooltipData }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  const getPieColor = useMemo(
    () =>
      scaleOrdinal({
        domain: chartData.map(getXValue),
        range: ['#638475', '#90E39A', '#DDF093', '#F6D0B1', '#DBD3AD', '#E0607E', '#D36060', '#C2714F', '#F6C5AF'],
      }),
    [chartData]
  );
  //   const innerRadius = ({ data }) => {
  //     const size = tooltipOpen && tooltipData.id === data.id ? donutThickness + 5 : donutThickness;
  //     return radius - size;
  //   };

  return (
    <Group top={centerY + margin.top} left={centerX + margin.left}>
      <Pie
        data={chartData}
        pieValue={getYValue}
        outerRadius={radius}
        innerRadius={radius - donutThickness}
        // innerRadius={innerRadius}
        cornerRadius={8}
        padAngle={0.02}
      >
        {(pie) => (
          <AnimatedPie
            // key={pie.pie.data.id}
            {...pie}
            getKey={getXValue}
            getColor={(arc) => getPieColor(arc.data.id)}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        )}
      </Pie>

      {tooltipOpen && tooltipData ? (
        <>
          <Text textAnchor="middle" fill="#000" fontSize={40} dy={-20}>
            {`${Math.floor(tooltipData.value)}`}
          </Text>

          <Text textAnchor="middle" fill="#000" fontSize={20} dy={22}>
            {tooltipData.id}
          </Text>
        </>
      ) : (
        <>
          <Text textAnchor="middle" fill="#000" fontSize={40} dy={-40}>
            Tasks
          </Text>

          <Text textAnchor="middle" fill="#000" fontSize={20} dy={0}>
            Completed
          </Text>
          <Text textAnchor="middle" fill="#000" fontSize={20} dy={32}>
            vs
          </Text>
          <Text textAnchor="middle" fill="#000" fontSize={20} dy={62}>
            Not-completed
          </Text>
        </>
      )}
    </Group>
  );
});

export default PieGroup;
