import styled, { css, keyframes } from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 600px;
`;

const BAR_MOUNT_FRAME = ({ height, y }) => keyframes`
  from {
    height: 0;
    y: 400px;
  } to {
    height: ${height};
    y: ${y}
  }
`;
const BAR_MOUNT_FRAME_CSS = css`
  animation: ${({ height, y }) =>
    css`
      ${BAR_MOUNT_FRAME({ height, y })} 1s cubic-bezier(0.12, 0.36, 0.14, 1.2)
    `};
  animation-fill-mode: backwards;
`;
export const StyledRect = styled.rect`
  fill: red;
  transition: fill 0.3s cubic-bezier(0.12, 0.36, 0.14, 1.2);
  transform-origin: bottom;

  ${BAR_MOUNT_FRAME_CSS};

  &:hover {
    fill: #e6e9ec;
  }
`;
