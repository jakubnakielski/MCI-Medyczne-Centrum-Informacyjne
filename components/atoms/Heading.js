import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const StyledText = styled(Text)`
    color: black;
    font-size: 22px;
    text-align: center;
`;

const Heading = ({ children }) => (
    <StyledText>{children}</StyledText>
);

export default Heading;

