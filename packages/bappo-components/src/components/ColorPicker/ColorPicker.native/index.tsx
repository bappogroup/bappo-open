import * as React from 'react';
import styled from 'styled-components';

import Picker from '../../../internals/ColorPicker';
import { Color } from '../../../internals/ColorPicker/types';
import { hexAToRGBA } from '../../../internals/ColorPicker/utils';
import TouchableView from '../../../primitives/TouchableView';
import View from '../../../primitives/View';
import Button from '../../Button';
import Icon from '../../Icon';
import { ColorPickerProps } from '../types';
import Modal from './Modal';

const ColorPicker = ({
  hex = '#0000',
  onClose,
  className,
  testID,
}: ColorPickerProps) => {
  const [active, setActive] = React.useState(false);
  const [color, setColor] = React.useState<Color>(hexAToRGBA(hex) ?? {});

  const close = () => setActive(false);

  return (
    <React.Fragment>
      <TouchableView
        className={className}
        onPress={() => {
          setActive(true);
        }}
        testID={testID}
      >
        <Icon name="color-lens" color={color?.hex ?? '#000'} />
      </TouchableView>
      {active ? (
        <Modal onRequestClose={close} visible={active}>
          <Picker color={color} onChange={(value) => setColor(value)} />
          <Footer>
            <Preview>
              <PreviewColor $color={color?.hex ?? '#0000'} />
            </Preview>
            <FooterButton
              type="tertiary"
              text="Cancel"
              onPress={() => setActive(false)}
            />
            <FooterButton
              type="primary"
              text="OK"
              onPress={() => {
                onClose?.(color);
                setActive(false);
              }}
            />
          </Footer>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default ColorPicker;

const Footer = styled(View)`
  background-color: #fafafa;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  padding: 8px;
  padding-top: 4px;
`;

const FooterButton = styled(Button)`
  margin-left: 8px;
`;

const Preview = styled(View)`
  flex-grow: 1;
  height: 30px;
`;

const PreviewColor = styled(View)<{ $color: string }>`
  background-color: ${({ $color }) => `${$color}`};
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;
