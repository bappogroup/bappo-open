// @flow

import * as React from 'react';
import type {
  FormStateAndHelpersAndActions,
  Values,
} from '../../primitives/Form/FormState/types.js.flow';
import Modal from '../Modal';
import ModalFormBody from './FormBody';

type RequiredProps = {
  onRequestClose: () => void,
};
type OptionalProps = {
  children?:
    | ?React.Node
    | ((formState: FormStateAndHelpersAndActions) => React.Node),
  initialValues?: Values,
  onOverlayPress?: () => void,
  onSubmit?: ?(values: Values) => mixed,
  onDelete?: ?(values: Values) => mixed,
  overlayColor?: string,
  title?: string,
  visible?: ?boolean,
};
type Props = RequiredProps & OptionalProps;

class ModalForm extends React.Component<Props> {
  props: Props;

  render() {
    const {
      children,
      initialValues,
      onOverlayPress,
      onRequestClose,
      overlayColor,
      title,
      visible,
      onDelete,
    } = this.props;

    return (
      <Modal
        onOverlayPress={onOverlayPress}
        onRequestClose={onRequestClose}
        overlayColor={overlayColor}
        visible={visible}
      >
        <ModalFormBody
          initialValues={initialValues}
          onCancel={onRequestClose}
          onSubmit={this._onSubmit}
          onDelete={onDelete && this._onDelete}
          title={title}
        >
          {children}
        </ModalFormBody>
      </Modal>
    );
  }

  _onSubmit = async (values: Values) => {
    const { onRequestClose, onSubmit } = this.props;

    const res = onSubmit && (await onSubmit(values));

    onRequestClose();

    return res;
  };

  _onDelete = async (values: Values) => {
    const { onRequestClose, onDelete } = this.props;

    const res = await onDelete(values);

    onRequestClose();

    return res;
  };
}

export default ModalForm;
