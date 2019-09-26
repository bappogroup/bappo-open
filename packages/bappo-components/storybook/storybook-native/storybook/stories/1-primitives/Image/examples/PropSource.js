import React from 'react';
import { Image, Text, View } from 'bappo-components';
import sources from '../sources';

const ImageSourceExample = () => (
  <React.Fragment>
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.text}>JPEG</Text>
        <Image source={sources.small} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>PNG (base64)</Text>
        <Image source={sources.dataBase64Png} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Animated GIF</Text>
        <Image source={sources.animatedGif} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Progressive JPEG</Text>
        <Image source={sources.pjpeg} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Broken Image</Text>
        <Image source={sources.broken} style={styles.image} />
      </View>
      {/* <View style={styles.column}>
        <Text style={styles.text}>SVG (base64)</Text>
        <Image source={sources.dataBase64Svg} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>SVG (inline data)</Text>
        <Image source={sources.dataSvg} style={styles.image} />
      </View> */}
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

export default ImageSourceExample;
