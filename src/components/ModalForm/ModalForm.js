// @flow

import * as React from 'react';
import type {
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
    | ((formState: FormStateAndHelpersAndActions) => React.Node),
  initialValues?: Values,
  onDelete?: ?(values: Values) => mixed,
  onSubmit?: ?(values: Values) => mixed,
  title?: string,
  visible?: ?boolean,
};
type Props = RequiredProps & OptionalProps;

class ModalForm extends React.Component<Props> {
  props: Props;

  render() {
    const { children, initialValues, title, visible } = this.props;

    return (
      <FormState initialValues={initialValues}>
        {formState => {
          const formContent =
            typeof children === 'function' ? children(formState) : children;
          return (
            <Modal
              onRequestClose={() => this._onCancel(formState)}
              visible={visible}
            >
              <ModalFormBody
                onCancel={() => this._onCancel(formState)}
                onDelete={() => this._onDelete(formState)}
                onSubmit={() => this._onSubmit(formState)}
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

  _onCancel = (formState: FormStateAndHelpersAndActions) => {
    const { onRequestClose } = this.props;

    if (formState.dirty) {
      // TODO: use proper alert component, quit if user confirms
      !alert('not today, punk');
      return;
    }

    onRequestClose();
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
