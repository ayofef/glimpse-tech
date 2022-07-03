import React, { useMemo } from 'react';
import { GradientPinkBlue } from '@visx/gradient';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import PieGroup from './PieGroup';
// color scales

const PieChart = ({ todos, width, height }) => {
  const { showTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft, tooltipTop } = useTooltip();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
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
    <>
      <svg ref={containerRef} width={width} height={height}>
        {/* <GradientPinkBlue id="visx-pie-gradient" />
      <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" /> */}
        <PieGroup
          chartData={chartData}
          width={width}
          height={height}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          tooltipOpen={tooltipOpen}
          tooltipData={tooltipData}
        />
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal top={tooltipTop} left={tooltipLeft}>
          <div>
            <strong>{tooltipData.id}</strong>
          </div>
          <div>{tooltipData.value}℉</div>
        </TooltipInPortal>
      )}
    </>
  );
};

export default PieChart;
