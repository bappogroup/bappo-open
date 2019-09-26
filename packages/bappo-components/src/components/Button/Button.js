// @flow

import TouchableView from '../../primitives/TouchableView';
import createButton from './createButton';

export default createButton(TouchableView, {
  activeOpacity: 1,
});
