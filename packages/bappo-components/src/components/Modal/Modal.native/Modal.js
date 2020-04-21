// @flow

import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';

import Overlay from '../../../primitives/Overlay';
import Text from '../../../primitives/Text';
import {
  ModalFormHeader,
  ModalFormTitleText,
} from '../../ModalForm/FormBody/FormBody.native';
import {
  ModalFormHeaderCancelButton,
  ModalFormTitleContainer,
} from '../../ModalForm/StyledComponents';
import type { ModalProps } from '../types.js.flow';

type Props = ModalProps;

class Modal extends React.Component<Props> {
  static defaultProps = {
    hideHeader: false,
  };
  render() {
    const { children, onRequestClose, visible, title, hideHeader } = this.props;

    return (
      <Overlay onPress={onRequestClose} visible={visible}>
        <ModalOuterContainer>
          {title || !hideHeader ? (
            <ModalFormHeader>
              <ModalFormHeaderCancelButton onPress={onRequestClose} />
              <ModalFormTitleContainer>
                <ModalFormTitleText>{title}</ModalFormTitleText>
              </ModalFormTitleContainer>
            </ModalFormHeader>
          ) : null}

          <ModalSafeArea>
            <ModalContentContainer>{children}</ModalContentContainer>
          </ModalSafeArea>
        </ModalOuterContainer>

        {/* {title || !hideHeader ? (
         
        ) : null} */}
      </Overlay>
    );
  }
}

export default Modal;

const ModalOuterContainer = styled.SafeAreaView`
  flex: 1;
`;

const ModalSafeArea = styled.View`
  flex: 1;
`;

const ModalContentContainer = styled.View`
  background-color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
