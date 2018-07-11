// @flow

import * as React from 'react';
import type {
  FormStateAndHelpersAndActions,
  Values,
} from '../../primitives/Form/FormState/types.js.flow';
import Modal from '../Modal';
import ModalFormBody from './FormBody';
import { StyledForm } from './StyledComponents';

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
    const { children, initialValues, title, visible, onDelete } = this.props;

    return (
      <StyledForm initialValues={initialValues} onSubmit={this._onSubmit}>
        {formState => {
          return (
            <Modal
              onRequestClose={() => this._onCancel(formState)}
              visible={visible}
            >
              <ModalFormBody
                onCancel={() => this._onCancel(formState)}
                onDelete={onDelete && this._onDelete}
                title={title}
                formState={formState}
              >
                {children}
              </ModalFormBody>
            </Modal>
          );
        }}
      </StyledForm>
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

  _onCancel = async (formState: any) => {
    const { onRequestClose } = this.props;

    if (formState.dirty) {
      // TODO: use proper alert component, quit if user confirms
      return !alert('not today, punk');
    }

    const res = await onRequestClose();
    return res;
  };
}

export default ModalForm;
