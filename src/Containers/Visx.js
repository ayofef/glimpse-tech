import React from 'react';
import BarChart from '../components/visx/BarChart';

import { useFetchData } from '../hooks/useFetchData';

const Visx = () => {
  const { loading, data } = useFetchData();

  return (
    <div>
      <a href="https://airbnb.io/visx/bars" target="_blank" rel="noreferrer noopener">
        <h1>Visx</h1>
      </a>
      {loading && <p>Loading..</p>}
      {/* {!loading && data && <LineChart todos={data} />}*/}

      {!loading && data && <BarChart todos={data} />}
      {/* {!loading && data && <PieChart todos={data} />} */}
    </div>
  );
};

export default Visx;