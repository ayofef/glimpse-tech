import React, { useMemo } from 'react';
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

import { TODO_PROP_TYPES } from '../../constants/todos-prop-types';

Chart.register(BarElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(Tooltip);

const attachCompletetdTasksToUsers = (todos) => {
  const parsedData = todos.reduce((acc, curr) => {
    const currentUserId = curr.userId;
    const { completed } = curr;

    if (acc[currentUserId]) {
      const currentValue = acc[currentUserId];
      return { ...acc, [currentUserId]: completed ? currentValue + 1 : currentValue };
    }

    return { ...acc, [curr.userId]: completed ? 1 : 0 };
  }, {});

  return parsedData;
};
const BarChart = ({ todos }) => {
  const completedTasksByUsers = useMemo(() => {
    return attachCompletetdTasksToUsers(todos);
  }, [todos]);

  const chartData = useMemo(
    () => ({
      labels: Object.keys(completedTasksByUsers),
      datasets: [
        {
          label: 'Completed Tasks By Users',
          data: Object.values(completedTasksByUsers),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
        },
      ],
    }),
    [completedTasksByUsers]
  );

  return (
    <ChartComponent
      type="bar"
      data={chartData}
      //   options={{
      //     scales: {
      //       y: {
      //         beginAtZero: true,
      //       },
      //     },
      //   }}
    />
  );
};

BarChart.propTypes = {
  todos: TODO_PROP_TYPES.isRequired,
};

export default BarChart;
