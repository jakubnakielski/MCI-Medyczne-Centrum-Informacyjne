import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled, { css } from 'styled-components';

const StyledTouchableOpacity = styled(TouchableOpacity)`
    background-color: #4160AA;
    padding: 8px 10px;
    border-radius: 4px;
    margin: 25px 0 10px;

    ${({ set }) => set && css`
        margin: 0;
        background: red;
        padding: 8px;
        border-radius: 4px;
        width: 80px;
        height: 100%;
        align-items: center;
        justify-content: center;
    `}

    ${({secondary})=> secondary && css`
        background: white;
    `}
`;
const StyledText = styled(Text)`
    color: white;
`;

const Button = ({ children, ...props }) => (
    <StyledTouchableOpacity {...props}>
        <StyledText>{children}</StyledText>
    </StyledTouchableOpacity>
);

export default Button;

