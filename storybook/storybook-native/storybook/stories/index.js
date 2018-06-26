import { addDecorator } from '@storybook/react-native';
import centered from '../decorator-centered';

addDecorator(centered);

require('./1-components/ActivityIndicator/ActivityIndicatorScreen');
require('./1-components/DatePicker/DatePickerScreen');
require('./1-components/FlatList/FlatListScreen');
require('./1-components/Form/FormScreen');
require('./1-components/ScrollView/ScrollViewScreen');
require('./1-components/Select/SelectScreen');
require('./1-components/Text/TextScreen');
require('./1-components/TextInput/TextInputScreen');
require('./1-components/TimePicker/TimePickerScreen');
require('./1-components/TouchableView/TouchableViewScreen');
require('./1-components/View/ViewScreen');
