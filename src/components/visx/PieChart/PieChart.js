import React, { useMemo } from 'react';
import { GradientPinkBlue } from '@visx/gradient';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { scaleOrdinal } from '@visx/scale';
import AnimatedPie from './Pie';

// color scales

// accessors
const getXValue = (d) => d.id;
const getYValue = (d) => Number(d.value);
const margin = { top: 40, right: 30, bottom: 50, left: 40 };
const PieChart = ({ todos, width, height }) => {
  const completedTodos = useMemo(() => todos?.filter((todo) => todo.completed) ?? [], [todos]);
  const notCompletedTodos = useMemo(() => todos?.filter((todo) => !todo.completed) ?? [], [todos]);
  const chartData = useMemo(
    () => [
      {
        id: 'completed',
        value: completedTodos.length,
      },
      {
        id: 'not-completed',
        value: notCompletedTodos.length,
      },
    ],
    [completedTodos.length, notCompletedTodos.length]
  );

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

  return (
    <svg width={width} height={height}>
      {/* <GradientPinkBlue id="visx-pie-gradient" />
      <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" /> */}
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={chartData}
          pieValue={getYValue}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={8}
          padAngle={0.02}
        >
          {(pie) => <AnimatedPie {...pie} getKey={getXValue} getColor={(arc) => getPieColor(arc.data.id)} />}
        </Pie>
      </Group>
    </svg>
  );
};

export default PieChart;
