/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import CustomBarComponent from './BarComponent';
import { StyledWrapper } from './styled';

const attachCompletetdTasksToUsers = (todos) => {
  const parsedData = todos.reduce((acc, curr) => {
    const currentUserId = curr.userId;
    const { completed } = curr;

    const alreadyExists = Boolean(acc.find((user) => user.id === currentUserId));
    if (alreadyExists) {
      const currentValue = acc.find((el) => el.id === currentUserId)?.value || 0;
      const filteredAcc = acc.slice().filter((el) => el.id !== currentUserId);
      return [...filteredAcc, { id: currentUserId, value: completed ? currentValue + 1 : currentValue }];
    }

    return [...acc, { id: curr.userId, value: completed ? 1 : 0 }];
  }, []);

  return parsedData;
};
const BarChart = ({ todos }) => {
  const completedTasksByUsers = useMemo(() => {
    const x = attachCompletetdTasksToUsers(todos);
    return x;
  }, [todos]);
  console.log('🚀 ~ file: index.js ~ line 32 ~ completedTasksByUsers ~ completedTasksByUsers', completedTasksByUsers);

  return (
    <StyledWrapper>
      <ResponsiveBar
        data={completedTasksByUsers}
        keys={['value']}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        barComponent={CustomBarComponent}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: 12,
              color,
              background: '#222222',
            }}
          >
            <span>Look, custom :)</span>
            <br />
            <strong>
              {id}: {value}
            </strong>
          </div>
        )}
        // valueScale={{ type: 'linear' }}
        // indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        // layout="horizontal"
        // defs={[
        //   {
        //     id: 'dots',
        //     type: 'patternDots',
        //     background: 'inherit',
        //     color: '#38bcb2',
        //     size: 4,
        //     padding: 1,
        //     stagger: true,
        //   },
        //   {
        //     id: 'lines',
        //     type: 'patternLines',
        //     background: 'inherit',
        //     color: '#eed312',
        //     rotation: -45,
        //     lineWidth: 6,
        //     spacing: 10,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: 1,
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'sandwich',
        //     },
        //     id: 'lines',
        //   },
        // ]}
        // borderColor={{
        //   from: 'color',
        //   modifiers: [['darker', 1.6]],
        // }}
        // axisTop={null}
        // axisRight={null}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'country',
        //   legendPosition: 'middle',
        //   legendOffset: 32,
        // }}
        // axisLeft={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'food',
        //   legendPosition: 'middle',
        //   legendOffset: -40,
        // }}
        // labelSkipWidth={12}
        // labelSkipHeight={12}
        // labelTextColor={{
        //   from: 'color',
        //   modifiers: [['darker', 1.6]],
        // }}
        // legends={[
        //   {
        //     dataFrom: 'keys',
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) => {
          return `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`;
        }}
      />
    </StyledWrapper>
  );
};

BarChart.propTypes = {};

export default BarChart;
