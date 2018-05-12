/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VirtualizedList
 * @flow
 * @format
 */

/* eslint-disable react/no-multi-comp */

import * as React from 'react';
import invariant from 'fbjs/lib/invariant';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import styled, { css } from 'styled-components';
import ScrollView from '../../ScrollView';
import View from '../../View';
import Batchinator from './Batchinator';
import FillRateHelper from './FillRateHelper';
import { computeWindowedRenderLimits } from './VirtualizeUtils';

type Item = any;

export type renderItemType = (info: any) => ?React.Element<any>;

type RequiredProps = {
  renderItem: renderItemType,
  /**
   * The default accessor functions assume this is an Array<{key: string}> but you can override
   * getItem, getItemCount, and keyExtractor to handle any type of index-based data.
   */
  data?: any,
  /**
   * A generic accessor for extracting an item from any sort of data blob.
   */
  getItem: (data: any, index: number) => ?Item,
  /**
   * Determines how many items are in the data blob.
   */
  getItemCount: (data: any) => number,
};
type OptionalProps = {
  /**
   * `debug` will turn on extra logging and visual overlays to aid with debugging both usage and
   * implementation, but with a significant perf hit.
   */
  debug?: ?boolean,
  /**
   * A marker property for telling the list to re-render (since it implements `PureComponent`). If
   * any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the
   * `data` prop, stick it here and treat it immutably.
   */
  extraData?: any,
  getItemLayout?: (
    data: any,
    index: number,
  ) => { length: number, offset: number, index: number }, // e.g. height, y
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
  keyExtractor: (item: Item, index: number) => string,
  /**
   * Each cell is rendered using this element. Can be a React Component Class,
   * or a render function. Defaults to using View.
   */
  CellRendererComponent?: ?React.ComponentType<any>,
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
  onEndReached?: ?(info: { distanceFromEnd: number }) => void,
  onEndReachedThreshold?: ?number, // units of visible length
  onLayout?: ?Function,
  /**
   * Used to handle failures when scrolling to an index that has not been measured yet. Recommended
   * action is to either compute your own offset and `scrollTo` it, or scroll as far as possible and
   * then try again after more items have been rendered.
   */
  onScrollToIndexFailed?: ?(info: {
    index: number,
    highestMeasuredFrameIndex: number,
    averageItemLength: number,
  }) => void,
  /**
   * Set this when offset is needed for the loading indicator to show correctly.
   * @platform android
   */
  progressViewOffset?: number,
  /**
   * Render a custom scroll component, e.g. with a differently styled `RefreshControl`.
   */
  renderScrollComponent?: (props: Object) => React.Element<any>,
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
export type Props = RequiredProps & OptionalProps;

let _usedIndexForKey = false;

type State = { first: number, last: number };

/**
 * Base implementation for the more convenient [`<FlatList>`](/react-native/docs/flatlist.html)
 * and [`<SectionList>`](/react-native/docs/sectionlist.html) components, which are also better
 * documented. In general, this should only really be used if you need more flexibility than
 * `FlatList` provides, e.g. for use with immutable data instead of plain arrays.
 *
 * Virtualization massively improves memory consumption and performance of large lists by
 * maintaining a finite render window of active items and replacing all items outside of the render
 * window with appropriately sized blank space. The window adapts to scrolling behavior, and items
 * are rendered incrementally with low-pri (after any running interactions) if they are far from the
 * visible area, or with hi-pri otherwise to minimize the potential of seeing blank space.
 *
 * Some caveats:
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
 *
 */
class VirtualizedList extends React.PureComponent<Props, State> {
  props: Props;

  // scrollToEnd may be janky without getItemLayout prop
  scrollToEnd = () => {
    const veryLast = this.props.getItemCount(this.props.data) - 1;
    const frame = this._getFrameMetricsApprox(veryLast);
    let offset = Math.max(
      0,
      frame.offset +
        frame.length +
        this._footerLength -
        this._scrollMetrics.visibleLength,
    );
    if (this.props.inverted) {
      offset =
        this._scrollMetrics.contentLength -
        this._scrollMetrics.visibleLength -
        offset;
    }
    this._scrollRef &&
      this._scrollRef.scrollTo(
        this.props.horizontal ? { x: offset } : { y: offset },
      );
  };

  // scrollToIndex may be janky without getItemLayout prop
  scrollToIndex = (params: {
    index: number,
    viewOffset?: number,
    viewPosition?: number,
  }) => {
    const {
      data,
      horizontal,
      getItemCount,
      getItemLayout,
      inverted,
      onScrollToIndexFailed,
    } = this.props;
    const { index, viewOffset, viewPosition } = params;
    const count = getItemCount(data);
    invariant(
      index >= 0 && index < count,
      `scrollToIndex out of range: ${index} vs ${count - 1}`,
    );
    if (!getItemLayout && index > this._highestMeasuredFrameIndex) {
      invariant(
        !!onScrollToIndexFailed,
        'scrollToIndex should be used in conjunction with getItemLayout or onScrollToIndexFailed, ' +
          'otherwise there is no way to know the location of offscreen indices or handle failures.',
      );
      onScrollToIndexFailed({
        averageItemLength: this._averageCellLength,
        highestMeasuredFrameIndex: this._highestMeasuredFrameIndex,
        index,
      });
      return;
    }
    const frame = this._getFrameMetricsApprox(index);
    let offset =
      Math.max(
        0,
        frame.offset -
          (viewPosition || 0) *
            (this._scrollMetrics.visibleLength - frame.length),
      ) - (viewOffset || 0);
    if (inverted) {
      offset =
        this._scrollMetrics.contentLength -
        this._scrollMetrics.visibleLength -
        offset;
    }
    this._scrollRef &&
      this._scrollRef.scrollTo(horizontal ? { x: offset } : { y: offset });
  };

  // scrollToItem may be janky without getItemLayout prop. Required linear scan through items -
  // use scrollToIndex instead if possible.
  scrollToItem = (params: { item: Item, viewPosition?: number }) => {
    const { item } = params;
    const { data, getItem, getItemCount } = this.props;
    const itemCount = getItemCount(data);
    for (let index = 0; index < itemCount; index++) {
      if (getItem(data, index) === item) {
        this.scrollToIndex({ ...params, index });
        break;
      }
    }
  };

  /**
   * Scroll to a specific content pixel offset in the list.
   *
   * Param `offset` expects the offset to scroll to.
   * In case of `horizontal` is true, the offset is the x-value,
   * in any other case the offset is the y-value.
   */
  scrollToOffset = (params: { offset: number }) => {
    const { offset } = params;
    this._scrollRef &&
      this._scrollRef.scrollTo(
        this.props.horizontal ? { x: offset } : { y: offset },
      );
  };

  static defaultProps = {
    disableVirtualization: false,
    horizontal: false,
    initialNumToRender: 10,
    keyExtractor: (item: Item, index: number) => {
      if (item.key != null) {
        return item.key;
      }
      _usedIndexForKey = true;
      return String(index);
    },
    maxToRenderPerBatch: 10,
    onEndReachedThreshold: 2, // multiples of length
    scrollEventThrottle: 50,
    updateCellsBatchingPeriod: 50,
    windowSize: 21, // multiples of length
  };

  static contextTypes = {
    virtualizedList: PropTypes.shape({
      horizontal: PropTypes.bool,
    }),
  };

  static childContextTypes = {
    virtualizedList: PropTypes.shape({
      horizontal: PropTypes.bool,
    }),
  };

  getChildContext() {
    return {
      virtualizedList: {
        horizontal: this.props.horizontal,
        // TODO: support nested virtualization and onViewableItemsChanged
      },
    };
  }

  state: State;

  constructor(props: Props, context: Object) {
    super(props, context);

    this._fillRateHelper = new FillRateHelper(this._getFrameMetrics);
    this._updateCellsToRenderBatcher = new Batchinator(
      this._updateCellsToRender,
      this.props.updateCellsBatchingPeriod,
    );

    this.state = {
      first: this.props.initialScrollIndex || 0,
      last:
        Math.min(
          this.props.getItemCount(this.props.data),
          (this.props.initialScrollIndex || 0) + this.props.initialNumToRender,
        ) - 1,
    };
  }

  componentDidMount() {
    const { initialScrollIndex, inverted } = this.props;

    if (initialScrollIndex) {
      this._initialScrollIndexTimeout = setTimeout(
        () =>
          this.scrollToIndex({
            index: initialScrollIndex,
          }),
        0,
      );
    } else if (inverted) {
      this._initialScrollIndexTimeout = setTimeout(() => {
        const scrollableNode = findDOMNode(this._scrollRef);
        if (scrollableNode) {
          // $FlowFixMe
          scrollableNode.scrollTop = scrollableNode.scrollHeight;
        }
      }, 0);
    }
  }

  componentWillUnmount() {
    this._updateCellsToRenderBatcher.dispose();
    this._fillRateHelper.deactivateAndFlush();
    clearTimeout(this._initialScrollIndexTimeout);
  }

  componentWillReceiveProps(newProps: Props) {
    const { data, extraData, getItemCount, maxToRenderPerBatch } = newProps;
    // first and last could be stale (e.g. if a new, shorter items props is passed in), so we make
    // sure we're rendering a reasonable range here.
    this.setState({
      first: Math.max(
        0,
        Math.min(
          this.state.first,
          getItemCount(data) - 1 - maxToRenderPerBatch,
        ),
      ),
      last: Math.max(0, Math.min(this.state.last, getItemCount(data) - 1)),
    });
    if (data !== this.props.data || extraData !== this.props.extraData) {
      this._hasDataChangedSinceEndReached = true;
    }
  }

  _pushCells = (
    cells: Array<Object>,
    stickyHeaderIndices: Array<number>,
    stickyIndicesFromProps: Set<number>,
    first: number,
    last: number,
  ) => {
    const {
      CellRendererComponent,
      ItemSeparatorComponent,
      data,
      getItem,
      getItemCount,
      horizontal,
      inverted,
      keyExtractor,
    } = this.props;
    const stickyOffset = this.props.ListHeaderComponent ? 1 : 0;
    const end = getItemCount(data) - 1;
    let prevCellKey;
    last = Math.min(end, last);
    for (let ii = first; ii <= last; ii++) {
      const item = getItem(data, ii);
      const key = keyExtractor(item, ii);
      if (stickyIndicesFromProps.has(ii + stickyOffset)) {
        stickyHeaderIndices.push(cells.length);
      }
      cells.push(
        <CellRenderer
          CellRendererComponent={CellRendererComponent}
          ItemSeparatorComponent={ii < end ? ItemSeparatorComponent : undefined}
          cellKey={key}
          fillRateHelper={this._fillRateHelper}
          horizontal={horizontal}
          index={ii}
          inverted={inverted}
          item={item}
          key={key}
          prevCellKey={prevCellKey}
          onUpdateSeparators={this._onUpdateSeparators}
          onLayout={e => this._onCellLayout(e, key, ii)}
          onUnmount={this._onCellUnmount}
          parentProps={this.props}
          ref={ref => {
            this._cellRefs[key] = ref;
          }}
        />,
      );
      prevCellKey = key;
    }
  };

  _onUpdateSeparators = (keys: Array<?string>, newProps: Object) => {
    keys.forEach(key => {
      const ref = key != null && this._cellRefs[key];
      ref && ref.updateSeparatorProps(newProps);
    });
  };

  _isVirtualizationDisabled = (): boolean => {
    return this._isNestedWithSameOrientation();
  };

  _isNestedWithSameOrientation = (): boolean => {
    const nestedContext = this.context.virtualizedList;
    return !!(
      nestedContext && !!nestedContext.horizontal === !!this.props.horizontal
    );
  };

  render() {
    const {
      ListEmptyComponent,
      ListFooterComponent,
      ListHeaderComponent,
    } = this.props;
    const { data, horizontal, inverted } = this.props;
    const isVirtualizationDisabled = this._isVirtualizationDisabled();
    const cells = [];
    const stickyIndicesFromProps = new Set(this.props.stickyHeaderIndices);
    const stickyHeaderIndices = [];
    if (ListHeaderComponent) {
      if (stickyIndicesFromProps.has(0)) {
        stickyHeaderIndices.push(0);
      }
      const element = React.isValidElement(ListHeaderComponent) ? (
        ListHeaderComponent
      ) : (
        // $FlowFixMe
        <ListHeaderComponent />
      );
      cells.push(
        <InvertableView
          key="$header"
          onLayout={this._onLayoutHeader}
          horizontal={horizontal}
          inverted={inverted}
        >
          {element}
        </InvertableView>,
      );
    }
    const itemCount = this.props.getItemCount(data);
    if (itemCount > 0) {
      _usedIndexForKey = false;
      const spacerKey = !horizontal ? 'height' : 'width';
      const lastInitialIndex = this.props.initialScrollIndex
        ? -1
        : this.props.initialNumToRender - 1;
      const { first, last } = this.state;
      this._pushCells(
        cells,
        stickyHeaderIndices,
        stickyIndicesFromProps,
        0,
        lastInitialIndex,
      );
      const firstAfterInitial = Math.max(lastInitialIndex + 1, first);
      if (!isVirtualizationDisabled && first > lastInitialIndex + 1) {
        let insertedStickySpacer = false;
        if (stickyIndicesFromProps.size > 0) {
          const stickyOffset = ListHeaderComponent ? 1 : 0;
          // See if there are any sticky headers in the virtualized space that we need to render.
          for (let ii = firstAfterInitial - 1; ii > lastInitialIndex; ii--) {
            if (stickyIndicesFromProps.has(ii + stickyOffset)) {
              const initBlock = this._getFrameMetricsApprox(lastInitialIndex);
              const stickyBlock = this._getFrameMetricsApprox(ii);
              const leadSpace =
                stickyBlock.offset - (initBlock.offset + initBlock.length);
              cells.push(
                <View key="$sticky_lead" style={{ [spacerKey]: leadSpace }} />,
              );
              this._pushCells(
                cells,
                stickyHeaderIndices,
                stickyIndicesFromProps,
                ii,
                ii,
              );
              const trailSpace =
                this._getFrameMetricsApprox(first).offset -
                (stickyBlock.offset + stickyBlock.length);
              cells.push(
                <View
                  key="$sticky_trail"
                  style={{ [spacerKey]: trailSpace }}
                />,
              );
              insertedStickySpacer = true;
              break;
            }
          }
        }
        if (!insertedStickySpacer) {
          const initBlock = this._getFrameMetricsApprox(lastInitialIndex);
          const firstSpace =
            this._getFrameMetricsApprox(first).offset -
            (initBlock.offset + initBlock.length);
          cells.push(
            <View key="$lead_spacer" style={{ [spacerKey]: firstSpace }} />,
          );
        }
      }
      this._pushCells(
        cells,
        stickyHeaderIndices,
        stickyIndicesFromProps,
        firstAfterInitial,
        last,
      );
      if (!this._hasWarned.keys && _usedIndexForKey) {
        console.warn(
          'VirtualizedList: missing keys for items, make sure to specify a key property on each ' +
            'item or provide a custom keyExtractor.',
        );
        this._hasWarned.keys = true;
      }
      if (!isVirtualizationDisabled && last < itemCount - 1) {
        const lastFrame = this._getFrameMetricsApprox(last);
        // Without getItemLayout, we limit our tail spacer to the _highestMeasuredFrameIndex to
        // prevent the user for hyperscrolling into un-measured area because otherwise content will
        // likely jump around as it renders in above the viewport.
        const end = this.props.getItemLayout
          ? itemCount - 1
          : Math.min(itemCount - 1, this._highestMeasuredFrameIndex);
        const endFrame = this._getFrameMetricsApprox(end);
        const tailSpacerLength =
          endFrame.offset +
          endFrame.length -
          (lastFrame.offset + lastFrame.length);
        cells.push(
          <View key="$tail_spacer" style={{ [spacerKey]: tailSpacerLength }} />,
        );
      }
    } else if (ListEmptyComponent) {
      const element = React.isValidElement(ListEmptyComponent) ? (
        ListEmptyComponent
      ) : (
        // $FlowFixMe
        <ListEmptyComponent />
      );
      cells.push(
        <InvertableView
          key="$empty"
          onLayout={this._onLayoutEmpty}
          horizontal={horizontal}
          inverted={inverted}
        >
          {element}
        </InvertableView>,
      );
    }
    if (ListFooterComponent) {
      const element = React.isValidElement(ListFooterComponent) ? (
        ListFooterComponent
      ) : (
        // $FlowFixMe
        <ListFooterComponent />
      );
      cells.push(
        <InvertableView
          key="$footer"
          onLayout={this._onLayoutFooter}
          horizontal={horizontal}
          inverted={inverted}
        >
          {element}
        </InvertableView>,
      );
    }
    const scrollProps = {
      ...this.props,
      innerRef: this._captureScrollRef,
      onContentSizeChange: this._onContentSizeChange,
      onLayout: this._onLayout,
      onScroll: this._onScroll,
      scrollEventThrottle: this.props.scrollEventThrottle, // TODO: Android support
      stickyHeaderIndices,
    };
    const ret = <StyledScrollView {...scrollProps}>{cells}</StyledScrollView>;
    if (this.props.debug) {
      return (
        <View style={{ flex: 1 }}>
          {ret}
          {this._renderDebugOverlay()}
        </View>
      );
    }
    return ret;
  }

  componentDidUpdate() {
    this._scheduleCellsToRenderUpdate();
  }

  _averageCellLength = 0;
  _cellRefs = {};
  _hasDataChangedSinceEndReached = true;
  _hasWarned = {};
  _highestMeasuredFrameIndex = 0;
  _headerLength = 0;
  _initialScrollIndexTimeout = 0;
  _fillRateHelper: FillRateHelper;
  _frames = {};
  _footerLength = 0;
  _scrollMetrics = {
    contentLength: 0,
    dOffset: 0,
    dt: 10,
    offset: 0,
    timestamp: 0,
    velocity: 0,
    visibleLength: 0,
  };
  _scrollRef = (null: any);
  _sentEndForContentLength = 0;
  _totalCellLength = 0;
  _totalCellsMeasured = 0;
  _updateCellsToRenderBatcher: Batchinator;

  _captureScrollRef = ref => {
    this._scrollRef = ref;
  };

  _computeBlankness = () => {
    this._fillRateHelper.computeBlankness(
      this.props,
      this.state,
      this._scrollMetrics,
    );
  };

  _defaultRenderScrollComponent = props => {
    if (this._isNestedWithSameOrientation()) {
      return <View {...props} />;
    }
    return <StyledScrollView {...props} />;
  };

  _onCellLayout = (e, cellKey, index) => {
    const layout = e.nativeEvent.layout;
    const length = this._selectLength(layout);
    let offset = this._selectOffset(layout);
    if (this.props.inverted) {
      offset = length - offset;
    }
    const next = {
      offset,
      length,
      index,
      inLayout: true,
    };
    const curr = this._frames[cellKey];
    if (
      !curr ||
      next.offset !== curr.offset ||
      next.length !== curr.length ||
      index !== curr.index
    ) {
      this._totalCellLength += next.length - (curr ? curr.length : 0);
      this._totalCellsMeasured += curr ? 0 : 1;
      this._averageCellLength =
        this._totalCellLength / this._totalCellsMeasured;
      this._frames[cellKey] = next;
      this._highestMeasuredFrameIndex = Math.max(
        this._highestMeasuredFrameIndex,
        index,
      );
      this._scheduleCellsToRenderUpdate();
    } else {
      this._frames[cellKey].inLayout = true;
    }
    this._computeBlankness();
  };

  _onCellUnmount = (cellKey: string) => {
    const curr = this._frames[cellKey];
    if (curr) {
      this._frames[cellKey] = { ...curr, inLayout: false };
    }
  };

  _onLayout = (e: Object) => {
    this._scrollMetrics.visibleLength = this._selectLength(
      e.nativeEvent.layout,
    );
    this.props.onLayout && this.props.onLayout(e);
    this._scheduleCellsToRenderUpdate();
    this._maybeCallOnEndReached();
  };

  _onLayoutEmpty = e => {
    this.props.onLayout && this.props.onLayout(e);
  };

  _onLayoutFooter = e => {
    this._footerLength = this._selectLength(e.nativeEvent.layout);
  };

  _onLayoutHeader = e => {
    this._headerLength = this._selectLength(e.nativeEvent.layout);
  };

  _renderDebugOverlay = () => {
    const normalize =
      this._scrollMetrics.visibleLength / this._scrollMetrics.contentLength;
    const framesInLayout = [];
    const itemCount = this.props.getItemCount(this.props.data);
    for (let ii = 0; ii < itemCount; ii++) {
      const frame = this._getFrameMetricsApprox(ii);
      if (frame.inLayout) {
        framesInLayout.push(frame);
      }
    }
    const windowTop = this._getFrameMetricsApprox(this.state.first).offset;
    const frameLast = this._getFrameMetricsApprox(this.state.last);
    const windowLen = frameLast.offset + frameLast.length - windowTop;
    const visTop = this._scrollMetrics.offset;
    const visLen = this._scrollMetrics.visibleLength;
    const baseStyle = { position: 'absolute', top: 0, right: 0 };
    return (
      <View
        style={{
          ...baseStyle,
          bottom: 0,
          width: 20,
          borderColor: 'blue',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        {framesInLayout.map((f, ii) => (
          <View
            key={'f' + ii}
            style={{
              ...baseStyle,
              left: 0,
              top: f.offset * normalize,
              height: f.length * normalize,
              backgroundColor: 'orange',
            }}
          />
        ))}
        <View
          style={{
            ...baseStyle,
            left: 0,
            top: windowTop * normalize,
            height: windowLen * normalize,
            borderColor: 'green',
            borderStyle: 'solid',
            borderWidth: 2,
          }}
        />
        <View
          style={{
            ...baseStyle,
            left: 0,
            top: visTop * normalize,
            height: visLen * normalize,
            borderColor: 'red',
            borderStyle: 'solid',
            borderWidth: 2,
          }}
        />
      </View>
    );
  };

  _selectLength = (metrics: { height: number, width: number }): number => {
    return !this.props.horizontal ? metrics.height : metrics.width;
  };

  _selectOffset = (metrics: { x: number, y: number }): number => {
    return !this.props.horizontal ? metrics.y : metrics.x;
  };

  _maybeCallOnEndReached = () => {
    const {
      data,
      getItemCount,
      onEndReached,
      onEndReachedThreshold,
    } = this.props;
    const { contentLength, visibleLength, offset } = this._scrollMetrics;
    const distanceFromEnd = contentLength - visibleLength - offset;
    if (
      onEndReached &&
      this.state.last === getItemCount(data) - 1 &&
      distanceFromEnd < onEndReachedThreshold * visibleLength &&
      (this._hasDataChangedSinceEndReached ||
        this._scrollMetrics.contentLength !== this._sentEndForContentLength)
    ) {
      // Only call onEndReached once for a given dataset + content length.
      this._hasDataChangedSinceEndReached = false;
      this._sentEndForContentLength = this._scrollMetrics.contentLength;
      onEndReached({ distanceFromEnd });
    }
  };

  _onContentSizeChange = (width: number, height: number) => {
    if (this.props.onContentSizeChange) {
      this.props.onContentSizeChange(width, height);
    }
    this._scrollMetrics.contentLength = this._selectLength({ height, width });
    this._scheduleCellsToRenderUpdate();
    this._maybeCallOnEndReached();
  };

  _onScroll = (e: Object) => {
    if (this.props.onScroll) {
      this.props.onScroll(e);
    }
    const timestamp = e.timeStamp;
    const visibleLength = this._selectLength(e.nativeEvent.layoutMeasurement);
    const contentLength = this._selectLength(e.nativeEvent.contentSize);
    let offset = this._selectOffset(e.nativeEvent.contentOffset);
    if (this.props.inverted) {
      offset = contentLength - offset;
    }
    const dt = this._scrollMetrics.timestamp
      ? Math.max(1, timestamp - this._scrollMetrics.timestamp)
      : 1;
    if (
      dt > 500 &&
      this._scrollMetrics.dt > 500 &&
      contentLength > 5 * visibleLength &&
      !this._hasWarned.perf
    ) {
      console.log(
        'VirtualizedList: You have a large list that is slow to update - make sure your ' +
          'renderItem function renders components that follow React performance best practices ' +
          'like PureComponent, shouldComponentUpdate, etc.',
        { dt, prevDt: this._scrollMetrics.dt, contentLength },
      );
      this._hasWarned.perf = true;
    }
    const dOffset = offset - this._scrollMetrics.offset;
    const velocity = dOffset / dt;
    this._scrollMetrics = {
      contentLength,
      dt,
      dOffset,
      offset,
      timestamp,
      velocity,
      visibleLength,
    };
    if (!this.props) {
      return;
    }
    this._maybeCallOnEndReached();
    if (velocity !== 0) {
      this._fillRateHelper.activate();
    }
    this._computeBlankness();
    this._scheduleCellsToRenderUpdate();
  };

  _scheduleCellsToRenderUpdate = () => {
    const { first, last } = this.state;
    const { offset, visibleLength, velocity } = this._scrollMetrics;
    const itemCount = this.props.getItemCount(this.props.data);
    let hiPri = false;
    if (first > 0 || last < itemCount - 1) {
      const distTop = offset - this._getFrameMetricsApprox(first).offset;
      const distBottom =
        this._getFrameMetricsApprox(last).offset - (offset + visibleLength);
      const scrollingThreshold =
        this.props.onEndReachedThreshold * visibleLength / 2;
      hiPri =
        Math.min(distTop, distBottom) < 0 ||
        (velocity < -2 && distTop < scrollingThreshold) ||
        (velocity > 2 && distBottom < scrollingThreshold);
    }
    // Only trigger high-priority updates if we've actually rendered cells,
    // and with that size estimate, accurately compute how many cells we should render.
    // Otherwise, it would just render as many cells as it can (of zero dimension),
    // each time through attempting to render more (limited by maxToRenderPerBatch),
    // starving the renderer from actually laying out the objects and computing _averageCellLength.
    if (hiPri && this._averageCellLength) {
      // Don't worry about interactions when scrolling quickly; focus on filling content as fast
      // as possible.
      this._updateCellsToRenderBatcher.dispose({ abort: true });
      this._updateCellsToRender();
    } else {
      this._updateCellsToRenderBatcher.schedule();
    }
  };

  _updateCellsToRender = () => {
    const { data, getItemCount, onEndReachedThreshold } = this.props;
    const isVirtualizationDisabled = this._isVirtualizationDisabled();
    if (!data) {
      return;
    }
    this.setState(state => {
      let newState;
      if (!isVirtualizationDisabled) {
        // If we run this with bogus data, we'll force-render window {first: 0, last: 0},
        // and wipe out the initialNumToRender rendered elements.
        // So let's wait until the scroll view metrics have been set up. And until then,
        // we will trust the initialNumToRender suggestion
        if (this._scrollMetrics.visibleLength) {
          // If we have a non-zero initialScrollIndex and run this before we've scrolled,
          // we'll wipe out the initialNumToRender rendered elements starting at initialScrollIndex.
          // So let's wait until we've scrolled the view to the right place. And until then,
          // we will trust the initialScrollIndex suggestion.
          if (!this.props.initialScrollIndex || this._scrollMetrics.offset) {
            newState = computeWindowedRenderLimits(
              this.props,
              state,
              this._getFrameMetricsApprox,
              this._scrollMetrics,
            );
          }
        }
      } else {
        const { contentLength, offset, visibleLength } = this._scrollMetrics;
        const distanceFromEnd = contentLength - visibleLength - offset;
        const renderAhead =
          distanceFromEnd < onEndReachedThreshold * visibleLength
            ? this.props.maxToRenderPerBatch
            : 0;
        newState = {
          first: 0,
          last: Math.min(state.last + renderAhead, getItemCount(data) - 1),
        };
      }
      return newState;
    });
  };

  _getFrameMetricsApprox = (
    index: number,
  ): { length: number, offset: number } => {
    const frame = this._getFrameMetrics(index);
    if (frame && frame.index === index) {
      // check for invalid frames due to row re-ordering
      return frame;
    }
    const { getItemLayout } = this.props;
    invariant(
      !getItemLayout,
      'Should not have to estimate frames when a measurement metrics function is provided',
    );
    return {
      length: this._averageCellLength,
      offset: this._averageCellLength * index,
    };
  };

  _getFrameMetrics = (
    index: number,
  ): ?{
    length: number,
    offset: number,
    index: number,
    inLayout?: boolean,
  } => {
    const {
      data,
      getItem,
      getItemCount,
      getItemLayout,
      keyExtractor,
    } = this.props;
    invariant(
      getItemCount(data) > index,
      'Tried to get frame for out of range index ' + index,
    );
    const item = getItem(data, index);
    let frame = item && this._frames[keyExtractor(item, index)];
    if (!frame || frame.index !== index) {
      if (getItemLayout) {
        frame = getItemLayout(data, index);
        if (process.env !== 'production') {
          const frameType = PropTypes.shape({
            length: PropTypes.number.isRequired,
            offset: PropTypes.number.isRequired,
            index: PropTypes.number.isRequired,
          }).isRequired;
          PropTypes.checkPropTypes(
            { frame: frameType },
            { frame },
            'frame',
            'VirtualizedList.getItemLayout',
          );
        }
      }
    }
    return frame;
  };
}

class CellRenderer extends React.Component<
  {
    CellRendererComponent?: ?React.ComponentType<any>,
    ItemSeparatorComponent: ?React.ComponentType<*>,
    cellKey: string,
    fillRateHelper: FillRateHelper,
    horizontal: ?boolean,
    index: number,
    inverted: ?boolean,
    item: Item,
    onLayout: (event: Object) => void, // This is extracted by ScrollViewStickyHeader
    onUnmount: (cellKey: string) => void,
    onUpdateSeparators: (cellKeys: Array<?string>, props: Object) => void,
    parentProps: {
      getItemLayout?: ?Function,
      renderItem: renderItemType,
    },
    prevCellKey: ?string,
  },
  $FlowFixMeState,
> {
  state = {
    separatorProps: {
      highlighted: false,
      leadingItem: this.props.item,
    },
  };

  // TODO: consider factoring separator stuff out of VirtualizedList into FlatList since it's not
  // reused by SectionList and we can keep VirtualizedList simpler.
  _separators = {
    highlight: () => {
      const { cellKey, prevCellKey } = this.props;
      this.props.onUpdateSeparators([cellKey, prevCellKey], {
        highlighted: true,
      });
    },
    unhighlight: () => {
      const { cellKey, prevCellKey } = this.props;
      this.props.onUpdateSeparators([cellKey, prevCellKey], {
        highlighted: false,
      });
    },
    updateProps: (select: 'leading' | 'trailing', newProps: Object) => {
      const { cellKey, prevCellKey } = this.props;
      this.props.onUpdateSeparators(
        [select === 'leading' ? prevCellKey : cellKey],
        newProps,
      );
    },
  };

  updateSeparatorProps(newProps: Object) {
    this.setState(state => ({
      separatorProps: { ...state.separatorProps, ...newProps },
    }));
  }

  componentWillUnmount() {
    this.props.onUnmount(this.props.cellKey);
  }

  render() {
    const {
      CellRendererComponent,
      ItemSeparatorComponent,
      fillRateHelper,
      horizontal,
      item,
      index,
      inverted,
      parentProps,
    } = this.props;
    const { renderItem, getItemLayout } = parentProps;
    invariant(renderItem, 'no renderItem!');
    const element = renderItem({
      item,
      index,
      separators: this._separators,
    });
    const onLayout =
      getItemLayout && !parentProps.debug && !fillRateHelper.enabled()
        ? undefined
        : this.props.onLayout;
    // NOTE: that when this is a sticky header, `onLayout` will get automatically extracted and
    // called explicitly by `ScrollViewStickyHeader`.
    const itemSeparator = ItemSeparatorComponent && (
      <ItemSeparatorComponent {...this.state.separatorProps} />
    );
    if (!CellRendererComponent) {
      return (
        <DefaultCellView
          horizontal={horizontal}
          inverted={inverted}
          onLayout={onLayout}
        >
          {element}
          {itemSeparator}
        </DefaultCellView>
      );
    }
    return (
      <CellRendererComponent {...this.props} onLayout={onLayout}>
        {element}
        {itemSeparator}
      </CellRendererComponent>
    );
  }
}

export default VirtualizedList;

const StyledScrollView = styled(ScrollView)`
  > div {
    ${({ horizontal, inverted }) =>
      inverted
        ? horizontal
          ? 'flex-direction: row-reverse;'
          : 'flex-direction: column-reverse;'
        : ''};
  }
`;

const inversionStyle = css`
  ${({ horizontal, inverted }) =>
    inverted
      ? horizontal
        ? 'transform: scaleX(-1);'
        : 'transform: scaleY(-1);'
      : ''};
`;

const DefaultCellView = styled(View)`
  ${({ horizontal, inverted }) =>
    inverted
      ? horizontal
        ? 'flex-direction: row-reverse;'
        : 'flex-direction: column-reverse;'
      : horizontal
        ? 'flex-direction: row;'
        : 'flex-direction: column;'};
`;

const InvertableView = styled(View)``;
