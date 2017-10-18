import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../ui-explorer';
import HeaderFooter from './examples/HeaderFooter';
import Minimal from './examples/Minimal';
import OnEndReached from './examples/OnEndReached';
import PropGetItemLayout from './examples/PropGetItemLayout';
import PropInitialScrollIndex from './examples/PropInitialScrollIndex';
import PropInverted from './examples/PropInverted';
import PropItemSeparatorComponent from './examples/PropItemSeparatorComponent';
import PropListEmptyComponent from './examples/PropListEmptyComponent';

const FlatListScreen = () => (
  <UIExplorer title="FlatList" url="1-components/FlatList">
    <Description>
      <AppText>
        A performant interface for rendering simple, flat lists.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="data"
        typeInfo="$ReadOnlyArray<ItemT>"
        description={
          <AppText>
            For simplicity, data is just a plain array. If you want to use something else, like an
            immutable list, use the underlying <Code>VirtualizedList</Code> directly.
          </AppText>
        }
      />

      <DocItem
        name="renderItem"
        typeInfo="(info: { item: ItemT, index: number }) => ?React.Element<any>"
        description={
          <AppText>
            Takes an item from <Code>data</Code> and renders it into the list.
          </AppText>
        }
      />

      <DocItem
        name="extraData?"
        typeInfo="any"
        description={
          <AppText>
            A marker property for telling the list to re-render (since it implements{' '}
            <Code>PureComponent</Code>). If any of your <Code>renderItem</Code>, Header, Footer,
            etc. functions depend on anything outside of the <Code>data</Code> prop, stick it here
            and treat it immutably.
          </AppText>
        }
      />

      <DocItem
        name="getItem?"
        typeInfo="?(data: Array<ItemT>, index: number) => ?ItemT"
        description="A generic accessor for extracting an item from any sort of data blob."
      />

      <DocItem
        name="getItemCount?"
        typeInfo="?(data: Array<ItemT>) => number"
        description="Determines how many items are in the data blob."
      />

      <DocItem
        name="getItemLayout?"
        typeInfo="?(data: Array<ItemT>, index: number) => {length: number, offset: number, index: number}"
        description={
          <AppText>
            An optional optimizations that let us skip measurement of dynamic content if you know
            the height of items a priori. <Code>getItemLayout</Code> is the most efficient, and is
            easy to use if you have fixed height items.
          </AppText>
        }
        example={{
          code: `
const data = Array.from({ length: 500 })
  .map((num, index) => ({
    key: index,
  }));
<FlatList
  data={data}
  getItemLayout={(_data, index) => ({
    length: 30,
    offset: 30 * index,
    index,
  })}
  renderItem={({ item }) => (
    <Text
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        height: 30,
      }}
    >
      {item.key}
    </Text>
  )}
/>
          `,
          render: () => <PropGetItemLayout />,
        }}
      />

      <DocItem
        name="initialNumToRender?"
        typeInfo="number"
        description={
          <AppText>
            How many items to render in the initial batch. This should be enough to fill the screen
            but not much more. Note these items will never be unmounted as part of the windowed
            rendering in order to improve perceived performance of scroll-to-top actions.
          </AppText>
        }
      />

      <DocItem
        name="initialScrollIndex?"
        typeInfo="number"
        description={
          <AppText>
            Instead of starting at the top with the first item, start at{' '}
            <Code>initialScrollIndex</Code>. This disables the "scroll to top" optimization that
            keeps the first <Code>initialNumToRender</Code> items always rendered and immediately
            renders the items starting at this initial index. Requires <Code>getItemLayout</Code> to
            be implemented.
          </AppText>
        }
        example={{
          code: `
const data = Array.from({ length: 500 })
  .map((num, index) => ({
    key: index,
  }));
<FlatList
  data={data}
  getItemLayout={(_data, index) => ({
    length: 30,
    offset: 30 * index,
    index,
  })}
  initialScrollIndex={50}
  renderItem={({ item }) => (
    <Text>{item.key}</Text>
  )}
/>
          `,
          render: () => <PropInitialScrollIndex />,
        }}
      />

      <DocItem
        name="inverted?"
        typeInfo="?boolean"
        description={
          <AppText>
            Reverses the direction of scroll. Requires <Code>getItemLayout</Code> to be implemented.
          </AppText>
        }
        example={{
          render: () => <PropInverted />,
        }}
      />

      <DocItem
        name="ItemSeparatorComponent?"
        typeInfo="?React.ComponentType<any>"
        description={
          <AppText>
            Rendered in between each item, but not at the top or bottom. By default,{' '}
            <Code>highlighted</Code> and <Code>leadingItem</Code> props are provided.
          </AppText>
        }
        example={{
          render: () => <PropItemSeparatorComponent />,
        }}
      />

      <DocItem
        name="keyExtractor?"
        typeInfo="(item: ItemT, index: number) => string"
        description={
          <AppText>
            Used to extract a unique key for a given item at the specified index. Key is used for
            caching and as the react key to track item re-ordering. The default extractor
            checks <Code>item.key</Code>, then falls back to using the index, like React does.
          </AppText>
        }
      />

      <DocItem
        name="ListEmptyComponent?"
        typeInfo="?(React.ComponentType<any> | React.Element<any>)"
        description={
          <AppText>
            Rendered when the list is empty. Can be a React Component Class, a render function, or
            a rendered element.
          </AppText>
        }
        example={{
          render: () => <PropListEmptyComponent />,
        }}
      />

      <DocItem
        name="ListFooterComponent?"
        typeInfo="?(React.ComponentType<any> | React.Element<any>)"
        description={
          <AppText>
            Rendered at the bottom of all the items. Can be a React Component Class, a render
            function, or a rendered element.
          </AppText>
        }
      />

      <DocItem
        name="ListHeaderComponent?"
        typeInfo="?(React.ComponentType<any> | React.Element<any>)"
        description={
          <AppText>
            Rendered at the top of all the items. Can be a React Component Class, a render
            function, or a rendered element.
          </AppText>
        }
      />

      <DocItem
        name="onContentSizeChange?"
        typeInfo="?(width: number, height: number) => void"
        description="Same as ScrollView"
      />

      <DocItem
        name="onEndReached?"
        typeInfo="?(info: {distanceFromEnd: number}) => void"
        description={
          <AppText>
            Called once when the scroll position gets within <Code>onEndReachedThreshold</Code> of
            the rendered content.
          </AppText>
        }
      />

      <DocItem
        name="onEndReachedThreshold?"
        typeInfo="number"
        description={
          <AppText>
            How far from the end (in units of visible length of the list) the bottom edge of the
            list must be from the end of the content to trigger the <Code>onEndReached</Code>
            callback. Thus a value of 0.5 will trigger <Code>onEndReached</Code> when the end of the
            content is within half the visible length of the list.
          </AppText>
        }
      />

      <DocItem
        name="onLayout?"
        typeInfo="?(event: ViewLayoutEvent) => void"
        description="Same as View"
      />

      <DocItem
        name="onScroll?"
        typeInfo="?(event: ScrollEvent) => void"
        description="Same as ScrollView"
      />

      <DocItem
        name="scrollEventThrottle?"
        typeInfo="number"
        description="Same as ScrollView"
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Minimal"
        example={{
          code: `
const data = Array.from({ length: 50 })
  .map((num, index) => ({
    key: index,
  }));
<FlatList
  data={data}
  renderItem={({ item }) => (
    <Text>{item.key}</Text>
  )}
/>
          `,
          render: () => <Minimal />,
        }}
      />

      <DocItem
        description="Header and Footer"
        example={{
          render: () => <HeaderFooter />,
        }}
      />

      <DocItem
        description="onEndReached and onEndReachedThreshold"
        example={{
          code: `
<FlatList
  data={data}
  onEndReached={() => Alert.alert('onEndReached fired!')}
  onEndReachedThreshold={0.5}
  renderItem={({ item }) => (
    <Text style={styles.row}>{item.key}</Text>
  )}
/>
          `,
          render: () => <OnEndReached />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('FlatList', FlatListScreen);
