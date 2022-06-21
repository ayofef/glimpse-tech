import React, { useMemo } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { StyledWrapper } from './styled';

const PieChart = ({ todos }) => {
  const completedTodos = useMemo(() => todos?.filter((todo) => todo.completed) ?? [], [todos]);
  const notCompletedTodos = useMemo(() => todos?.filter((todo) => !todo.completed) ?? [], [todos]);

  //   const [chartData, setChartData] = useState([]);
  //   useEffect(() => {
  //     let animation = setTimeout(() => setChartData(data), 1);

  //     return () => {
  //       clearTimeout(animation);
  //     };
  //   }, [data]);

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
    <StyledWrapper>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        animate={true}
        motionConfig="wobbly"
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'completed',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'not-completed',
            },
            id: 'dots',
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </StyledWrapper>
  );
};

PieChart.propTypes = {};

export default PieChart;
