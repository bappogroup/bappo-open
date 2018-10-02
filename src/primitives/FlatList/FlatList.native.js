// @flow

import * as React from 'react';
import RN from 'react-native';
import type { ScrollEvent, ViewLayoutEvent } from '../../events.js.flow';

type RequiredProps<ItemT> = {
  /**
   * For simplicity, data is just a plain array. If you want to use something else, like an
   * immutable list, use the underlying `VirtualizedList` directly.
   */
  data: ?$ReadOnlyArray<ItemT>,
  /**
   * Takes an item from `data` and renders it into the list. Example usage:
   *
   *     <FlatList
   *       data={[{title: 'Title Text', key: 'item1'}]}
   *       renderItem={({item, separators}) => (
   *         <View style={{backgroundColor: 'white'}}>
   *           <Text>{item.title}</Text>
   *         </View>
   *       )}
   *     />
   *
   * Provides additional metadata like `index` if you need it, as well as a more generic
   * `separators.updateProps` function which let's you set whatever props you want to change the
   * rendering of either the leading separator or trailing separator in case the more common
   * `highlight` and `unhighlight` (which set the `highlighted: boolean` prop) are insufficient for
   * your use-case.
   */
  renderItem: (info: {
    item: ItemT,
    index: number,
    separators: {
      highlight: () => void,
      unhighlight: () => void,
      updateProps: (select: 'leading' | 'trailing', newProps: Object) => void,
    },
  }) => ?React.Element<any>,
};
type OptionalProps<ItemT> = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  /**
   * A marker property for telling the list to re-render (since it implements `PureComponent`). If
   * any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the
   * `data` prop, stick it here and treat it immutably.
   */
  extraData?: any,
  /**
   * A generic accessor for extracting an item from any sort of data blob.
   */
  getItem?: ?(data: Array<ItemT>, index: number) => ?ItemT,
  /**
   * Determines how many items are in the data blob.
   */
  getItemCount?: ?(data: Array<ItemT>) => number,
  /**
   * `getItemLayout` is an optional optimizations that let us skip measurement of dynamic content if
   * you know the height of items a priori. `getItemLayout` is the most efficient, and is easy to
   * use if you have fixed height items, for example:
   *
   *     getItemLayout={(data, index) => (
   *       {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
   *     )}
   *
   * Adding `getItemLayout` can be a great performance boost for lists of several hundred items.
   * Remember to include separator length (height or width) in your offset calculation if you
   * specify `ItemSeparatorComponent`.
   */
  getItemLayout?: (
    data: Array<ItemT>,
    index: number,
  ) => { length: number, offset: number, index: number },
  /**
   * If true, renders items next to each other horizontally instead of stacked vertically.
   */
  horizontal?: ?boolean,
  /**
   * How many items to render in the initial batch. This should be enough to fill the screen but not
   * much more. Note these items will never be unmounted as part of the windowed rendering in order
   * to improve perceived performance of scroll-to-top actions.
   */
  initialNumToRender: number,
  /**
   * Instead of starting at the top with the first item, start at `initialScrollIndex`. This
   * disables the "scroll to top" optimization that keeps the first `initialNumToRender` items
   * always rendered and immediately renders the items starting at this initial index. Requires
   * `getItemLayout` to be implemented.
   */
  initialScrollIndex?: ?number,
  /**
   * Reverses the direction of scroll. Uses scale transforms of -1.
   */
  inverted?: ?boolean,
  /**
   * Rendered in between each item, but not at the top or bottom. By default, `highlighted` and
   * `leadingItem` props are provided. `renderItem` provides `separators.highlight`/`unhighlight`
   * which will update the `highlighted` prop, but you can also add custom props with
   * `separators.updateProps`.
   */
  ItemSeparatorComponent?: ?React.ComponentType<any>,
  /**
   * Used to extract a unique key for a given item at the specified index. Key is used for caching
   * and as the react key to track item re-ordering. The default extractor checks `item.key`, then
   * falls back to using the index, like React does.
   */
  keyExtractor: (item: ItemT, index: number) => string,
  /**
   * Rendered when the list is empty. Can be a React Component Class, a render function, or
   * a rendered element.
   */
  ListEmptyComponent?: ?(React.ComponentType<any> | React.Element<any>),
  /**
   * Rendered at the bottom of all the items. Can be a React Component Class, a render function, or
   * a rendered element.
   */
  ListFooterComponent?: ?(React.ComponentType<any> | React.Element<any>),
  /**
   * Rendered at the top of all the items. Can be a React Component Class, a render function, or
   * a rendered element.
   */
  ListHeaderComponent?: ?(React.ComponentType<any> | React.Element<any>),
  /**
   * The maximum number of items to render in each incremental render batch. The more rendered at
   * once, the better the fill rate, but responsiveness my suffer because rendering content may
   * interfere with responding to button taps or other interactions.
   */
  maxToRenderPerBatch: number,
  onContentSizeChange?: ?(width: number, height: number) => void,
  /**
   * Called once when the scroll position gets within `onEndReachedThreshold` of the rendered
   * content.
   */
  onEndReached?: ?(info: { distanceFromEnd: number }) => void,
  /**
   * How far from the end (in units of visible length of the list) the bottom edge of the
   * list must be from the end of the content to trigger the `onEndReached` callback.
   * Thus a value of 0.5 will trigger `onEndReached` when the end of the content is
   * within half the visible length of the list.
   */
  onEndReachedThreshold?: ?number,
  onLayout?: ?(event: ViewLayoutEvent) => void,
  onScroll?: ?(event: ScrollEvent) => void,
  scrollEventThrottle?: number,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
  /**
   * Amount of time between low-pri item render batches, e.g. for rendering items quite a ways off
   * screen. Similar fill rate/responsiveness tradeoff as `maxToRenderPerBatch`.
   */
  updateCellsBatchingPeriod: number,
  /**
   * Determines the maximum number of items rendered outside of the visible area, in units of
   * visible lengths. So if your list fills the screen, then `windowSize={21}` (the default) will
   * render the visible screen area plus up to 10 screens above and 10 below the viewport. Reducing
   * this number will reduce memory consumption and may improve performance, but will increase the
   * chance that fast scrolling may reveal momentary blank areas of unrendered content.
   */
  windowSize: number,
};
type Props<ItemT> = RequiredProps<ItemT> & OptionalProps<ItemT>;

/**
 * A performant interface for rendering simple, flat lists, supporting the most handy features:
 *
 *  - Fully cross-platform.
 *  - Optional horizontal mode.
 *  - Header support.
 *  - Footer support.
 *  - Separator support.
 *  - Scroll loading.
 *  - ScrollToIndex support.
 *
 * Minimal Example:
 *
 *     <FlatList
 *       data={[{key: 'a'}, {key: 'b'}]}
 *       renderItem={({item}) => <Text>{item.key}</Text>}
 *     />
 *
 * More complex, multi-select example demonstrating `PureComponent` usage for perf optimization and avoiding bugs.
 *
 * - By binding the `onPressItem` handler, the props will remain `===` and `PureComponent` will
 *   prevent wasteful re-renders unless the actual `id`, `selected`, or `title` props change, even
 *   if the components rendered in `MyListItem` did not have such optimizations.
 * - By passing `extraData={this.state}` to `FlatList` we make sure `FlatList` itself will re-render
 *   when the `state.selected` changes. Without setting this prop, `FlatList` would not know it
 *   needs to re-render any items because it is also a `PureComponent` and the prop comparison will
 *   not show any changes.
 * - `keyExtractor` tells the list to use the `id`s for the react keys instead of the default `key` property.
 *
 *
 *     class MyListItem extends React.PureComponent {
 *       _onPress = () => {
 *         this.props.onPressItem(this.props.id);
 *       };
 *
 *       render() {
 *         const textColor = this.props.selected ? "red" : "black";
 *         return (
 *           <Button onPress={this._onPress}>
 *             <Text style={{ color: textColor }}>
 *               {this.props.title}
 *             </Text>
 *           </Button>
 *         );
 *       }
 *     }
 *
 *     class MultiSelectList extends React.PureComponent {
 *       state = {selected: (new Map(): Map<string, boolean>)};
 *
 *       _keyExtractor = (item, index) => item.id;
 *
 *       _onPressItem = (id: string) => {
 *         // updater functions are preferred for transactional updates
 *         this.setState((state) => {
 *           // copy the map rather than modifying state.
 *           const selected = new Map(state.selected);
 *           selected.set(id, !selected.get(id)); // toggle
 *           return {selected};
 *         });
 *       };
 *
 *       _renderItem = ({item}) => (
 *         <MyListItem
 *           id={item.id}
 *           onPressItem={this._onPressItem}
 *           selected={!!this.state.selected.get(item.id)}
 *           title={item.title}
 *         />
 *       );
 *
 *       render() {
 *         return (
 *           <FlatList
 *             data={this.props.data}
 *             extraData={this.state}
 *             keyExtractor={this._keyExtractor}
 *             renderItem={this._renderItem}
 *           />
 *         );
 *       }
 *     }
 *
 * This is a convenience wrapper around [`<VirtualizedList>`](docs/virtualizedlist.html),
 * and thus inherits its props (as well as those of `ScrollView`) that aren't explicitly listed
 * here, along with the following caveats:
 *
 * - Internal state is not preserved when content scrolls out of the render window. Make sure all
 *   your data is captured in the item data or external stores like Flux, Redux, or Relay.
 * - This is a `PureComponent` which means that it will not re-render if `props` remain shallow-
 *   equal. Make sure that everything your `renderItem` function depends on is passed as a prop
 *   (e.g. `extraData`) that is not `===` after updates, otherwise your UI may not update on
 *   changes. This includes the `data` prop and parent component state.
 * - In order to constrain memory and enable smooth scrolling, content is rendered asynchronously
 *   offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see
 *   blank content. This is a tradeoff that can be adjusted to suit the needs of each application,
 *   and we are working on improving it behind the scenes.
 * - By default, the list looks for a `key` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 */
class FlatList<ItemT> extends React.PureComponent<Props<ItemT>> {
  static defaultProps = {
    ...RN.FlatList.defaultProps,
  };

  /**
   * Scrolls to the end of the content. May be janky without `getItemLayout` prop.
   */
  scrollToEnd() {
    if (this._listRef) {
      this._listRef.scrollToEnd();
    }
  }

  /**
   * Scrolls to the item at the specified index such that it is positioned in the viewable area
   * such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the
   * middle. `viewOffset` is a fixed number of pixels to offset the final target position.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  scrollToIndex(params: {
    index: number,
    viewOffset?: number,
    viewPosition?: number,
  }) {
    if (this._listRef) {
      this._listRef.scrollToIndex(params);
    }
  }

  /**
   * Requires linear scan through data - use `scrollToIndex` instead if possible.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  scrollToItem(params: { item: ItemT, viewPosition?: number }) {
    if (this._listRef) {
      this._listRef.scrollToItem(params);
    }
  }

  /**
   * Scroll to a specific content pixel offset in the list.
   */
  scrollToOffset(params: { offset: number }) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  }

  setNativeProps = (props: Object) => {
    if (this._listRef) {
      this._listRef.setNativeProps(props);
    }
  };

  render() {
    const {
      accessibilityLabel,
      data,
      extraData,
      getItem,
      getItemCount,
      getItemLayout,
      horizontal,
      initialNumToRender,
      initialScrollIndex,
      inverted,
      ItemSeparatorComponent,
      keyExtractor,
      ListEmptyComponent,
      ListFooterComponent,
      ListHeaderComponent,
      maxToRenderPerBatch,
      onContentSizeChange,
      onEndReached,
      onEndReachedThreshold,
      onLayout,
      onScroll,
      renderItem,
      scrollEventThrottle,
      style,
      testID,
      updateCellsBatchingPeriod,
      windowSize,
    } = this.props;

    const styleProps = {
      style,
    };

    const props = {
      accessibilityLabel,
      data,
      extraData,
      getItem,
      getItemCount,
      getItemLayout,
      horizontal,
      initialNumToRender,
      initialScrollIndex,
      inverted,
      ItemSeparatorComponent,
      keyExtractor,
      ListEmptyComponent,
      ListFooterComponent,
      ListHeaderComponent,
      maxToRenderPerBatch,
      onContentSizeChange,
      onEndReached,
      onEndReachedThreshold,
      onLayout,
      onScroll,
      ref: this._captureRef,
      renderItem,
      scrollEventThrottle,
      testID,
      updateCellsBatchingPeriod,
      windowSize,
    };

    return <RN.FlatList {...styleProps} {...props} />;
  }

  _listRef: null | RN.FlatList;

  _captureRef = (ref: null | RN.FlatList) => {
    this._listRef = ref;
  };
}

export default FlatList;
