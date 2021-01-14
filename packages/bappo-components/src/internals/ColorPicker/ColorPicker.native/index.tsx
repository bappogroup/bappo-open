import * as React from 'react';
import RN from 'react-native';
import styled from 'styled-components';

import Text from '../../../primitives/Text';
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
          <Text>transparent</Text>
        </TransparentSwatch>
        <Row>
          <ColorInputContainer>
            <Label>Hex</Label>
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
              <Label>R</Label>
              <ColorInput
                maxLength={3}
                value={color.r?.toString() ?? '0'}
                onValueChange={(value) => {
                  handleColorChange({ r: +value.replace(/[^0-9]/g, '') });
                }}
                type="number"
              />
            </ColorInputContainer>
            <ColorInputContainer>
              <Label>G</Label>
              <ColorInput
                maxLength={3}
                value={color.g?.toString() ?? '0'}
                onValueChange={(value) => {
                  handleColorChange({ g: +value.replace(/[^0-9]/g, '') });
                }}
                type="number"
              />
            </ColorInputContainer>
            <ColorInputContainer>
              <Label>B</Label>
              <ColorInput
                maxLength={3}
                value={color.b?.toString() ?? '0'}
                onValueChange={(value) => {
                  handleColorChange({ b: +value.replace(/[^0-9]/g, '') });
                }}
                type="number"
              />
            </ColorInputContainer>
            <ColorInputContainer>
              <Label>A</Label>
              <ColorInput
                maxLength={3}
                value={color.a?.toString() ?? '255'}
                onValueChange={(value) => {
                  handleColorChange({ a: +value.replace(/[^0-9]/g, '') });
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
  line-height: 24px;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: #ddd;
  border-bottom-width: 2px;
`;

const HexInput = styled(TextInput)`
  width: 80px;
`;

const ColorInputContainer = styled(View)``;

const Label = styled(RN.Text)`
  font-size: 10px;
  color: gray;
`;

export default ColorPicker;
