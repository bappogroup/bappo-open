import React from 'react';
import { Image, Text, View } from 'bappo-components';
import sources from '../sources';

const OrientationExample = () => (
  <React.Fragment>
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 1</Text>
        <Image source={sources.landscape1} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 2</Text>
        <Image source={sources.landscape2} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 3</Text>
        <Image source={sources.landscape3} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 4</Text>
        <Image source={sources.landscape4} style={styles.image} />
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 5</Text>
        <Image source={sources.landscape5} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 6</Text>
        <Image source={sources.landscape6} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 7</Text>
        <Image source={sources.landscape7} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Landscape 8</Text>
        <Image source={sources.landscape8} style={styles.image} />
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 1</Text>
        <Image source={sources.portrait1} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 2</Text>
        <Image source={sources.portrait2} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 3</Text>
        <Image source={sources.portrait3} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 4</Text>
        <Image source={sources.portrait4} style={styles.image} />
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 5</Text>
        <Image source={sources.portrait5} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 6</Text>
        <Image source={sources.portrait6} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 7</Text>
        <Image source={sources.portrait7} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Portrait 8</Text>
        <Image source={sources.portrait8} style={styles.image} />
      </View>
    </View>
  </React.Fragment>
);

const styles = {
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'flex-start',
    marginBottom: 16,
    marginLeft: 4,
    marginRight: 4,
  },
  text: {
    marginBottom: 8,
  },
  image: {
    borderWidth: 1,
    height: 120,
    width: 120,
  },
};

export default OrientationExample;
