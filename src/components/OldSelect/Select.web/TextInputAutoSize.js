// @flow

import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: ?string,
  defaultValue?: ?string,
  inputRef?: ?(ref: ?HTMLInputElement) => void,
  minWidth: number,
  placeholder?: ?string,
  value: ?string,
};

type State = {
  inputWidth: number,
};

class TextInputAutoSize extends React.Component<Props, State> {
  static defaultProps = {
    minWidth: 1,
  };

  state: State = {
    inputWidth: this.props.minWidth,
  };

  componentDidMount() {
    this.mounted = true;
    this.copyInputStyles();
    this.updateInputWidth();
  }

  componentDidUpdate() {
    this.updateInputWidth();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  input: ?HTMLInputElement;
  placeHolderSizer: ?HTMLDivElement;
  sizer: ?HTMLDivElement;
  mounted: ?boolean;

  inputRef = (el: ?HTMLInputElement) => {
    this.input = el;
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el);
    }
  };

  placeHolderSizerRef = (el: ?HTMLDivElement) => {
    this.placeHolderSizer = el;
  };

  sizerRef = (el: ?HTMLDivElement) => {
    this.sizer = el;
  };

  copyInputStyles = () => {
    if (!this.mounted || !window.getComputedStyle || !this.sizer) {
      return;
    }
    const inputStyle = this.input && window.getComputedStyle(this.input);
    if (!inputStyle) {
      return;
    }
    const widthNode = this.sizer;
    widthNode.style.fontSize = inputStyle.fontSize;
    widthNode.style.fontFamily = inputStyle.fontFamily;
    widthNode.style.fontWeight = inputStyle.fontWeight;
    widthNode.style.fontStyle = inputStyle.fontStyle;
    widthNode.style.letterSpacing = inputStyle.letterSpacing;
    widthNode.style.textTransform = inputStyle.textTransform;
    if (this.props.placeholder && this.placeHolderSizer) {
      const placeholderNode = this.placeHolderSizer;
      placeholderNode.style.fontSize = inputStyle.fontSize;
      placeholderNode.style.fontFamily = inputStyle.fontFamily;
      placeholderNode.style.fontWeight = inputStyle.fontWeight;
      placeholderNode.style.fontStyle = inputStyle.fontStyle;
      placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
      placeholderNode.style.textTransform = inputStyle.textTransform;
    }
  };

  updateInputWidth = () => {
    if (
      !this.mounted ||
      !this.sizer ||
      typeof this.sizer.scrollWidth === 'undefined'
    ) {
      return;
    }
    const { minWidth, placeholder } = this.props;
    let newInputWidth = this.state.inputWidth;
    if (placeholder) {
      if (this.placeHolderSizer) {
        newInputWidth =
          Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) +
          2;
      }
    } else {
      newInputWidth = this.sizer.scrollWidth + 2;
    }
    if (newInputWidth < minWidth) {
      newInputWidth = minWidth;
    }
    if (newInputWidth !== this.state.inputWidth) {
      this.setState({
        inputWidth: newInputWidth,
      });
    }
  };

  getInput = () => {
    return this.input;
  };

  focus = () => {
    this.input && this.input.focus();
  };

  blur = () => {
    this.input && this.input.blur();
  };

  select = () => {
    this.input && this.input.select();
  };

  render() {
    const {
      className,
      defaultValue,
      inputRef,
      minWidth,
      value,
      ...inputProps
    } = this.props;
    const sizerValue = [defaultValue, value, ''].reduce(
      (previousValue, currentValue) => {
        if (previousValue !== null && previousValue !== undefined) {
          return previousValue;
        }
        return currentValue;
      },
    );

    return (
      <Container className={className}>
        <Input
          {...inputProps}
          innerRef={this.inputRef}
          style={{
            width: this.state.inputWidth,
          }}
          value={value}
        />
        <Sizer innerRef={this.sizerRef}>{sizerValue}</Sizer>
        {this.props.placeholder ? (
          <Sizer innerRef={this.placeHolderSizerRef}>
            {this.props.placeholder}
          </Sizer>
        ) : null}
      </Container>
    );
  }
}

export default TextInputAutoSize;

const Container = styled.div`
  display: inline-block;
`;

const Input = styled.input`
  box-sizing: content-box;
`;

const Sizer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  visibility: hidden;
  overflow: scroll;
  white-space: pre;
`;
