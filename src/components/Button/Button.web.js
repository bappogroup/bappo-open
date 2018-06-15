// @flow

import * as React from 'react';
import TouchEventUtils from 'fbjs/lib/TouchEventUtils';
import UIManager from 'react-native-web/dist/exports/UIManager';
import styled from 'styled-components';
import ViewBase from '../View/View.web/ViewBase';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
  className?: string,
  /**
   * Delay in ms, from onPressIn, before onLongPress is called. Default is 500ms.
   */
  delayLongPress?: number,
  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean,
  onLongPress?: () => void,
  onPress?: () => void,
  onPressIn?: () => void,
  onPressOut?: () => void,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

/**
 * Touchable states.
 */
const States = {
  NOT_RESPONDER: 'NOT_RESPONDER', // Not the responder
  RESPONDER_ACTIVE_PRESS_IN: 'RESPONDER_ACTIVE_PRESS_IN', // Responder, active, in the `PressRect`
  RESPONDER_ACTIVE_PRESS_OUT: 'RESPONDER_ACTIVE_PRESS_OUT', // Responder, active, out of `PressRect`
  RESPONDER_ACTIVE_LONG_PRESS_IN: 'RESPONDER_ACTIVE_LONG_PRESS_IN', // Responder, active, in the `PressRect`, after long press threshold
  RESPONDER_ACTIVE_LONG_PRESS_OUT: 'RESPONDER_ACTIVE_LONG_PRESS_OUT', // Responder, active, out of `PressRect`, after long press threshold
  KEYBOARD_ACTIVE_PRESS_IN: 'KEYBOARD_ACTIVE_PRESS_IN',
  KEYBOARD_ACTIVE_LONG_PRESS_IN: 'KEYBOARD_ACTIVE_LONG_PRESS_IN',
  ERROR: 'ERROR',
};
type ButtonState = $Values<typeof States>;

/**
 * Quick lookup map for states that are considered to be "active"
 */
const IsResponderActive: Object = {
  [States.RESPONDER_ACTIVE_PRESS_IN]: true,
  [States.RESPONDER_ACTIVE_PRESS_OUT]: true,
  [States.RESPONDER_ACTIVE_LONG_PRESS_IN]: true,
  [States.RESPONDER_ACTIVE_LONG_PRESS_OUT]: true,
};

const IsKeyboardActive: Object = {
  [States.KEYBOARD_ACTIVE_PRESS_IN]: true,
  [States.KEYBOARD_ACTIVE_LONG_PRESS_IN]: true,
};

/**
 * Quick lookup for states that are considered to be "pressing" and are
 * therefore eligible to result in a "selection" if the press stops.
 */
const IsResponderPressingIn: Object = {
  [States.RESPONDER_ACTIVE_PRESS_IN]: true,
  [States.RESPONDER_ACTIVE_LONG_PRESS_IN]: true,
};

const IsKeyboardPressingIn: Object = {
  [States.KEYBOARD_ACTIVE_PRESS_IN]: true,
  [States.KEYBOARD_ACTIVE_LONG_PRESS_IN]: true,
};

const IsPressingIn: Object = {
  ...IsResponderPressingIn,
  ...IsKeyboardPressingIn,
};

const IsLongPressingIn: Object = {
  [States.RESPONDER_ACTIVE_LONG_PRESS_IN]: true,
  [States.KEYBOARD_ACTIVE_LONG_PRESS_IN]: true,
};

/**
 * Inputs to the state machine.
 */
const Signals = {
  RESPONDER_GRANT: 'RESPONDER_GRANT',
  RESPONDER_RELEASE: 'RESPONDER_RELEASE',
  RESPONDER_TERMINATED: 'RESPONDER_TERMINATED',
  ENTER_PRESS_RECT: 'ENTER_PRESS_RECT',
  LEAVE_PRESS_RECT: 'LEAVE_PRESS_RECT',
  LONG_PRESS_DETECTED: 'LONG_PRESS_DETECTED',
  KEYBOARD_PRESS: 'KEYBOARD_PRESS',
  KEYBOARD_RELEASE: 'KEYBOARD_RELEASE',
};
type Signal = $Values<typeof Signals>;

/**
 * Mapping from States x Signals => States
 */
const Transitions: Object = {
  [States.NOT_RESPONDER]: {
    [Signals.RESPONDER_GRANT]: States.RESPONDER_ACTIVE_PRESS_IN,
    [Signals.RESPONDER_RELEASE]: States.ERROR,
    [Signals.RESPONDER_TERMINATED]: States.ERROR,
    [Signals.ENTER_PRESS_RECT]: States.ERROR,
    [Signals.LEAVE_PRESS_RECT]: States.ERROR,
    [Signals.LONG_PRESS_DETECTED]: States.ERROR,
    [Signals.KEYBOARD_PRESS]: States.KEYBOARD_ACTIVE_PRESS_IN,
    [Signals.KEYBOARD_RELEASE]: States.ERROR,
  },
  [States.RESPONDER_ACTIVE_PRESS_IN]: {
    [Signals.RESPONDER_GRANT]: States.ERROR,
    [Signals.RESPONDER_RELEASE]: States.NOT_RESPONDER,
    [Signals.RESPONDER_TERMINATED]: States.NOT_RESPONDER,
    [Signals.ENTER_PRESS_RECT]: States.RESPONDER_ACTIVE_PRESS_IN,
    [Signals.LEAVE_PRESS_RECT]: States.RESPONDER_ACTIVE_PRESS_OUT,
    [Signals.LONG_PRESS_DETECTED]: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
    [Signals.KEYBOARD_PRESS]: States.RESPONDER_ACTIVE_PRESS_IN,
    [Signals.KEYBOARD_RELEASE]: States.RESPONDER_ACTIVE_PRESS_IN,
  },
  [States.RESPONDER_ACTIVE_PRESS_OUT]: {
    [Signals.RESPONDER_GRANT]: States.ERROR,
    [Signals.RESPONDER_RELEASE]: States.NOT_RESPONDER,
    [Signals.RESPONDER_TERMINATED]: States.NOT_RESPONDER,
    [Signals.ENTER_PRESS_RECT]: States.RESPONDER_ACTIVE_PRESS_IN,
    [Signals.LEAVE_PRESS_RECT]: States.RESPONDER_ACTIVE_PRESS_OUT,
    [Signals.LONG_PRESS_DETECTED]: States.ERROR,
    [Signals.KEYBOARD_PRESS]: States.RESPONDER_ACTIVE_PRESS_OUT,
    [Signals.KEYBOARD_RELEASE]: States.RESPONDER_ACTIVE_PRESS_OUT,
  },
  [States.RESPONDER_ACTIVE_LONG_PRESS_IN]: {
    [Signals.RESPONDER_GRANT]: States.ERROR,
    [Signals.RESPONDER_RELEASE]: States.NOT_RESPONDER,
    [Signals.RESPONDER_TERMINATED]: States.NOT_RESPONDER,
    [Signals.ENTER_PRESS_RECT]: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
    [Signals.LEAVE_PRESS_RECT]: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
    [Signals.LONG_PRESS_DETECTED]: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
    [Signals.KEYBOARD_PRESS]: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
    [Signals.KEYBOARD_RELEASE]: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
  },
  [States.RESPONDER_ACTIVE_LONG_PRESS_OUT]: {
    [Signals.RESPONDER_GRANT]: States.ERROR,
    [Signals.RESPONDER_RELEASE]: States.NOT_RESPONDER,
    [Signals.RESPONDER_TERMINATED]: States.NOT_RESPONDER,
    [Signals.ENTER_PRESS_RECT]: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
    [Signals.LEAVE_PRESS_RECT]: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
    [Signals.LONG_PRESS_DETECTED]: States.ERROR,
    [Signals.KEYBOARD_PRESS]: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
    [Signals.KEYBOARD_RELEASE]: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
  },
  [States.KEYBOARD_ACTIVE_PRESS_IN]: {
    [Signals.RESPONDER_GRANT]: States.ERROR,
    [Signals.RESPONDER_RELEASE]: States.ERROR,
    [Signals.RESPONDER_TERMINATED]: States.ERROR,
    [Signals.ENTER_PRESS_RECT]: States.ERROR,
    [Signals.LEAVE_PRESS_RECT]: States.ERROR,
    [Signals.LONG_PRESS_DETECTED]: States.KEYBOARD_ACTIVE_LONG_PRESS_IN,
    [Signals.KEYBOARD_PRESS]: States.KEYBOARD_ACTIVE_PRESS_IN,
    [Signals.KEYBOARD_RELEASE]: States.NOT_RESPONDER,
  },
  [States.KEYBOARD_ACTIVE_LONG_PRESS_IN]: {
    [Signals.RESPONDER_GRANT]: States.ERROR,
    [Signals.RESPONDER_RELEASE]: States.ERROR,
    [Signals.RESPONDER_TERMINATED]: States.ERROR,
    [Signals.ENTER_PRESS_RECT]: States.ERROR,
    [Signals.LEAVE_PRESS_RECT]: States.ERROR,
    [Signals.LONG_PRESS_DETECTED]: States.KEYBOARD_ACTIVE_LONG_PRESS_IN,
    [Signals.KEYBOARD_PRESS]: States.KEYBOARD_ACTIVE_LONG_PRESS_IN,
    [Signals.KEYBOARD_RELEASE]: States.NOT_RESPONDER,
  },
  [States.ERROR]: {
    [Signals.RESPONDER_GRANT]: States.RESPONDER_ACTIVE_PRESS_IN,
    [Signals.RESPONDER_RELEASE]: States.NOT_RESPONDER,
    [Signals.RESPONDER_TERMINATED]: States.NOT_RESPONDER,
    [Signals.ENTER_PRESS_RECT]: States.NOT_RESPONDER,
    [Signals.LEAVE_PRESS_RECT]: States.NOT_RESPONDER,
    [Signals.LONG_PRESS_DETECTED]: States.NOT_RESPONDER,
    [Signals.KEYBOARD_PRESS]: States.KEYBOARD_ACTIVE_PRESS_IN,
    [Signals.KEYBOARD_RELEASE]: States.NOT_RESPONDER,
  },
};

// ==== Typical Constants for integrating into UI components ====
const HIGHLIGHT_DELAY_MS = 0;

const PRESS_EXPAND_PX = 20;

const LONG_PRESS_THRESHOLD = 500;

const LONG_PRESS_DELAY_MS = LONG_PRESS_THRESHOLD - HIGHLIGHT_DELAY_MS;

const LONG_PRESS_ALLOWED_MOVEMENT = 10;

type State = {
  touchable: {
    touchState: ?ButtonState,
    responderID: any,
    positionOnActivate?: {
      left: number,
      top: number,
    },
    dimensionsOnActivate?: {
      width: number,
      height: number,
    },
  },
};

class Button extends React.Component<Props, State> {
  props: Props;

  static defaultProps = {
    delayLongPress: LONG_PRESS_THRESHOLD,
    disabled: false,
  };

  static displayName = 'Button';

  state: State = {
    touchable: {
      touchState: undefined,
      responderID: null,
    },
  };

  /**
   * Clear all timeouts on unmount
   */
  componentWillUnmount() {
    this._longPressDelayTimeout && clearTimeout(this._longPressDelayTimeout);
  }

  render() {
    const {
      accessibilityLabel,
      children,
      className,
      disabled,
      style,
      testID,
    } = this.props;

    const styleProps = {
      className,
      disabled,
      style,
    };

    return (
      <StyledButton
        {...styleProps}
        accessibilityLabel={accessibilityLabel}
        onKeyDown={this._onKeyDownUp}
        onKeyUp={this._onKeyDownUp}
        onResponderGrant={this._onResponderGrant}
        onResponderMove={this._onResponderMove}
        onResponderRelease={this._onResponderRelease}
        onResponderTerminate={this._onResponderTerminate}
        onResponderTerminationRequest={this._onResponderTerminationRequest}
        onStartShouldSetResponder={this._onStartShouldSetResponder}
        role="button"
        tabIndex={this._getTabIndex()}
        testID={testID}
      >
        {children}
      </StyledButton>
    );
  }

  _activeKey: ?number = null;
  _longPressDelayTimeout: ?number;
  _pressInLocation: ?{
    pageX: number,
    pageY: number,
  };

  _cancelLongPressDelayTimeout = () => {
    this._longPressDelayTimeout && clearTimeout(this._longPressDelayTimeout);
    this._longPressDelayTimeout = null;
  };

  _getDistanceBetweenPoints = (
    aX: number,
    aY: number,
    bX: number,
    bY: number,
  ) => {
    const deltaX = aX - bX;
    const deltaY = aY - bY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  _getLongPressDelayMS = () => {
    const { delayLongPress } = this.props;
    return isNaN(delayLongPress) ? LONG_PRESS_DELAY_MS : delayLongPress;
  };

  _getPressRectOffset = () => ({
    left: PRESS_EXPAND_PX,
    right: PRESS_EXPAND_PX,
    top: PRESS_EXPAND_PX,
    bottom: PRESS_EXPAND_PX,
  });

  _getTabIndex = () => {
    return this.props.disabled ? undefined : 0;
  };

  _handleLongDelay = (event: SyntheticEvent<>) => {
    this._longPressDelayTimeout = null;
    const curState = this.state.touchable.touchState;
    if (IsPressingIn[curState]) {
      this._receiveSignal(Signals.LONG_PRESS_DETECTED, event);
    }
  };

  _handleLongPress = () => {
    const { onLongPress } = this.props;

    onLongPress && onLongPress();
  };

  _handlePress = () => {
    const { onPress } = this.props;

    onPress && onPress();
  };

  _handlePressIn = () => {
    const { onPressIn } = this.props;

    onPressIn && onPressIn();
  };

  _handlePressOut = () => {
    const { onPressOut } = this.props;

    onPressOut && onPressOut();
  };

  _handleQueryLayout = (
    l: number,
    t: number,
    w: number,
    h: number,
    globalX: number,
    globalY: number,
  ) => {
    // don't do anything UIManager failed to measure node
    if (!l && !t && !w && !h && !globalX && !globalY) {
      return;
    }
    this.state.touchable.positionOnActivate = {
      left: globalX,
      top: globalY,
    };
    this.state.touchable.dimensionsOnActivate = {
      width: w,
      height: h,
    };
  };

  _onKeyDownUp = (event: SyntheticKeyboardEvent<>) => {
    const ENTER = 13;
    const SPACE = 32;
    const { type, which } = event;
    const curState = this.state.touchable.touchState;
    if ((which === ENTER || which === SPACE) && !IsResponderActive[curState]) {
      if (type === 'keydown' && this._activeKey === null) {
        this._activeKey = which;
        this.state.touchable.touchState =
          this.state.touchable.touchState || States.NOT_RESPONDER;
        this._receiveSignal(Signals.KEYBOARD_PRESS, event);

        const longDelayMS = this._getLongPressDelayMS();
        this._longPressDelayTimeout = setTimeout(
          this._handleLongDelay.bind(event),
          longDelayMS,
        );
      } else if (type === 'keyup' && which === this._activeKey) {
        this._activeKey = null;
        this._receiveSignal(Signals.KEYBOARD_RELEASE, event);
      }
      event.stopPropagation();
    }
  };

  _onResponderGrant = (event: SyntheticEvent<>) => {
    const dispatchID = event.currentTarget;

    this.state.touchable.touchState = States.NOT_RESPONDER;
    this.state.touchable.responderID = dispatchID;
    this._receiveSignal(Signals.RESPONDER_GRANT, event);

    const longDelayMS = this._getLongPressDelayMS();
    this._longPressDelayTimeout = setTimeout(
      this._handleLongDelay,
      longDelayMS,
    );
  };

  _onResponderMove = (event: SyntheticEvent<>) => {
    // Measurement may not have returned yet.
    if (
      !this.state.touchable.positionOnActivate ||
      !this.state.touchable.dimensionsOnActivate
    ) {
      return;
    }

    const positionOnActivate = this.state.touchable.positionOnActivate;
    const dimensionsOnActivate = this.state.touchable.dimensionsOnActivate;
    const pressRectOffset = this._getPressRectOffset();

    const pressExpandLeft = pressRectOffset.left;
    const pressExpandTop = pressRectOffset.top;
    const pressExpandRight = pressRectOffset.right;
    const pressExpandBottom = pressRectOffset.bottom;

    const touch = TouchEventUtils.extractSingleTouch(event.nativeEvent);
    const pageX = touch && touch.pageX;
    const pageY = touch && touch.pageY;

    if (this._pressInLocation) {
      const movedDistance = this._getDistanceBetweenPoints(
        pageX,
        pageY,
        this._pressInLocation.pageX,
        this._pressInLocation.pageY,
      );
      if (movedDistance > LONG_PRESS_ALLOWED_MOVEMENT) {
        this._cancelLongPressDelayTimeout();
      }
    }

    const isTouchWithinActive =
      pageX > positionOnActivate.left - pressExpandLeft &&
      pageY > positionOnActivate.top - pressExpandTop &&
      pageX <
        positionOnActivate.left +
          dimensionsOnActivate.width +
          pressExpandRight &&
      pageY <
        positionOnActivate.top +
          dimensionsOnActivate.height +
          pressExpandBottom;
    if (isTouchWithinActive) {
      this._receiveSignal(Signals.ENTER_PRESS_RECT, event);
    } else {
      this._cancelLongPressDelayTimeout();
      this._receiveSignal(Signals.LEAVE_PRESS_RECT, event);
    }
  };

  _onResponderRelease = (event: SyntheticEvent<>) => {
    this._receiveSignal(Signals.RESPONDER_RELEASE, event);
  };

  _onResponderTerminate = (event: SyntheticEvent<>) => {
    this._receiveSignal(Signals.RESPONDER_TERMINATED, event);
  };

  _onResponderTerminationRequest = () => true;

  _onStartShouldSetResponder = () => {
    const curState = this.state.touchable.touchState;
    return !this.props.disabled && !IsKeyboardActive[curState];
  };

  /**
   * Will perform a transition between touchable states, and identify any
   * highlighting or unhighlighting that must be performed for this particular
   * transition.
   *
   * @param {States} curState Current Touchable state.
   * @param {States} nextState Next Touchable state.
   * @param {Signal} signal Signal that triggered the transition.
   * @param {Event} event Native event.
   * @sideeffects
   */
  _performSideEffectsForTransition = (
    curState: ?ButtonState,
    nextState: ButtonState,
    signal: Signal,
    event: ?SyntheticEvent<>,
  ) => {
    const curIsHighlight = IsPressingIn[curState];
    const newIsHighlight = IsPressingIn[nextState];

    const isFinalSignal =
      signal === Signals.RESPONDER_TERMINATED ||
      signal === Signals.RESPONDER_RELEASE ||
      signal === Signals.KEYBOARD_RELEASE;

    if (isFinalSignal) {
      this._cancelLongPressDelayTimeout();
    }

    if (!IsResponderActive[curState] && IsResponderActive[nextState]) {
      this._remeasureMetricsOnActivation();
    }

    if (IsPressingIn[curState] && signal === Signals.LONG_PRESS_DETECTED) {
      this._handleLongPress && this._handleLongPress();
    }

    if (newIsHighlight && !curIsHighlight) {
      this._startHighlight(event);
    } else if (!newIsHighlight && curIsHighlight) {
      this._endHighlight();
    }

    if (
      (IsResponderPressingIn[curState] &&
        signal === Signals.RESPONDER_RELEASE) ||
      (IsKeyboardPressingIn[curState] && signal === Signals.KEYBOARD_RELEASE)
    ) {
      const hasLongPressHandler = !!this.props.onLongPress;
      const pressIsLongButStillCallOnPress =
        IsLongPressingIn[curState] && !hasLongPressHandler; // We *are* long pressing.. // But has no long handler

      const shouldInvokePress =
        !IsLongPressingIn[curState] || pressIsLongButStillCallOnPress;
      if (shouldInvokePress) {
        this._handlePress();
      }
    }
  };

  _receiveSignal = (signal: Signal, event: ?SyntheticEvent<>) => {
    const responderID = this.state.touchable.responderID;
    const curState = this.state.touchable.touchState;
    const nextState = Transitions[curState] && Transitions[curState][signal];
    if (!responderID && signal === Signals.RESPONDER_RELEASE) {
      return;
    }
    if (!nextState) {
      throw new Error(
        `Unrecognized signal ${signal} or state ${curState ||
          'unknown'} for responder ${responderID}`,
      );
    }
    if (nextState === States.ERROR) {
      throw new Error(
        `Touchable cannot transition from ${curState ||
          'unknown'} to ${signal} for responder ${responderID}`,
      );
    }
    if (curState !== nextState) {
      this._performSideEffectsForTransition(curState, nextState, signal, event);
      this.state.touchable.touchState = nextState;
    }
  };

  _remeasureMetricsOnActivation = () => {
    const tag = this.state.touchable.responderID;
    if (tag == null) {
      return;
    }

    UIManager.measure(tag, this._handleQueryLayout);
  };

  _savePressInLocation = (event: SyntheticEvent<>) => {
    const touch = TouchEventUtils.extractSingleTouch(event.nativeEvent);
    const { pageX, pageY } = touch || {};
    this._pressInLocation = {
      pageX,
      pageY,
    };
  };

  _startHighlight = (event: ?SyntheticEvent<>) => {
    if (event) {
      this._savePressInLocation(event);
    }
    this._handlePressIn();
  };

  _endHighlight = () => {
    this._handlePressOut();
  };
}

export default Button;

const StyledButton = styled(ViewBase)`
  background-color: transparent;
  border-color: transparent;
  border-width: 0;
  text-align: left;

  ${({ disabled }) =>
    disabled
      ? `
    color: inherit;
    cursor: not-allowed;
  `
      : `
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    &:active {
      opacity: 0.2;
    }
  `};
`;
