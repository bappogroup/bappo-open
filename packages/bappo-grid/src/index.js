import React from 'react';
import { styled, View, Text, ScrollView } from 'bappo-components';
import ScrollBox from './scrollBox/index.js';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollHeight: this.props.rowCount * this.props.cellHeight,
      scrollWidth: this.props.columnCount * this.props.cellWidth,
    };

    this.rowLabels = React.createRef();
    this.columnLabels = React.createRef();

    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.scrollTopBuffer =
      (this.props.cellHeight * Math.abs(this.props.buffer)) / 2;
    this.scrollLeftBuffer =
      (this.props.cellWidth * Math.abs(this.props.buffer)) / 2;
  }

  handleScroll = ({ scrollTop, scrollLeft }) => {
    this.rowLabels.current.scrollTo({ y: scrollTop, animated: false });
    this.columnLabels.current.scrollTo({ x: scrollLeft, animated: false });

    if (
      Math.abs(this.scrollTop - scrollTop) < this.scrollTopBuffer &&
      Math.abs(this.scrollLeft - scrollLeft) < this.scrollLeftBuffer
    ) {
      return;
    }

    this.scrollTop = scrollTop;
    this.scrollLeft = scrollLeft;

    const visible = {
      column: {},
      row: {},
    };

    visible.column.count =
      Math.floor(this.state.visibleWidth / this.props.cellWidth) +
      this.props.buffer * 2;
    visible.column.count = Math.max(visible.column.count, 3);

    visible.column.begin =
      Math.floor(scrollLeft / this.props.cellWidth) - this.props.buffer;

    visible.column.end =
      visible.column.begin + visible.column.count + this.props.buffer;

    visible.row.count =
      Math.floor(this.state.visibleHeight / this.props.cellHeight) +
      this.props.buffer * 2;

    visible.row.begin =
      Math.floor(scrollTop / this.props.cellHeight) - this.props.buffer;

    visible.row.end = visible.row.begin + visible.row.count + this.props.buffer;

    visible.row.begin = Math.max(visible.row.begin, 0);
    visible.column.begin = Math.max(visible.column.begin, 0);
    visible.row.end = Math.min(visible.row.end, this.props.rowCount - 1);
    visible.column.end = Math.min(
      visible.column.end,
      this.props.columnCount - 1,
    );

    const rows = makeArray(visible.row.begin, visible.row.end);
    const columns = makeArray(visible.column.begin, visible.column.end);

    this.setState({ rows, columns });
  };

  renderCenterSection = () => {
    const style = {
      height: this.state.scrollHeight,
      width: this.state.scrollWidth,
    };
    return (
      <CenterSectionOuter onLayout={this.onLayout}>
        <ScrollBox
          onScroll={this.handleScroll}
          scrollHeight={this.state.scrollHeight}
          scrollWidth={this.state.scrollWidth}
        >
          <CenterSectionInner style={style}>
            {this.state.rows &&
              this.state.rows.map(ri =>
                this.state.columns.map(ci => this.renderCell(ri, ci)),
              )}
          </CenterSectionInner>
        </ScrollBox>
      </CenterSectionOuter>
    );
  };

  refLeftSection = React.createRef();
  refTopSection = React.createRef();

  renderLeftSection = () => {
    return (
      <LeftSectionOuter>
        <ScrollView ref={this.rowLabels}>
          <LeftSectionInner style={{ height: this.state.scrollHeight + 100 }}>
            {this.state.rows && this.state.rows.map(this.renderLeftRow)}
          </LeftSectionInner>
        </ScrollView>
      </LeftSectionOuter>
    );
  };

  getHeaderHeight = () => this.props.headerHeight || this.props.cellHeight;

  renderTopSection = () => {
    const style = {
      width: this.state.scrollWidth + 100,
    };
    return (
      <View style={{ height: this.getHeaderHeight() }}>
        <ScrollView horizontal={'true'} ref={this.columnLabels}>
          <TopSectionInner style={style}>
            {this.state.columns &&
              this.state.columns.map(this.renderColumnLabel)}
          </TopSectionInner>
        </ScrollView>
      </View>
    );
  };

  renderTopLeftCornerSection = () => {
    return (
      <TopLeftCornerSection
        style={{
          height: this.props.headerHeight || this.props.cellHeight,
          width: this.props.rowLabelWidth,
        }}
      >
        {this.props.renderTopLeftCorner && this.props.renderTopLeftCorner()}
      </TopLeftCornerSection>
    );
  };

  refLeftPanel = React.createRef();

  renderLeftRow = rowIndex => (
    <Item
      key={rowIndex}
      style={{
        top: rowIndex * this.props.cellHeight,
        left: 0,
        height: this.props.cellHeight,
        width: this.props.rowLabelWidth,
      }}
    >
      {this.props.renderRowLabel({ rowIndex })}
    </Item>
  );

  renderColumnLabel = columnIndex => (
    <Item
      key={columnIndex}
      style={{
        top: 0,
        left: columnIndex * this.props.cellWidth,
        height: this.props.headerHeight || this.props.cellHeight,
        width: this.props.cellWidth,
      }}
    >
      {this.props.renderColumnLabel({ columnIndex })}
    </Item>
  );

  renderCell = (rowIndex, columnIndex) => {
    return (
      <Item
        key={`${rowIndex}-${columnIndex}`}
        style={{
          top: rowIndex * this.props.cellHeight,
          left: columnIndex * this.props.cellWidth,
          height: this.props.cellHeight,
          width: this.props.cellWidth,
        }}
      >
        {this.props.renderCell({ rowIndex, columnIndex })}
      </Item>
    );
  };

  onLayout = e => {
    const s = {};
    s.visibleWidth = e.nativeEvent.layout.width;
    s.visibleHeight = e.nativeEvent.layout.height;

    if (!this.state.rows) {
      // first event direct after mounting
      // we're doing it here instead of componentDidMount because we need
      // the visibleWidth and visibleHeight, everything depends on it
      const colEnd = Math.min(
        Math.ceil(s.visibleWidth / this.props.cellWidth) + 2,
        this.props.columnCount - 1,
      );
      const rowEnd = Math.min(
        Math.ceil(s.visibleHeight / this.props.cellHeight) + 2,
        this.props.rowCount - 1,
      );
      s.rows = makeArray(0, rowEnd);
      s.columns = makeArray(0, colEnd);
    }

    this.setState(s);
  };

  render() {
    return (
      <Container>
        <LeftContainer style={{ width: this.props.rowLabelWidth }}>
          {this.renderTopLeftCornerSection()}
          {this.renderLeftSection()}
        </LeftContainer>
        <CenterContainer>
          {this.renderTopSection()}
          {this.renderCenterSection()}
        </CenterContainer>
      </Container>
    );
  }
}

Grid.defaultProps = {
  buffer: 0,
  cellHeight: 30,
  cellWidth: 100,
  rowCount: 100,
  columnCount: 30,
  rowLabelWidth: 80,
  renderRowLabel: ({ rowIndex }) => <Text>{rowIndex}</Text>,
  renderColumnLabel: ({ columnIndex }) => <Text>{columnIndex}</Text>,
  renderTopLeftCorner: () => null,
  renderCell: ({ columnIndex, rowIndex }) => (
    <Text>
      {columnIndex}:{rowIndex}
    </Text>
  ),
};

export default Grid;

const Container = styled(View)`
  flex: 1;
  align-items: stretch;
  flex-direction: row;
`;

const LeftContainer = styled(View)``;

const CenterContainer = styled(View)`
  flex: 1;

  .topSection {
    flex: none;
    height: 30px;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

const TopLeftCornerSection = styled(View)``;

const LeftSectionInner = styled(View)``;

const TopSectionInner = styled(View)`
  height: 30px;
`;

const CenterSectionOuter = styled(View)`
  flex: 1;
`;

const CenterSectionInner = styled(View)``;

const Item = styled(View)`
  position: absolute;
  overflow: hidden;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`;

const LeftSectionOuter = styled(View)`
  flex: 1;
`;

const makeArray = (begin, end) => {
  const a = [];
  for (let i = begin; i <= end; i++) {
    a.push(i);
  }
  return a;
};
