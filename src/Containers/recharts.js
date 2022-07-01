import React from 'react';
import PieChart from '../components/recharts/PieChart';

import { useFetchData } from '../hooks/useFetchData';

const ReCharts = () => {
  const { loading, data } = useFetchData();

  return (
    <div>
      <a href="https://recharts.org/" target="_blank" rel="noreferrer noopener">
        <h1>ReCharts</h1>
      </a>
      {loading && <p>Loading..</p>}
      {/* {!loading && data && <LineChart todos={data} />}

      {!loading && data && <BarChart todos={data} />} */}
      {!loading && data && <PieChart todos={data} />}
    </div>
  );
};

export default ReCharts;
