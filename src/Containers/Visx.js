import React from 'react';
import BarChart from '../components/visx/BarChart';
import PieChart from '../components/visx/PieChart';

import { useFetchData } from '../hooks/useFetchData';

const Visx = () => {
  const { loading, data } = useFetchData();

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <div style={{ padding: '0 12px', height: '400px' }}>
      <a href="https://airbnb.io/visx/bars" target="_blank" rel="noreferrer noopener">
        <h1>Visx</h1>
      </a>
      {loading && <p>Loading..</p>}
      {/* {!loading && data && <LineChart todos={data} />}*/}
      {!loading && data && <PieChart todos={data} />}

      {!loading && data && <BarChart todos={data} />}
    </div>
  );
};

export default Visx;
