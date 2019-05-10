import { addDecorator } from '@storybook/react-native';
import centered from '../decorator-centered';

addDecorator(centered);

require('./1-primitives/ActivityIndicator/ActivityIndicatorScreen');
require('./1-primitives/FlatList/FlatListScreen');
require('./1-primitives/Form/FormScreen');
require('./1-primitives/ScrollView/ScrollViewScreen');
require('./1-primitives/Switch/SwitchScreen');
require('./1-primitives/Text/TextScreen');
require('./1-primitives/TextInput/TextInputScreen');
require('./1-primitives/TouchableView/TouchableViewScreen');
require('./1-primitives/View/ViewScreen');
require('./1-primitives/Overlay/OverlayScreen');

require('./2-components/Avatar/AvatarScreen');
require('./2-components/Background/BackgroundScreen');
require('./2-components/Button/ButtonScreen');
require('./2-components/Card/CardScreen');
require('./2-components/DatePicker/DatePickerScreen');
require('./2-components/Dropdown/DropdownScreen');
require('./2-components/Heading/HeadingScreen');
require('./2-components/Icon/IconScreen');
require('./2-components/Modal/ModalScreen');
require('./2-components/ModalForm/ModalFormScreen');
require('./2-components/ModalWizard/ModalWizardScreen');
require('./2-components/Paragraph/ParagraphScreen');
require('./2-components/SubHeading/SubHeadingScreen');
require('./2-components/TabPicker/TabPickerScreen');
require('./2-components/TimePicker/TimePickerScreen');
require('./2-components/Separator/SeparatorScreen');
require('./2-components/VerticalSeparator/VerticalSeparatorScreen');

require('./3-inputFields/DateField/DateFieldScreen');
require('./3-inputFields/SelectField/SelectFieldScreen');
require('./3-inputFields/SwitchField/SwitchFieldScreen');
require('./3-inputFields/TextField/TextFieldScreen');
require('./3-inputFields/TimeField/TimeFieldScreen');

require('./4-apis/Alert/AlertScreen');
