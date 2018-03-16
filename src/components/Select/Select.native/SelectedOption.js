// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { Option } from '../types.js.flow';

type Props = {
  labelKey: string,
  option: Option,
};

class SelectedOption extends React.Component<Props> {
  props: Props;

  render() {
    const { option, ...props } = this.props;
    return (
      <Container
        {...props}
      >
        {this._renderLabel()}
      </Container>
    );
  }

  _renderLabel = () => {
    const { labelKey, option, ...props } = this.props;
    return (
      <Label
        {...props}
      >
        {option[labelKey]}
      </Label>
    );
  };
}

export default SelectedOption;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  color: #333;
`;
