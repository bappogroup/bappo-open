import React from 'react';

import Alert from '../../apis/Alert';
import { FormState } from '../../primitives/Form';
import {
  FormStateAndHelpers,
  FormStateAndHelpersAndActions,
  Values,
} from '../../primitives/Form/FormState/types';
import { ModalProps } from '../Modal/types';
import ModalFormBody from './FormBody';
// Note that this is not the Modal we export. It has a slide animation on native.
import Modal from './Modal';

type RequiredProps = {
  onRequestClose: () => void;
};
type OptionalProps = {
  children?:
    | React.ReactNode
    | ((formStateAndActions: FormStateAndHelpersAndActions) => React.ReactNode);
  contentContainerStyle?: any;
  initialValues?: Values;
  onDelete?: (values: Values) => Promise<void>;
  onSubmit?: (values: Values) => Promise<void>;
  onCancel?: (values: Values) => Promise<void>;
  placement?: ModalProps['placement'];
  submitButtonText?: string | ((formState: FormStateAndHelpers) => string);
  testID?: string;
  title?: string;
  visible?: boolean;
};
type Props = RequiredProps & OptionalProps;

function ModalForm({
  children,
  contentContainerStyle,
  initialValues,
  onDelete,
  onRequestClose,
  onSubmit,
  placement,
  submitButtonText,
  testID,
  title,
  visible,
  onCancel,
}: Props) {
  const handleCancel = async ({
    dirty,
    values,
  }: FormStateAndHelpersAndActions) => {
    async function handleCancelClose() {
      if (onCancel) {
        await onCancel(values);
      }
      onRequestClose();
    }
    if (dirty) {
      Alert.alert({
        title: 'You have unsaved changes',
        actions: {
          confirm: {
            text: 'Discard',
            destructive: true,
            onPress: () => handleCancelClose(),
          },
          cancel: {
            text: 'Keep',
          },
        },
      });
    } else {
      handleCancelClose();
    }
  };

  React.useEffect(() => {
    const input = document.activeElement;
    if (visible && input !== null && input.tagName !== 'INPUT') {
      //blur if active focus is not input
      //@ts-ignore
      document.activeElement.blur();
    }
  }, [visible]);

  const handleDelete = async ({ values }: FormStateAndHelpersAndActions) => {
    const res = onDelete && (await onDelete(values));

    onRequestClose();

    return res;
  };

  const handleSubmit = async ({
    actions,
    fieldErrors,
    values,
  }: FormStateAndHelpersAndActions) => {
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

  return (
    <FormState initialValues={initialValues}>
      {formStateAndActions => {
        const { actions, ...formState } = formStateAndActions;
        const formContent =
          typeof children === 'function'
            ? (children as any)(formStateAndActions)
            : children;
        return (
          <Modal
            hideHeader={true}
            onRequestClose={() => handleCancel(formStateAndActions)}
            placement={placement}
            visible={visible}
          >
            <ModalFormBody
              contentContainerStyle={contentContainerStyle}
              onCancel={() => handleCancel(formStateAndActions)}
              onDelete={onDelete && (() => handleDelete(formStateAndActions))}
              onSubmit={() => handleSubmit(formStateAndActions)}
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

export default ModalForm;
