import React from 'react';
import PieChart from '../components/recharts/PieChart';

import { useFetchData } from '../hooks/useFetchData';

/**
 *
 * Bar chart has a bug -  workaround barComponent - works fine - we have control so customization is at it's peak
 * Does not animate on mount -  workaround barComponent resolves this, since we have control
 *
 * Performance is great
 * Customization is great
 * Documentation is great
 * Modularity is great
 * Has loads of chart components
 */

const ReCharts = () => {
  const { loading, data } = useFetchData();

  return (
    <div>
      <a href="https://recharts.ord/" target="_blank" rel="noreferrer noopener">
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
