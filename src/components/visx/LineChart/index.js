import ParentSize from '@visx/responsive/lib/components/ParentSize';
import LineChart from './LineChart';

const ResponsiveLineChart = ({ todos }) => (
  <ParentSize parentSizeStyles={{ height: '400px' }}>
    {({ width, height }) => <LineChart width={width} height={height} todos={todos} />}
  </ParentSize>
);

export default ResponsiveLineChart;
