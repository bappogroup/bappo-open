// @flow

/* eslint-disable react/prefer-stateless-function */

import * as React from 'react';
import styled from 'styled-components';
import 'react-native-web/dist/modules/injectResponderEventPlugin';

type Props = {
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  onKeyDown?: () => void,
  onKeyUp?: () => void,
  onResponderGrant?: () => void,
  onResponderMove?: () => void,
  onResponderRelease?: () => void,
  onResponderTerminate?: () => void,
  onResponderTerminationRequest?: () => boolean,
  onStartShouldSetResponder?: () => boolean,
  role?: string,
  style?: any,
  tabIndex?: number,
};

class ViewBase extends React.Component<Props> {
  props: Props;

  render() {
    const {
      children,
      className,
      disabled,
      onKeyDown,
      onKeyUp,
      onResponderGrant,
      onResponderMove,
      onResponderRelease,
      onResponderTerminate,
      onResponderTerminationRequest,
      onStartShouldSetResponder,
      role,
      style,
      tabIndex,
    } = this.props;

    const props = {
      className,
      disabled,
      onKeyDown,
      onKeyUp,
      onResponderGrant,
      onResponderMove,
      onResponderRelease,
      onResponderTerminate,
      onResponderTerminationRequest,
      onStartShouldSetResponder,
      role,
      style,
      tabIndex,
    };

    return (
      <Div
        {...props}
      >
        {children}
      </Div>
    );
  }
}

export default ViewBase;

// Manually pass on responder event handlers since styled-components filters them out
const Div = styled.div.attrs({
  onResponderGrant: props => props.onResponderGrant,
  onResponderMove: props => props.onResponderMove,
  onResponderRelease: props => props.onResponderRelease,
  onResponderTerminate: props => props.onResponderTerminate,
  onResponderTerminationRequest: props => props.onResponderTerminationRequest,
  onStartShouldSetResponder: props => props.onStartShouldSetResponder,
})`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  min-height: 0;
  min-width: 0;
`;
