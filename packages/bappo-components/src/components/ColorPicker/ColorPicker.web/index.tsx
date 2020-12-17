import * as React from 'react';
import styled from 'styled-components';

import Picker from '../../../internals/ColorPicker';
import { Color } from '../../../internals/ColorPicker/types';
import { hexAToRGBA } from '../../../internals/ColorPicker/utils';
import { Popover } from '../../../internals/Popover.web';
import { DivTouchableViewBase } from '../../../internals/web/TouchableViewBase';
import View from '../../../primitives/View';
import Button from '../../Button';
import Icon from '../../Icon';
import { ColorPickerProps } from '../types';

const ColorPicker = ({
  hex = '#0000',
  onClose,
  className,
  testID,
}: ColorPickerProps) => {
  const [active, setActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [color, setColor] = React.useState<Color>(hexAToRGBA(hex) ?? {});

  return (
    <React.Fragment>
      <TriggerContainer
        ref={containerRef}
        className={className}
        onClick={() => setActive(true)}
        testID={testID}
      >
        <Icon name="color-lens" color={color?.hex ?? '#000'} />
      </TriggerContainer>
      {active ? (
        <Popover
          anchorEl={containerRef.current}
          onRequestClose={() => setActive(false)}
          visible
        >
          <Picker color={color} onChange={(value) => setColor(value)} />
          <Footer>
            <Preview>
              <Checkerboard />
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
        </Popover>
      ) : null}
    </React.Fragment>
  );
};

const TriggerContainer = styled(DivTouchableViewBase)``;

export default ColorPicker;

const Footer = styled(View)`
  background-color: #fafafa;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  padding: 4px 8px 8px 8px;
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
  transition: background-color 0.2s;
  box-shadow: inset 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    inset 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    inset 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const Checkerboard = styled.div`
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;
