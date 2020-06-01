// @flow

/* eslint-disable react/no-array-index-key */

import moment from 'moment';
import type Moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import { HOURS, MERIDIEMS, MINUTES } from '../constants';

type Props = {
  initialTime?: ?Moment,
  onSelect?: ?(time: Moment) => void,
  displayRight?: string | undefined,
};

type State = {
  selectedHour: number,
  selectedMinute: number,
  selectedMeridiem: string,
};

const CELL_HEIGHT = 25;

class WheelPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let initialTime = this.props.initialTime;
    if (!initialTime || !initialTime.isValid()) {
      initialTime = moment();
    }

    this.state = {
      selectedHour: initialTime.hour() % 12,
      selectedMinute: initialTime.minute(),
      selectedMeridiem: initialTime.format('A'),
    };
  }

  componentDidMount() {
    const { selectedHour, selectedMinute } = this.state;

    if (selectedHour > 4 && this._wheelRefs[0]) {
      this._wheelRefs[0].scrollTop = CELL_HEIGHT * (selectedHour - 4);
    }
    if (selectedMinute > 4 && this._wheelRefs[1]) {
      this._wheelRefs[1].scrollTop = CELL_HEIGHT * (selectedMinute - 4);
    }
  }

  render() {
    return (
      <Container displayRight={this.props.displayRight}>
        {this._renderWheels()}
        {this._renderFooter()}
      </Container>
    );
  }

  _wheelRefs: Array<?HTMLDivElement> = [];

  _submit = () => {
    const { onSelect } = this.props;
    const { selectedHour, selectedMinute, selectedMeridiem } = this.state;

    const hour = selectedMeridiem === 'AM' ? selectedHour : selectedHour + 12;
    const value = moment({
      hour,
      minute: selectedMinute,
    });
    onSelect && onSelect(value);
  };

  _renderWheels = () => {
    return (
      <WheelsContainer>
        <Wheel
          innerRef={ref => {
            this._wheelRefs[0] = ref;
          }}
        >
          {HOURS.map((hour: string, hourNum: number) => (
            <Cell
              key={hour}
              onClick={() => this.setState({ selectedHour: hourNum })}
              isSelected={hourNum === this.state.selectedHour}
            >
              {hour}
            </Cell>
          ))}
        </Wheel>
        <Wheel
          innerRef={ref => {
            this._wheelRefs[1] = ref;
          }}
        >
          {MINUTES.map((minute: string, minuteNum: number) => (
            <Cell
              key={minuteNum}
              onClick={() => this.setState({ selectedMinute: minuteNum })}
              isSelected={minuteNum === this.state.selectedMinute}
            >
              {minute}
            </Cell>
          ))}
        </Wheel>
        <Wheel
          innerRef={ref => {
            this._wheelRefs[2] = ref;
          }}
        >
          {MERIDIEMS.map((meridiem: string) => (
            <Cell
              key={meridiem}
              onClick={() => this.setState({ selectedMeridiem: meridiem })}
              isSelected={meridiem === this.state.selectedMeridiem}
            >
              {meridiem}
            </Cell>
          ))}
        </Wheel>
      </WheelsContainer>
    );
  };

  _renderFooter = () => {
    return (
      <FooterContainer>
        <DoneButton onClick={this._submit}>Done</DoneButton>
      </FooterContainer>
    );
  };
}

export default WheelPicker;

const Container = styled.div.attrs({
  'data-component': 'wheel-picker',
})`
  ${({ displayRight }) =>
    displayRight &&
    `
    position: absolute;
    border: 1px solid #ccc;
    right: ${displayRight}px;
    background-color: #fff;
  `}
`;

const Cell = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: ${CELL_HEIGHT}px;
  justify-content: center;
  padding: 0 25px;

  ${({ isSelected }) =>
    isSelected
      ? `
    background-color: #445;
    color: #fff;
  `
      : `
    &:hover {
      background-color: #eee;
    }
  `};
`;

const DoneButton = styled.button.attrs({
  tabIndex: -1,
  type: 'button',
})`
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  height: 100%;
  width: 100%;

  &:hover {
    background-color: #eee;
  }
`;

const FooterContainer = styled.div`
  border-top: 1px solid #ddd;
  height: 25px;
`;

const Wheel = styled.div`
  overflow-y: auto;
  width: 70px;

  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }
`;

const WheelsContainer = styled.div`
  display: flex;
  height: ${9 * CELL_HEIGHT}px;
`;
