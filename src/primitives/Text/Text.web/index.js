// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
  className?: string,
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

class Text extends React.Component<Props> {
  static childContextTypes = {
    isParentAText: PropTypes.bool,
  };

  static contextTypes = {
    isParentAText: PropTypes.bool,
  };

  static displayName = 'Text';

  props: Props;

  getChildContext() {
    return {
      isParentAText: true,
    };
  }

  componentDidMount() {
    require('../../../internals/web/addNonSelectableTextStyle');
  }

  render() {
    const {
      accessibilityLabel,
      children,
      className,
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
      isSingleLine: numberOfLines === 1,
      style,
    };

    const props = {
      ...styleProps,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
    };

    if (typeof children === 'string' || typeof children === 'number') {
      return this._renderText(children, props);
    }

    const flatArray = React.Children.toArray(children);
    return this._renderContainer(
      flatArray.map((element, index) =>
        this._renderChild(element, { key: String(index) }),
      ),
      props,
    );
  }

  _renderChild = (
    child: ?(number | string | boolean | React.Element<any>),
    props: Object,
  ) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return this._renderText(child, {
        ...props,
        isParentAText: true,
      });
    }
    if (typeof child === 'object' && child !== null) {
      return React.cloneElement(child, {
        ...props,
        isParentAText: true,
      });
    }
    return child;
  };

  _renderContainer = (children: React.Node, props: Object) => {
    return <Div {...props}>{children}</Div>;
  };

  _renderText = (text: string | number, props: Object) => {
    const { selectable } = this.props;

    if (selectable) {
      return this._renderContainer(text, props);
    }
    // user-select CSS property doesn't prevent the text from being copied to clipboard.
    // To avoid getting to clipboard, the text from data-text-as-pseudo-element attribute
    // will be displayed as pseudo element.
    return <Div {...props} data-text-as-pseudo-element={text} />;
  };
}

export default Text;

const Div = styled.div`
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

  ${({ isSingleLine }) =>
    isSingleLine &&
    `
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;
