// @flow

import * as React from 'react';
import { ListView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { Option, renderOptionType } from '../types.js.flow';

type Props = {
  labelKey: string,
  onSelect: (option: Option) => void,
  options: Array<Option>,
  renderOption?: ?renderOptionType,
};

type State = {
  dataSource: ListView.DataSource;
};

class Menu extends React.Component<Props, State> {
  props: Props;

  state: State = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),
  };

  componentWillMount() {
    this.setState({
      dataSource: this._getDataSource(this.props.options),
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.options !== this.props.options) {
      this.setState({
        dataSource: this._getDataSource(nextProps.options),
      });
    }
  }

  render() {
    return (
      <StyledListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        enableEmptySections
      />
    );
  }

  _getDataSource = (items: Array<Option>): ListView.DataSource => {
    return this.state.dataSource.cloneWithRows(items);
  };

  _renderRow = (option: Option, sectionId: any, rowId: number) => {
    const { labelKey, onSelect, renderOption } = this.props;

    if (renderOption) {
      return renderOption({ option, index: rowId });
    }

    return (
      <TouchableOpacity
        onPress={() => onSelect(option)}
      >
        <Label>{option[labelKey]}</Label>
      </TouchableOpacity>
    );
  };
}

export default Menu;

const Label = styled.Text`
  padding: 20px;
`;

const StyledListView = styled.ListView`
  flex: 1;
`;
