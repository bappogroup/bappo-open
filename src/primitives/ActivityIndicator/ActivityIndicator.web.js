// @flow

import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import ViewBase from '../../internals/web/ViewBase';

type Props = {
  /**
   * Whether to show the indicator (true, the default) or hide it (false).
   */
  animating: boolean,
  className?: string,
  /**
   * The foreground color of the spinner (default is gray).
   */
  color: string,
  /**
   * Size of the indicator (default is 'small').
   */
  size: 'small' | 'large',
  // TODO
  style?: any,
};

const sizeMap = {
  small: 20,
  large: 36,
};

class ActivityIndicator extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    animating: true,
    color: '#999',
    size: 'small',
  };

  static displayName = 'ActivityIndicator';

  render() {
    const { animating, className, color, size, style } = this.props;

    const containerStyleProps = {
      className,
      hide: !animating,
      style,
    };
    const spinnerContainerStyleProps = {
      size: sizeMap[size],
    };
    const spinnerStyleProps = {
      color,
    };

    return (
      <Container {...containerStyleProps}>
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
}

export default ActivityIndicator;

const Container = styled(ViewBase)`
  align-items: center;
  justify-content: center;
  ${({ hide }) => hide && 'visibility: hidden;'};
`;

const SpinnerContainer = styled(ViewBase)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
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
  animation: ${spin} 2s infinite linear;
`;

const Circle = styled.circle`
  animation: ${dash} 1.5s infinite ease-in-out;
  stroke: ${props => props.color};
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  transform-origin: center;
`;
