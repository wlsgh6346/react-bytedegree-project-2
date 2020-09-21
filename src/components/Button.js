import React from "react";
import styled, {css} from 'styled-components';
import { darken, lighten } from 'polished';

const colorStyles = css`
    /* 색상 */
    ${({theme, color}) => {
    const selectedcolor = theme.palette[color];
    return css`
        background: ${selectedcolor};
        &:hover {
          background: ${lighten(0.1, selectedcolor)};
        }
        &:active {
          background: ${darken(0.1, selectedcolor)};
        }
       `;
}}
`;

const StyleButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.55rem;
  
  height: 2.25rem;
  font-size: 1rem;
  
  /* 기타 */
  & + button {
    margin-left: 1rem;
  }
  
  ${colorStyles}
  
`;

function Button( {children, color, ...rest }) {
    return (
        <StyleButton color={color} {...rest} >
            {children}
        </StyleButton>
    )
}

Button.defaultProps = {
    color: 'blue'
}

export default Button;