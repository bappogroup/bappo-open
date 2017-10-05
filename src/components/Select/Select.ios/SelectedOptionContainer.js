// @flow

import * as React from 'react';
import styled from 'styled-components/native';
import type { Option } from '../types.js.flow';

type Props = {
  children?: React.Node,
  option: Option,
};

class SelectedOptionContainer extends React.Component<Props> {
  props: Props;

  render() {
    const { children, option, ...props } = this.props;
    return (
      <Container
        {...props}
      >
        {this._renderLabel()}
      </Container>
    );
  }

  _renderLabel = () => {
    const { children, option, ...props } = this.props;
    return (
      <Label
        {...props}
      >
        {children}
      </Label>
    );
  };
}

export default SelectedOptionContainer;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;

const Label = styled.Text`
  color: #333;
`;
