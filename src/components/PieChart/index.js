import React, { useMemo } from 'react';
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { TODO_PROP_TYPES } from '../../constants/todos-prop-types';

Chart.register(ArcElement);
const PieChart = ({ todos }) => {
  const completedTodos = useMemo(() => todos.filter((todo) => todo.completed), [todos]);
  const notCompletedTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);

  const chartData = useMemo(
    () => ({
      labels: ['Completed', 'Not Completed'],
      datasets: [
        {
          label: 'Completed Task vs Uncompleted Task',
          data: [completedTodos.length, notCompletedTodos.length],
          backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        },
      ],
    }),
    [completedTodos.length, notCompletedTodos.length]
  );

  return <ChartComponent type="doughnut" data={chartData} />;
};

PieChart.propTypes = {
  todos: TODO_PROP_TYPES.isRequired,
};

export default PieChart;
