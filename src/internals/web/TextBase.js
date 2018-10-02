// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
  className?: string,
  component: string,
  nativeRef?: React.Ref<any>,
  /**
   * Used to truncate the text with an ellipsis after computing the text layout, including line
   * wrapping, such that the total number of lines does not exceed this number.
   */
  numberOfLines?: number,
  /**
   * Lets the user select text, to use the native copy and paste functionality.
   */
  selectable?: boolean,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

class TextBase extends React.Component<Props> {
  static childContextTypes = {
    isParentAText: PropTypes.bool,
  };

  static contextTypes = {
    isParentAText: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
  };

  getChildContext() {
    return {
      isParentAText: true,
    };
  }

  componentDidMount() {
    require('./addNonSelectableTextStyle');
  }

  render() {
    const {
      accessibilityLabel,
      children,
      className,
      nativeRef,
      numberOfLines,
      selectable,
      style,
      testID,
    } = this.props;

    const { isParentAText } = this.context;

    const styleProps = {
      className,
      isParentAText,
      isSelectable: !!selectable,
      numberOfLines,
      style,
    };

    const props = {
      ...styleProps,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
      ref: nativeRef,
    };

    if (typeof children === 'string' || typeof children === 'number') {
      return this._renderText(children, props, false);
    }

    const flatArray = React.Children.toArray(children);
    return this._renderContainer(
      flatArray.map((element, index) =>
        this._renderChild(element, { key: String(index) }),
      ),
      props,
      false,
    );
  }

  _renderChild = (
    child: ?(number | string | boolean | React.Element<any>),
    props: Object,
  ) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return this._renderText(
        child,
        {
          ...props,
          isParentAText: true,
        },
        true,
      );
    }
    if (typeof child === 'object' && child !== null) {
      return React.cloneElement(child, {
        ...props,
        isParentAText: true,
      });
    }
    return child;
  };

  _renderContainer = (
    children: React.Node,
    props: Object,
    isChild: boolean,
  ) => {
    const component = isChild ? ChildText : this.props.component;
    return React.createElement(component, props, children);
  };

  _renderText = (text: string | number, props: Object, isChild: boolean) => {
    const { selectable } = this.props;

    if (selectable) {
      return this._renderContainer(text, props, isChild);
    }
    // user-select CSS property doesn't prevent the text from being copied to clipboard.
    // To avoid getting to clipboard, the text from data-text-as-pseudo-element attribute
    // will be displayed as pseudo element.
    const component = isChild ? ChildText : this.props.component;
    return React.createElement(component, {
      ...props,
      'data-text-as-pseudo-element': text,
    });
  };
}

const textStyle = css`
  box-sizing: border-box;
  color: #191E26;
  display: inline;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  position: relative;
  white-space: pre-wrap;
  word-wrap: break-word;
  -ms-hyphens: auto;

  ${({ isParentAText }) =>
    isParentAText &&
    `
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    white-space: inherit;
  `}

  ${({ isSelectable }) =>
    isSelectable
      ? `
    cursor: text;
    user-select: text;
  `
      : `
    cursor: inherit;
  `}

  ${({ numberOfLines }) =>
    numberOfLines === 1 &&
    `
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

const ChildText = styled.div`
  ${textStyle};
`;

const StyledTextBase = styled(TextBase)`
  ${textStyle};
`;

// $FlowFixMe: forwardRef not supported yet
export default React.forwardRef((props, ref) => {
  return <StyledTextBase {...props} nativeRef={ref} />;
});
