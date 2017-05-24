// @flow

import React from 'react';
import RX from 'reactxp';

type Item = Object;

type Props = {
  itemList: Array<Item>,
  renderItem: (item: Item, index: number) => Element,
  style?: any,
};

class ListView extends RX.Component<any, Props, any> {
  props: Props;

  renderItems = () => {
    const { itemList, renderItem } = this.props;

    return itemList.map(renderItem);
  };

  render() {
    return (
      <RX.ScrollView
        style={this.props.style}
      >
        {this.renderItems()}
      </RX.ScrollView>
    );
  }
}

export default ListView;
