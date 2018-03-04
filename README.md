# bappo-components

Cross-platform React components for building Bappo apps

## Installation
```sh
npm i --save bappo-components
```

## Usage
```jsx
import React from 'react';
import { styled, Text, View } from 'bappo-components';

class MyComponent extends React.Component {
  render() {
    return (
      <Container>
        <Text>Hello World</Text>
      </Container>
    );
  }
}

const Container = styled(View)`
  flex: 1;
  background-color: white;
`;
```

## Using built-in Icon components
### Web (with webpack)
In webpack config file, use url-loader or file-loader to handle ttf files:
```js
{
  test: /\.ttf$/,
  loader: 'url-loader',
  include: path.resolve(__dirname, 'node_modules/bappo-components'), // path to bappo-components
}
```

Then in your JavaScript entry point, inject a style tag:
```js
import fontAwesome from 'bappo-components/fonts/FontAwesome.ttf';
const fontStyles = `@font-face { src:url(${fontAwesome});font-family: FontAwesome; }`;

// create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = fontStyles;
} else {
  style.appendChild(document.createTextNode(fontStyles));
}

// inject stylesheet
document.head.appendChild(style);
```

### iOS
* Browse to `node_modules/bappo-components` and drag the folder `fonts` to your project in Xcode. **Make sure your app is checked under "Add to targets" and that "Create groups" is checked**.
* Edit `Info.plist` and add a property called **Fonts provided by application** (or `UIAppFonts` if Xcode won't autocomplete/not using Xcode) and type in the files you just added.
*Note: you need to recompile your project after adding new fonts, also ensure that they also appear under __Copy Bundle Resources__ in __Build Phases__.*

### Android
Edit `android/app/build.gradle` ( NOT `android/build.gradle` ) and add the following:
```gradle
apply from: "../../node_modules/bappo-components/fonts.gradle"
```
To customize the files being copied, add the following instead:
```gradle
project.ext.vectoricons: [
    iconFontNames: ["FontAwesome.ttf"] // Name of the font files you want to copy
]
apply from: "../../node_modules/bappo-components/fonts.gradle"
```

## Credits
* This library is inspired by [ReactXP](https://github.com/Microsoft/reactxp) and [React Primitives](https://github.com/lelandrichardson/react-primitives).
* This library's built-in Icon components are inspired by [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons).
