import ParentSize from '@visx/responsive/lib/components/ParentSize';
import BarChart from './BarChart';

const ResponsiveBarChart = ({ todos }) => (
  <ParentSize parentSizeStyles={{ height: '400px' }}>
    {({ width, height }) => <BarChart width={width} height={height} todos={todos} />}
  </ParentSize>
);
export default ResponsiveBarChart;
