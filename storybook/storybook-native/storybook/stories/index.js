import { addDecorator } from '@storybook/react-native';
import centered from '../decorator-centered';

addDecorator(centered);

require('./1-primitives/ActivityIndicator/ActivityIndicatorScreen');
require('./1-primitives/FlatList/FlatListScreen');
require('./1-primitives/ScrollView/ScrollViewScreen');
require('./1-primitives/Switch/SwitchScreen');
require('./1-primitives/Text/TextScreen');
require('./1-primitives/TextInput/TextInputScreen');
require('./1-primitives/TouchableView/TouchableViewScreen');
require('./1-primitives/View/ViewScreen');

require('./2-components/DatePicker/DatePickerScreen');
require('./2-components/Icon/IconScreen');
require('./2-components/Form/FormScreen');
require('./2-components/Modal/ModalScreen');
require('./2-components/SelectField/SelectFieldScreen');
require('./2-components/TimePicker/TimePickerScreen');
