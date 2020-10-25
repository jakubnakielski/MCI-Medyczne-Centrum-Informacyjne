import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';

const StyledTextInput = styled(TextInput)`
    min-height: 60px;
    padding: 20px 8px;
    color: #fff;
    display: flex;
    text-align: justify;
`;

const Input = (props) => (
    <StyledTextInput {...props} />
);

export default Input;