import TouchableView from '../../primitives/TouchableView';
import createButton from './createButton';

export default createButton(TouchableView, ({ tooltip }) => {
  return {
    activeOpacity: 1,
    tooltip,
  };
});
