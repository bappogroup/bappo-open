import React from "react";
import { ScrollView, styled, View } from "bappo-components";

class ScrollBox extends React.Component {
  scroll = {
    scrollTop: 0,
    scrollLeft: 0
  };

  onVerticalScroll = e => {
    this.scroll.scrollTop = e.nativeEvent.contentOffset.y;
    this.props.onScroll(this.scroll);
  };

  onHorizontalScroll = e => {
    this.scroll.scrollLeft = e.nativeEvent.contentOffset.x;
    this.props.onScroll(this.scroll);
  };

  render() {
    return (
      <ScrollView onScroll={this.onVerticalScroll}>
        <HorizontalScrollViewInner style={{ height: this.props.scrollHeight }}>
          <ScrollView horizontal onScroll={this.onHorizontalScroll}>
            {this.props.children}
          </ScrollView>
        </HorizontalScrollViewInner>
      </ScrollView>
    );
  }
}

export default ScrollBox;

ScrollBox.defaultProps = {
  height: 100
};

const HorizontalScrollViewInner = styled(View)`
  flex: 1;
`;
