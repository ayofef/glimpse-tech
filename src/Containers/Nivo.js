import React from 'react';
import PieChart from '../components/nivo/PieChart';
import BarChart from '../components/nivo/BarChart';

import { useFetchData } from '../hooks/useFetchData';

/**
 *
 * Bar chart has a bug
 * Does not animate on mount
 *
 * Performance is great
 * Customization is great
 * Documentation is great
 * Modularity is great
 * Has loads of chart components
 */

const Nivo = () => {
  const { loading, data } = useFetchData();

  return (
    <div>
      <a href="https://nivo.rocks/" target="_blank" rel="noreferrer noopener">
        <h1>Nivo</h1>
      </a>

      {loading && <p>Loading..</p>}
      {!loading && data && <BarChart todos={data} />}
      {!loading && data && <PieChart todos={data} />}
    </div>
  );
};

export default Nivo;
