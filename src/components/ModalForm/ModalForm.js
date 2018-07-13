// @flow

import * as React from 'react';
import Alert from '../../apis/Alert';
import type {
  FormStateAndHelpers,
  FormStateAndHelpersAndActions,
  Values,
} from '../../primitives/Form/FormState/types.js.flow';
import { FormState } from '../../primitives/Form';
import Modal from '../Modal';
import ModalFormBody from './FormBody';

type RequiredProps = {
  onRequestClose: () => any,
};
type OptionalProps = {
  children?:
    | ?React.Node
    | ((formStateAndActions: FormStateAndHelpersAndActions) => React.Node),
  initialValues?: Values,
  onDelete?: ?(values: Values) => mixed,
  onSubmit?: ?(values: Values) => mixed,
  submitButtonText?: string | ((formState: FormStateAndHelpers) => string),
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
      onDelete,
      submitButtonText,
      title,
      visible,
    } = this.props;

    return (
      <FormState initialValues={initialValues}>
        {formStateAndActions => {
          // $FlowFixMe: Seems that flow can't type object destructuring properly
          const { actions, ...formState } = formStateAndActions;
          const formContent =
            typeof children === 'function'
              ? children(formStateAndActions)
              : children;
          return (
            <Modal
              onRequestClose={() => this._onCancel(formStateAndActions)}
              visible={visible}
            >
              <ModalFormBody
                onCancel={() => this._onCancel(formStateAndActions)}
                onDelete={
                  onDelete && (() => this._onDelete(formStateAndActions))
                }
                onSubmit={() => this._onSubmit(formStateAndActions)}
                submitButtonText={
                  typeof submitButtonText === 'function'
                    ? submitButtonText(formState)
                    : submitButtonText
                }
                title={title}
              >
                {formContent}
              </ModalFormBody>
            </Modal>
          );
        }}
      </FormState>
    );
  }

  _onCancel = ({ dirty }: FormStateAndHelpersAndActions) => {
    const { onRequestClose } = this.props;

    if (dirty) {
      Alert.alert({
        title: 'You have unsaved changes',
        actions: [
          {
            text: 'Stay',
            style: 'cancel',
          },
          {
            text: 'Leave',
            style: 'destructive',
            onPress: () => onRequestClose(),
          },
        ],
      });
    } else {
      onRequestClose();
    }
  };

  _onDelete = async ({ values }: FormStateAndHelpersAndActions) => {
    const { onRequestClose, onDelete } = this.props;

    const res = onDelete && (await onDelete(values));

    onRequestClose();

    return res;
  };

  _onSubmit = async ({
    actions,
    fieldErrors,
    values,
  }: FormStateAndHelpersAndActions) => {
    const { onRequestClose, onSubmit } = this.props;

    actions.touchAll();

    if (Object.keys(fieldErrors).length === 0) {
      const res = await actions.submit(() => onSubmit && onSubmit(values));
      onRequestClose();
      return res;
    }
  };
}

export default ModalForm;
