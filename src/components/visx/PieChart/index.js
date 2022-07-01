import ParentSize from '@visx/responsive/lib/components/ParentSize';
import PieChart from './PieChart';

const ResponsivePieChart = ({ todos }) => (
  <ParentSize parentSizeStyles={{ height: '400px' }}>
    {({ width, height }) => <PieChart width={width} height={height} todos={todos} />}
  </ParentSize>
);

export default ResponsivePieChart;
