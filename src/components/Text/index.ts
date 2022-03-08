import {TextStyle} from 'react-native';

import styled, {css} from 'styled-components/native';

interface Props {
  size?: number;
  color?: string;
  hasUnderline?: boolean;
  align?: TextStyle['textAlign'];
  alignVertical?: TextStyle['textAlignVertical'];
  lineHeight?: number;
  weight?: string;
}

const Text = styled.Text<Props>`
  text-align: ${({align}) => align || 'auto'};
  text-align-vertical: ${({alignVertical}) => alignVertical || 'auto'};
  font-size: ${({size}) => size || 16}px;
  color: ${({color}) => color || '#FFF'};
  font-family: ${({weight}) =>
    weight ? `Roboto-${weight}` : 'Roboto-Regular'};
  text-decoration: ${({hasUnderline, color}) =>
    hasUnderline ? `underline ${color || '#000'}` : 'none'};
  ${({lineHeight}) =>
    lineHeight &&
    css`
      line-height: ${lineHeight}px;
    `}
`;

export {Text};
