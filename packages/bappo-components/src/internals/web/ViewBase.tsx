import uniqueId from 'lodash/uniqueId';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectEventPluginsByName } from 'react-dom/unstable-native-dependencies';
import UIManager from 'react-native-web/dist/cjs/exports/UIManager';
import ResponderEventPlugin from 'react-native-web/dist/cjs/modules/ResponderEventPlugin';
import styled from 'styled-components';

import { ViewLayoutEvent } from '../../events';
import { flex } from './styles';

injectEventPluginsByName({
  ResponderEventPlugin,
});

type ViewBaseProps<
  T extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[T] & {
  accessibilityLabel?: string;
  onLayout?: (event: ViewLayoutEvent) => void;
  ref?: React.Ref<HTMLElement>;
  testID?: string;
};

type InternalProps<T extends keyof JSX.IntrinsicElements> = ViewBaseProps<T> & {
  nativeRef?: React.Ref<HTMLElement>;
  onResponderGrant?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderMove?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderRelease?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderTerminate?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderTerminationRequest?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
  onStartShouldSetResponder?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
};

export function createViewBase<T extends keyof JSX.IntrinsicElements>(
  component: T,
): React.ComponentType<ViewBaseProps<T>> {
  interface ResizeDetector<T extends keyof JSX.IntrinsicElements> {
    register: (id: string, instance: ViewBase<T>) => void;
    unregister: (id: string) => void;
  }

  class ViewBase<T extends keyof JSX.IntrinsicElements> extends React.Component<
    InternalProps<T>
  > {
    componentDidMount() {
      this._isMounted = true;

      // Defer adding resize event handler to window to support server-side
      // rendering
      this._resizeDetector = require('./detectResize') as ResizeDetector<T>;
      this._resizeDetector.register(this._onLayoutId, this);
      this._onLayout();
    }

    componentDidUpdate() {
      this._onLayout();
    }

    componentWillUnmount() {
      this._isMounted = false;
      (this._resizeDetector as ResizeDetector<T>).unregister(this._onLayoutId);
    }

    render() {
      const {
        accessibilityLabel,
        children,
        nativeRef,
        onLayout,
        testID,
        ...rest
      } = this.props;

      const props = {
        ...rest,
        'aria-label': accessibilityLabel,
        'data-testid': testID,
        ref: nativeRef,
      };

      return React.createElement(component, props, children);
    }

    _isMounted: boolean | undefined;
    _lastLayout: {
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    } = {};
    _onLayoutId: string = uniqueId('onLayout');
    _resizeDetector: ResizeDetector<T> | undefined;

    _onLayout = () => {
      const { onLayout } = this.props;

      if (onLayout) {
        UIManager.measure(
          ReactDOM.findDOMNode(this),
          (x: number, y: number, width: number, height: number) => {
            if (!this._isMounted) return;

            if (
              this._lastLayout.x !== x ||
              this._lastLayout.y !== y ||
              this._lastLayout.width !== width ||
              this._lastLayout.height !== height
            ) {
              this._lastLayout = { x, y, width, height };
              const nativeEvent = { layout: { x, y, width, height } };
              onLayout({
                nativeEvent,
                timeStamp: Date.now(),
              });
            }
          },
        );
      }
    };
  }

  // Manually pass on responder event handlers since styled-components filters them out
  const StyledViewBase = styled(ViewBase).attrs(props => ({
    onResponderGrant: props.onResponderGrant,
    onResponderMove: props.onResponderMove,
    onResponderRelease: props.onResponderRelease,
    onResponderTerminate: props.onResponderTerminate,
    onResponderTerminationRequest: props.onResponderTerminationRequest,
    onStartShouldSetResponder: props.onStartShouldSetResponder,
  }))`
    ${flex};
  `;

  return React.forwardRef((props: any, ref: React.Ref<HTMLElement>) => {
    return <StyledViewBase {...props} nativeRef={ref} />;
  });
}

export const DivViewBase = createViewBase('div');
