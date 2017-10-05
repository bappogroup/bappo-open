// @flow

import * as React from 'react';
import { ListView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type {
  Option,
  renderOptionType,
} from '../types.js.flow';

type Props = {
  labelKey: string,
  onSelect: (option: Option) => void,
  options: Array<Option>,
  renderOption?: ?renderOptionType,
  selectedOptions: Array<Option>,
  valueKey: string,
};

type State = {
  dataSource: ListView.DataSource,
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
      dataSource: this._getDataSource(this.props),
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.options !== this.props.options ||
      nextProps.selectedOptions !== this.props.selectedOptions
    ) {
      this.setState({
        dataSource: this._getDataSource(nextProps),
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

  _getDataSource = ({ options, selectedOptions }: {
    options: Array<Option>,
    selectedOptions: Array<Option>,
  }): ListView.DataSource => {
    return this.state.dataSource.cloneWithRows(options.map(option => ({
      ...option,
      _selected: selectedOptions.indexOf(option) > -1,
    })));
  };

  _renderRow = (option: Option, sectionId: any, rowId: number) => {
    const { labelKey, onSelect, renderOption } = this.props;

    let optionElement;
    if (renderOption) {
      optionElement = renderOption({ option, index: rowId });
    } else {
      optionElement = (
        <Label
          numberOfLines={2}
          isDisabled={option.disabled}
        >
          {option[labelKey]}
        </Label>
      );
    }

    return (
      <TouchableOpacity
        disabled={option.disabled}
        onPress={() => onSelect(option)}
      >
        <Row>
          {optionElement}
          <SelectedIcon
            show={option._selected}
          >
            ✓
          </SelectedIcon>
        </Row>
      </TouchableOpacity>
    );
  };
}

export default Menu;

const Label = styled.Text`
  flex: 1;
  ${({ isDisabled }) => isDisabled && `
    color: #ccc;
  `}
`;

const Row = styled.View`
  flex-direction: row;
  padding: 20px;
`;

const SelectedIcon = styled.Text`
  font-size: 20px;
  opacity: ${props => (props.show ? '1' : '0')};
`;

const StyledListView = styled.ListView`
  flex: 1;
`;
