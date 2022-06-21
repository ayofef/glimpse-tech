import React from 'react';

const Tooltip = ({ data }) => {
  return (
    <div>
      <p>{data.id}</p>
      <p>{data.formattedValue}</p>
    </div>
  );
};

export default Tooltip;
