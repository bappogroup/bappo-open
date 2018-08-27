// @flow

import * as React from 'react';
import TextBase from '../../../internals/web/TextBase';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
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
  // will be removed
  className?: string,
};

class Text extends React.Component<Props> {
  static displayName = 'Text';

  props: Props;

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

    const props = {
      accessibilityLabel,
      children,
      className,
      numberOfLines,
      selectable,
      style,
      testID,
    };

    return <TextBase {...props} />;
  }
}

export default Text;
