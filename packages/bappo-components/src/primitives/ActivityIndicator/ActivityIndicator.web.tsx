import { VisibilityProperty } from 'csstype';
import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { DivViewBase } from '../../internals/web/ViewBase';
import { ActivityIndicatorProps } from './types';

const sizeMap = {
  small: 20,
  large: 36,
};

type Props = ActivityIndicatorProps & {
  className?: string;
};

export default function ActivityIndicator({
  animating = true,
  color = '#999',
  size = 'small',
  style,
  className,
  testID,
}: Props) {
  const containerStyleProps = {
    className,
    style,
  };
  const spinnerContainerStyleProps = {
    $size: sizeMap[size],
  };
  const spinnerStyleProps = {
    $color: color,
  };

  const containerStyle: { visibility?: VisibilityProperty } = {};
  if (!animating) containerStyle.visibility = 'hidden';

  return (
    <Container {...containerStyleProps} style={containerStyle} testID={testID}>
      <SpinnerContainer {...spinnerContainerStyleProps}>
        <Svg height="100%" viewBox="25 25 50 50" width="100%">
          <Circle
            {...spinnerStyleProps}
            cx={50}
            cy={50}
            fill="none"
            r={20}
            strokeMiterlimit={10}
            strokeWidth={4}
          />
        </Svg>
      </SpinnerContainer>
    </Container>
  );
}

const Container = styled(DivViewBase)`
  align-items: center;
  justify-content: center;
`;

const SpinnerContainer = styled(DivViewBase)<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const spinRule = css`
  ${spin} 2s infinite linear;
`;
const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const Svg = styled.svg`
  animation: ${spinRule};
`;

const Circle = styled.circle<{ $color: string }>`
  animation: ${dash} 1.5s infinite ease-in-out;
  stroke: ${({ $color }) => $color};
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  transform-origin: center;
`;
