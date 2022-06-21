import React, { useCallback } from 'react';
import { useTooltip } from '@nivo/tooltip';
import Tooltip from './Tooltip';

import { StyledRect } from './styled';

const BarComponent = ({ bar }) => {
  const { showTooltipFromEvent, hideTooltip } = useTooltip();

  const handleTooltip = useCallback(
    (event) => showTooltipFromEvent(<Tooltip data={bar.data} />, event),
    [showTooltipFromEvent, bar.data]
  );
  const handleMouseEnter = useCallback(
    (event) => {
      showTooltipFromEvent(<Tooltip data={bar.data} />, event);
    },
    [showTooltipFromEvent, bar.data]
  );
  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  return (
    <StyledRect
      x={bar.x}
      y={bar.y}
      width={bar.width}
      height={bar.height}
      stroke={3}
      rx="2"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleTooltip}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default BarComponent;
