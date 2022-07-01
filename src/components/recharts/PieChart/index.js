import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { StyledCustomToolTip } from './styled';

const COLORS = ['#638475', '#90E39A', '#DDF093', '#F6D0B1', '#DBD3AD', '#E0607E', '#D36060', '#C2714F', '#F6C5AF'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0];
    return (
      <StyledCustomToolTip>
        {dataObj.payload.id} - {dataObj.payload.value}
      </StyledCustomToolTip>
    );
  }

  return null;
};

const PieChartComponent = ({ todos }) => {
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

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={730} height={250}>
          <Pie
            dataKey="value"
            data={chartData}
            fill="#8884d8"
            innerRadius="55%"
            cx="50%"
            cy="50%"
            paddingAngle={1}
            // grid
            animationDuration={3000}
          >
            {chartData.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={`cell-${index}`} fill={COLORS[index]} r={5} ry={5} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
