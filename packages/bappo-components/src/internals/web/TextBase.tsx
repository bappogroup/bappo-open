import React from 'react';
import styled from 'styled-components';

import Colors from '../../apis/Colors';
import FontContext from '../../primitives/Font/FontContext';
import { TextProps } from '../../primitives/Text/types';

type TextBaseProps = TextProps & {
  className?: string;
  ellipsis?: boolean;
};

interface InternalProps {
  nativeRef?: React.Ref<any>;
}

const IsParentATextContext = React.createContext(false);

export const createText = (containerComponent: keyof JSX.IntrinsicElements) => {
  const ChildText = styled.div<{
    'data-text-as-pseudo-element'?: React.ReactText;
    fontFamilyValue: string;
    fontSizeValue: number;
    numberOfLines?: number;
    isParentAText: boolean;
    selectable?: boolean;
    ellipsis?: boolean;
  }>`
    box-sizing: border-box;
    color: ${Colors.BLACK};
    display: inline;
    flex-grow: 0;
    flex-shrink: 0;
    font-family: ${props => props.fontFamilyValue};
    font-size: ${props => props.fontSizeValue}px;
    position: relative;
    white-space: pre-wrap;
    word-wrap: break-word;
    -ms-hyphens: auto;
  
    ${({ isParentAText }) =>
      isParentAText &&
      `
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      white-space: inherit;
    `}
  
    ${({ selectable }) =>
      selectable
        ? `
      cursor: text;
      user-select: text;
    `
        : `
      cursor: inherit;
    `}
  
    ${({ numberOfLines, fontSizeValue, ellipsis }) =>
      numberOfLines &&
      `
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      ${
        numberOfLines === 1
          ? `white-space: nowrap;`
          : `
      line-height: ${fontSizeValue + 2}px;
      max-height: ${(fontSizeValue + 2) * numberOfLines}px;
      `
      }
      ${ellipsis &&
        numberOfLines !== 1 &&
        `::after {
          content: '...';
          position: absolute;
          right: 0;
          bottom: 0;
        }`}
    `}
  `;
  const RootText = ChildText.withComponent(containerComponent);

  function TextBase({
    accessibilityLabel,
    children,
    className,
    nativeRef,
    numberOfLines,
    selectable,
    style,
    testID,
    ellipsis,
  }: TextBaseProps & InternalProps) {
    // import after mount so that it doesn't break server-side rendering
    React.useEffect(() => {
      require('./addNonSelectableTextStyle');
    }, []);

    const isParentAText = React.useContext(IsParentATextContext);

    const { fontFamily, fontSize } = React.useContext(FontContext);

    let fontSizeValue = fontSize;
    if (style && style.fontSize) {
      fontSizeValue = style.fontSize;
    }
    const styleProps = {
      className,
      fontFamilyValue: fontFamily,
      fontSizeValue,
      isParentAText,
      numberOfLines,
      ellipsis,
      selectable,
      style,
    };

    const props = {
      ...styleProps,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
      ref: nativeRef,
    };

    const renderChild = (child: React.ReactNode, props: Object) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return renderText(
          child,
          {
            ...props,
            isParentAText: true,
          },
          true,
        );
      }
      return child;
    };
    const renderContainer = (
      children: React.ReactNode,
      props: any,
      isChild: boolean,
    ) => {
      return React.createElement(
        //@ts-ignore
        isChild ? ChildText : RootText,
        props,
        children,
      );
    };

    const renderText = (
      text: string | number,
      props: any,
      isChild: boolean,
    ) => {
      if (selectable) {
        return renderContainer(text, props, isChild);
      }
      // user-select CSS property doesn't prevent the text from being copied to
      // clipboard. To avoid getting to clipboard, the text from
      // data-text-as-pseudo-element attribute will be displayed as pseudo
      // element.
      return React.createElement(isChild ? ChildText : RootText, {
        ...props,
        'data-text-as-pseudo-element': text,
      });
    };

    const renderContent = () => {
      if (typeof children === 'string' || typeof children === 'number') {
        return renderText(children, props, false);
      }

      const flatArray = React.Children.toArray(children);
      return renderContainer(
        flatArray.map((element, index) =>
          renderChild(element, { key: String(index) }),
        ),
        props,
        false,
      );
    };
    return (
      <IsParentATextContext.Provider value={true}>
        {renderContent()}
      </IsParentATextContext.Provider>
    );
  }

  return React.forwardRef<any, TextBaseProps>((props, ref) => {
    return <TextBase {...props} nativeRef={ref} />;
  });
};

export default createText('div');
