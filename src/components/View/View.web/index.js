// @flow

/* eslint-disable react/prefer-stateless-function */

import * as React from 'react';
import styled from 'styled-components';
import ViewBase from './ViewBase';

type Props = {
  children?: React.Node,
  className?: string,
  /**
   * Controls whether the View can be the target of touch events.
   *
   * - 'auto': The View can be the target of touch events.
   * - 'none': The View is never the target of touch events.
   * - 'box-none': The View is never the target of touch events but it's subviews can be.
   * - 'box-only': The view can be the target of touch events but it's subviews cannot be.
   */
  pointerEvents: 'auto' | 'none' | 'box-none' | 'box-only',
  // TODO
  style?: any,
};

class View extends React.Component<Props> {
  props: Props;

  static displayName = 'View';

  render() {
    const {
      children,
      className,
      pointerEvents,
      style,
    } = this.props;

    const styleProps = {
      className,
      pointerEvents,
      style,
    };

    return (
      <StyledViewBase
        {...styleProps}
      >
        {children}
      </StyledViewBase>
    );
  }
}

export default View;

const pointerEventsAuto = `
  pointer-events: auto;
`;

const pointerEventsBoxNone = `
  pointer-events: none;
  * {
    pointer-events: all;
  }
`;

const pointerEventsBoxOnly = `
  pointer-events: all;
  * {
    pointer-events: none;
  }
`;

const pointerEventsNone = `
  pointer-events: none;
  * {
    pointer-events: none;
  }
`;

const StyledViewBase = styled(ViewBase)`
  ${({ pointerEvents }) => {
    if (pointerEvents === 'auto') {
      return pointerEventsAuto;
    } else if (pointerEvents === 'none') {
      return pointerEventsNone;
    } else if (pointerEvents === 'box-none') {
      return pointerEventsBoxNone;
    } else if (pointerEvents === 'box-only') {
      return pointerEventsBoxOnly;
    }
    return '';
  }}
`;
