import * as React from 'react';
import useMountedState from 'react-use/lib/useMountedState';
import styled from 'styled-components';

import { DeviceKind, useDeviceKind } from '../../../apis/DeviceKind';
import Icon from '../../../components/Icon';
import FlexDiv from '../../../internals/web/FlexDiv';
import FlexForm from '../../../internals/web/FlexForm';
import Text from '../../../primitives/Text';
import TouchableView from '../../../primitives/TouchableView';
import Button from '../../Button';
import SubmitButton from '../../SubmitButton';
import {
  ModalFormHeaderCancelButton,
  ModalFormHeaderSubmitButton,
  ModalFormTitleContainer,
  modalFormContentStyle,
  modalFormMobileHeaderContainerStyle,
  modalFormMobileHeaderStyle,
  modalFormMobileTitleTextStyle,
} from '../StyledComponents';
import { FormBodyProps } from './types';

function FormBody({
  children,
  contentContainerStyle,
  onCancel,
  onDelete,
  onSubmit,
  submitButtonText = 'Submit',
  testID,
  title,
  headerContainerStyle,
  footerContainerStyle,
}: FormBodyProps) {
  const deviceKind = useDeviceKind();
  const isMounted = useMountedState();
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (onDelete) {
      setDeleting(true);
      try {
        await onDelete();
      } finally {
        if (isMounted()) {
          setDeleting(false);
        }
      }
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit && onSubmit();
  };
  const { headerStyle, titleStyle, closeIconStyle } = headerContainerStyle;
  const {
    footerStyle,
    submitBtnStyle,
    cancelBtnStyle,
    cancelBtnTextStyle,
  } = footerContainerStyle;
  return (
    <StyledForm data-testid={testID} onSubmit={handleSubmit}>
      <ModalFormHeader $deviceKind={deviceKind} style={headerStyle}>
        {deviceKind === 'tablet' || deviceKind === 'desktop' ? (
          <ModalFormCloseButtonContainer onPress={onCancel}>
            <Icon style={closeIconStyle} name="clear" />
          </ModalFormCloseButtonContainer>
        ) : (
          <ModalFormHeaderMobileContainer>
            <ModalFormHeaderCancelButton onPress={onCancel} />
            <ModalFormHeaderSubmitButton text={submitButtonText} />
          </ModalFormHeaderMobileContainer>
        )}
        <ModalFormTitleContainer>
          <ModalFormTitleText $deviceKind={deviceKind} style={titleStyle}>
            {title}
          </ModalFormTitleText>
        </ModalFormTitleContainer>
      </ModalFormHeader>
      <ModalFormContent $deviceKind={deviceKind} style={contentContainerStyle}>
        {children}
        {(deviceKind === 'phone' || deviceKind === 'large-phone') &&
        onDelete ? (
          <ModalFormMobileDeleteButton
            loading={deleting}
            onPress={handleDelete}
            text="Delete"
          />
        ) : null}
      </ModalFormContent>
      {deviceKind === 'tablet' || deviceKind === 'desktop' ? (
        <ModalFormFooter style={footerStyle}>
          <ModalFormRow>
            {onDelete && (
              <ModalFormFooterDeleteButton
                loading={deleting}
                onPress={handleDelete}
                text="Delete"
              />
            )}
          </ModalFormRow>
          <ModalFormRow>
            <ModalFormFooterCancelButton
              style={cancelBtnStyle}
              textStyle={cancelBtnTextStyle}
              onPress={onCancel}
              text="Cancel"
              testID="modalForm-footer-cancel-button"
            />
            <SubmitButton
              style={submitBtnStyle}
              text={submitButtonText}
              testID="modalForm-footer-submit-button"
            />
          </ModalFormRow>
        </ModalFormFooter>
      ) : null}
    </StyledForm>
  );
}

export default FormBody;

const StyledForm = styled(FlexForm)`
  flex: 1;
`;

const ModalFormTitleText = styled(Text).attrs((props) => ({
  numberOfLines: 2,
}))<{
  $deviceKind: DeviceKind;
}>`
  font-size: 20px;
  color: #2b2826;
  line-height: 20px;

  ${(props) =>
    props.$deviceKind === 'phone' || props.$deviceKind === 'large-phone'
      ? modalFormMobileTitleTextStyle
      : ''}
`;

const ModalFormHeader = styled(FlexDiv)<{
  $deviceKind: DeviceKind;
}>`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid #dddbda;
  height: 55px;

  ${(props) =>
    props.$deviceKind === 'phone' || props.$deviceKind === 'large-phone'
      ? `${modalFormMobileHeaderStyle};
      ${modalFormMobileHeaderContainerStyle};
      `
      : ''}
`;

const ModalFormCloseButtonContainer = styled(TouchableView)`
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 20px;
`;

const ModalFormHeaderMobileContainer = styled(FlexDiv)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const ModalFormMobileDeleteButton = styled(Button).attrs((props) => ({
  type: 'destructive',
}))``;

const ModalFormContent = styled(FlexDiv)<{
  $deviceKind: DeviceKind;
}>`
  flex: 1;
  background-color: white;
  overflow-y: auto;
  padding: 48px;

  ${(props) =>
    props.$deviceKind === 'phone' || props.$deviceKind === 'large-phone'
      ? modalFormContentStyle
      : ''}
`;

const ModalFormFooter = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f1f1f0;
  border-top: 1px solid #dddbda;
  height: 64px;
  padding: 16px;
`;

const ModalFormRow = styled(FlexDiv)`
  display: flex;
  flex-direction: row;
`;

const ModalFormFooterCancelButton = styled(Button).attrs((props) => {
  return props.style ? {} : { type: 'tertiary' };
})`
  margin-right: 16px;
`;

const ModalFormFooterDeleteButton = styled(Button).attrs((props) => ({
  type: 'destructive',
}))``;
