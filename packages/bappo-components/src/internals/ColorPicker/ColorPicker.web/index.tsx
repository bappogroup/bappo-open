import * as React from 'react';
import styled from 'styled-components';

import TextInput from '../../../primitives/TextInput';
import TouchableView from '../../../primitives/TouchableView';
import View from '../../../primitives/View';
import { Color, ColorPickerProps, DefaultColors } from '../types';
import { RGBAToHexA, hexAToRGBA } from '../utils';
import SwatchCollection from './SwatchCollection';

const ColorPicker = ({ colors, color, onChange }: ColorPickerProps) => {
  const [_color, setColor] = React.useState(color ?? {});

  const [hex, setHex] = React.useState(color?.hex);

  React.useEffect(() => {
    setHex(_color.hex);
    onChange?.(_color);
  }, [onChange, _color]);

  colors = colors || DefaultColors;

  const convertedColors = React.useMemo(
    () => colors!.map((c) => hexAToRGBA(c)).filter(Boolean) as Color[],
    [colors],
  );

  const handleSwatchClick = (value: Color, _event) => setColor(value);
  const handleColorChange = (value: Color) => {
    const getComponent = (component: string) =>
      Math.max(
        0,
        Math.min(
          255,
          value.hasOwnProperty(component)
            ? value[component] ?? 0
            : _color[component] || 0,
        ),
      );

    if (
      value.hasOwnProperty('r') ||
      value.hasOwnProperty('g') ||
      value.hasOwnProperty('b') ||
      value.hasOwnProperty('a')
    ) {
      const newColor = RGBAToHexA(
        getComponent('r'),
        getComponent('g'),
        getComponent('b'),
        getComponent('a'),
      );

      newColor && setColor(newColor);
    } else if (value.hex) {
      value.hex = value.hex?.replace(/[^#A-Fa-f0-9]/g, '');

      const newColor = hexAToRGBA(value.hex);

      newColor && setColor(newColor);

      setHex(value.hex);
    }
  };

  return (
    <Container>
      <InputContainer>
        <SwatchCollection
          colors={convertedColors}
          onClick={handleSwatchClick}
          activeColor={color}
        />
        <TransparentSwatch onPress={() => handleColorChange({ hex: '#0000' })}>
          transparent
        </TransparentSwatch>
        <Row>
          <ColorInputContainer>
            <span>Hex</span>
            <br />
            <HexInput
              maxLength={9}
              value={hex}
              onValueChange={(value) => {
                handleColorChange({ hex: value });
              }}
            />
          </ColorInputContainer>
          <Row>
            <ColorInputContainer>
              <span>R</span>
              <br />
              <ColorInput
                maxLength={3}
                value={color.r?.toString() ?? '0'}
                onValueChange={(value) => {
                  handleColorChange({ r: +value });
                }}
                type="number"
              />
            </ColorInputContainer>
            <ColorInputContainer>
              <span>G</span>
              <br />
              <ColorInput
                maxLength={3}
                value={color.g?.toString() ?? '0'}
                onValueChange={(value) => {
                  handleColorChange({ g: +value });
                }}
                type="number"
              />
            </ColorInputContainer>
            <ColorInputContainer>
              <span>B</span>
              <br />
              <ColorInput
                maxLength={3}
                value={color.b?.toString() ?? '0'}
                onValueChange={(value) => {
                  handleColorChange({ b: +value });
                }}
                type="number"
              />
            </ColorInputContainer>
            <ColorInputContainer>
              <span>A</span>
              <br />
              <ColorInput
                maxLength={3}
                value={color.a?.toString() ?? '255'}
                onValueChange={(value) => {
                  handleColorChange({ a: +value });
                }}
                type="number"
              />
            </ColorInputContainer>
          </Row>
        </Row>
      </InputContainer>
    </Container>
  );
};

const InputContainer = styled(View)`
  display: flex;
  flex-direction: column;
`;

const Row = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 8px 8px 4px 8px;
`;

const ColorInput = styled(TextInput)`
  width: 30px;
`;

const TransparentSwatch = styled(TouchableView)`
  width: 100%;
  font-size: 12px;
  color: gray;
  height: 24px;
  cursor: pointer;
  box-shadow: inset 2px 2px 1px -1px rgba(0, 0, 0, 0.2);
  line-height: 24px;
  align-items: center;

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
`;

const HexInput = styled(TextInput)`
  width: 80px;
`;

const ColorInputContainer = styled.span`
  & span {
    font-size: 10px;
    color: gray;
  }
`;

export default ColorPicker;
