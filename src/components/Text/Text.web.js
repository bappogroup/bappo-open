// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
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
};

// Adding a CSS rule to display non-selectable texts. Those texts
// will be displayed as pseudo elements to prevent them from being copied
// to clipboard. It's not possible to style pseudo elements with inline
// styles, so, we're dynamically creating a <style> tag with the rule.
if (document && document.head) {
  const textAsPseudoElement = '[data-text-as-pseudo-element]::before { content: attr(data-text-as-pseudo-element); }';
  const head = document.head;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(textAsPseudoElement));
  head.appendChild(style);
}

class Text extends React.Component<Props> {
  props: Props;

  static childContextTypes = {
    isParentAText: PropTypes.bool,
  };

  static contextTypes = {
    isParentAText: PropTypes.bool,
  };

  static displayName = 'Text';

  getChildContext() {
    return {
      isParentAText: true,
    };
  }

  render() {
    const {
      children,
      className,
      numberOfLines,
      selectable,
      style,
    } = this.props;

    const {
      isParentAText,
    } = this.context;

    const styleProps = {
      className,
      isParentAText,
      isSelectable: !!selectable,
      isSingleLine: numberOfLines === 1,
      style,
    };

    if (Array.isArray(children)) {
      const flatArray = React.Children.toArray(children);
      return this._renderContainer(
        flatArray.map((element, index) => this._renderChild(element, styleProps, `${index}`)),
        styleProps,
      );
    } else if (typeof children !== 'string' && typeof children !== 'number') {
      return this._renderContainer(children, styleProps);
    }
    return this._renderChild(children, styleProps);
  }

  _renderChild = (
    child: ?(number | string | boolean | React.Element<any>),
    props: Object,
    key?: string,
  ) => {
    const {
      selectable,
    } = this.props;

    if (typeof child === 'string' || typeof child === 'number') {
      if (selectable) {
        return this._renderContainer(child, {
          ...props,
          key,
        });
      }
      // user-select CSS property doesn't prevent the text from being copied to clipboard.
      // To avoid getting to clipboard, the text from data-text-as-pseudo-element attribute
      // will be displayed as pseudo element.
      return (
        <Div
          {...props}
          key={key}
          data-text-as-pseudo-element={child}
        />
      );
    }

    if (typeof child === 'object' && child !== null) {
      return React.cloneElement(child, { key });
    }
    return child;
  };

  _renderContainer = (children: React.Node, props: Object) => {
    return (
      <Div
        {...props}
      >
        {children}
      </Div>
    );
  };
}

export default Text;

const Div = styled.div`
  box-sizing: border-box;
  display: inline;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: System;
  font-size: 14px;
  position: relative;
  white-space: pre-wrap;
  word-wrap: break-word;
  -ms-hyphens: auto;

  ${({ isParentAText }) => isParentAText && `
    font-family: inherit;
    font-size: inherit;
    white-space: inherit;
  `}

  ${({ isSelectable }) => (isSelectable ? `
    cursor: text;
    user-select: text;
  ` : `
    cursor: inherit;
  `)}

  ${({ isSingleLine }) => isSingleLine && `
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;
