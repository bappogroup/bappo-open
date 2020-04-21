// @flow

import * as React from 'react';

import Alert from '../../apis/Alert';
import { FormState } from '../../primitives/Form';
import type {
  FormStateAndHelpers,
  FormStateAndHelpersAndActions,
  Values,
} from '../../primitives/Form/FormState/types.js.flow';
import ModalFormBody from './FormBody';
// Note that this is not the Modal we export. It has a slide animation on native.
import Modal from './Modal';

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
  testID?: string,
  title?: string,
  visible?: ?boolean,
  placement?: { type: string },
};
type Props = RequiredProps & OptionalProps;

class ModalForm extends React.Component<Props> {
  render() {
    const {
      children,
      initialValues,
      onDelete,
      submitButtonText,
      testID,
      title,
      visible,
      placement,
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
              placement={placement}
              visible={visible}
              hideHeader={true}
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
                submitting={formState.submitting}
                testID={testID}
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
        actions: {
          confirm: {
            text: 'Discard',
            destructive: true,
            onPress: () => onRequestClose(),
          },
          cancel: {
            text: 'Keep',
          },
        },
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
      await actions.submit(async () => {
        if (onSubmit) {
          await onSubmit(values);
        }
        onRequestClose();
      });
    }
  };
}

export default ModalForm;
