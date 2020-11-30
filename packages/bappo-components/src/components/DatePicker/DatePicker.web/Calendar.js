// @flow

/* eslint-disable react/no-array-index-key */

import chunk from 'lodash/chunk';
import moment from 'moment';
import type Moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import Text from '../../../primitives/Text';

type Props = {
  initialDate?: ?Moment,
  onSelect?: ?(date: Moment) => void,
  alignRight?: string,
};

type State = {
  displayedYear: number,
  displayedMonth: number,
  granularity: 'day' | 'month' | 'year',
};

const getMonthDatesGroupedByWeek = (year: number, month: number) => {
  const monthMoment = moment()
    .year(year)
    .month(month);
  const start = monthMoment
    .clone()
    .startOf('month')
    .startOf('week');
  const end = monthMoment
    .clone()
    .endOf('month')
    .endOf('week');
  const arr = [];
  while (start.isSameOrBefore(end)) {
    arr.push(start.clone());
    start.add(1, 'day');
  }
  return chunk(arr, 7);
};

const getGroupedMonths = (year: number) => {
  const yearMoment = moment().year(year);
  const arr = Array.from({ length: 12 }).map((_unused, index) =>
    yearMoment.clone().month(index),
  );
  return chunk(arr, 4);
};

const getGroupedYears = (year: number) => {
  const yearMoment = moment().year(year);
  const start = yearMoment.clone().subtract(6, 'years');
  const arr = [];
  while (arr.length !== 12) {
    arr.push(start.clone());
    start.add(1, 'year');
  }
  return chunk(arr, 4);
};

class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let initialDate = this.props.initialDate;
    if (!initialDate || !initialDate.isValid()) {
      initialDate = moment();
    }

    this.state = {
      displayedYear: initialDate.year(),
      displayedMonth: initialDate.month(),
      granularity: 'day',
    };
  }

  render() {
    return (
      <CalendarContainer $alignRight={this.props.alignRight || false}>
        {this._renderNavigator()}
        {this._renderGrid()}
      </CalendarContainer>
    );
  }

  _changeGranularity = () => {
    this.setState((prevState) => {
      let newGranularity;
      switch (prevState.granularity) {
        case 'day':
          newGranularity = 'month';
          break;
        case 'month':
          newGranularity = 'year';
          break;
        default:
          break;
      }
      return {
        granularity: newGranularity,
      };
    });
  };

  _getDisplayText = (displayedMoment: Moment) => {
    switch (this.state.granularity) {
      case 'day':
        return displayedMoment.format('MMMM YYYY');
      case 'month':
        return displayedMoment.format('YYYY');
      default:
        return '';
    }
  };

  _navigate = (dir: 'forward' | 'backward', displayedMoment: Moment) => {
    const fn = dir === 'forward' ? 'add' : 'subtract';
    const newDisplayedMoment = displayedMoment.clone();

    switch (this.state.granularity) {
      case 'day': {
        // $FlowFixMe
        newDisplayedMoment[fn](1, 'month');
        break;
      }
      case 'month': {
        // $FlowFixMe
        newDisplayedMoment[fn](1, 'year');
        break;
      }
      case 'year': {
        // $FlowFixMe
        newDisplayedMoment[fn](12, 'years');
        break;
      }
      default:
        return;
    }

    this.setState({
      displayedMonth: newDisplayedMoment.month(),
      displayedYear: newDisplayedMoment.year(),
    });
  };

  _renderDayGrid = () =>
    React.Children.toArray([
      this._renderHeader(),
      this._renderMonth(this.state.displayedYear, this.state.displayedMonth),
    ]);

  _renderGrid = () => {
    let content = null;
    switch (this.state.granularity) {
      case 'day':
        content = this._renderDayGrid();
        break;
      case 'month':
        content = this._renderMonthGrid();
        break;
      case 'year':
        content = this._renderYearGrid();
        break;
      default:
        break;
    }
    return <Grid>{content}</Grid>;
  };

  _renderHeader = () => {
    const now = moment();
    return (
      <HeaderContainer>
        {[0, 1, 2, 3, 4, 5, 6].map((weekDayNum) => {
          return (
            <HeaderCell key={weekDayNum}>
              <GridText>{now.day(weekDayNum).format('ddd.')}</GridText>
            </HeaderCell>
          );
        })}
      </HeaderContainer>
    );
  };

  _renderMonth = (year: number, month: number) => {
    const weeks = getMonthDatesGroupedByWeek(year, month);
    return (
      <MonthContainer>
        {weeks.map((weekDays: Array<Moment>, weekNum: number) => {
          return (
            <Row key={weekNum}>
              {weekDays.map((day: Moment, dayNum: number) => {
                const { initialDate, onSelect } = this.props;
                const isSelected =
                  initialDate && day.isSame(initialDate, 'day');

                return (
                  <Cell
                    key={dayNum}
                    onClick={() => onSelect && onSelect(day)}
                    $isSelected={isSelected}
                    $isToday={day.isSame(moment(), 'day')}
                  >
                    <GridText
                      $isGray={day.month() !== month}
                      $isSelected={isSelected}
                    >
                      {day.date()}
                    </GridText>
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </MonthContainer>
    );
  };

  _renderMonthGrid = () => {
    const handleClick = (month: Moment) => {
      this.setState({
        displayedMonth: month.month(),
        displayedYear: month.year(),
        granularity: 'day',
      });
    };
    return getGroupedMonths(this.state.displayedYear).map(
      (months, groupNum) => (
        <Row key={groupNum}>
          {months.map((month, monthNum) => (
            <Cell key={monthNum} onClick={() => handleClick(month)}>
              <GridText>{month.format('MMM.')}</GridText>
            </Cell>
          ))}
        </Row>
      ),
    );
  };

  _renderNavigator = () => {
    const { onSelect } = this.props;
    const { displayedMonth, displayedYear, granularity } = this.state;
    const displayedMoment = moment()
      .year(displayedYear)
      .month(displayedMonth);
    return (
      <NavigatorContainer>
        <DisplayContainer onClick={this._changeGranularity}>
          {(granularity === 'day' || granularity === 'month') &&
            React.Children.toArray([
              <DisplayText>
                {this._getDisplayText(displayedMoment)}
              </DisplayText>,
              <Arrow />,
            ])}
        </DisplayContainer>
        <NavigatorButtonContainer>
          <NavigatorButton
            onClick={() => this._navigate('backward', displayedMoment)}
          >
            <NavigatorButtonText>&lt;</NavigatorButtonText>
          </NavigatorButton>
          <NavigatorButton onClick={() => onSelect && onSelect(moment())}>
            <NavigatorButtonText>Today</NavigatorButtonText>
          </NavigatorButton>
          <NavigatorButton
            onClick={() => this._navigate('forward', displayedMoment)}
          >
            <NavigatorButtonText>&gt;</NavigatorButtonText>
          </NavigatorButton>
        </NavigatorButtonContainer>
      </NavigatorContainer>
    );
  };

  _renderYearGrid = () => {
    const handleClick = (year: Moment) => {
      this.setState({
        displayedYear: year.year(),
        granularity: 'month',
      });
    };
    return getGroupedYears(this.state.displayedYear).map((years, groupNum) => (
      <Row key={groupNum}>
        {years.map((year, yearNum) => (
          <Cell key={yearNum} onClick={() => handleClick(year)}>
            <GridText>{year.format('YYYY')}</GridText>
          </Cell>
        ))}
      </Row>
    ));
  };
}

export default Calendar;

const Arrow = styled.span`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 2.5px;
  height: 0;
  margin-left: 3px;
  width: 0;
  position: relative;
`;

const CalendarContainer = styled.div.attrs((props) => ({
  'data-component': 'calendar',
}))`
  ${({ $alignRight }) =>
    $alignRight &&
    `
    position: absolute;
    border: 1px solid #ccc;
    right: ${$alignRight}px;
    background-color: #fff;
    `}
`;

const Cell = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 1;
  height: 25px;
  justify-content: center;

  ${({ $isToday }) =>
    $isToday &&
    `
    border: 1px solid #ccc;
    height: 23px;
  `}

  ${({ $isSelected }) =>
    $isSelected
      ? `
    background-color: #445;
  `
      : `
    &:hover {
      background-color: #eee;
    }
  `}
`;

const DisplayContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 8px;

  &:hover {
    background-color: #eee;
    ${Arrow} {
      border-top-color: #666;
    }
  }
`;

const DisplayText = styled(Text)`
  font-size: 14px;
`;

const Grid = styled.div`
  width: 280px;
`;

const GridText = styled(Text)`
  font-size: 12.6px;

  ${({ $isGray }) => $isGray && `color: #c3c3c3;`};

  ${({ $isSelected }) => $isSelected && `color: white;`};
`;

const HeaderCell = styled.div`
  align-items: center;
  cursor: default;
  display: flex;
  flex: 1;
  height: 25px;
  justify-content: center;
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigatorButton = styled.button.attrs((props) => ({
  tabIndex: -1,
  type: 'button',
}))`
  background: none;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  &:not(:last-child) {
    margin-right: 7px;
  }
`;

const NavigatorButtonContainer = styled.div`
  display: flex;
  padding: 3px;
`;

const NavigatorButtonText = styled(Text)``;

const NavigatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
`;

const Row = styled.div`
  display: flex;
`;

const HeaderContainer = styled(Row)`
  border-bottom: 1px solid #ccc;
  display: flex;
`;
