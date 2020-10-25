import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

const Wrapper = styled(SafeAreaView)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #fff;
`;
const DetailsText = styled(Text)`
    font-size: 40px;
`;

const DetailsScreen = (props) => {
    const { goBack } = useNavigation();

    return (
        <Wrapper>
            <DetailsText>{props.route.params.info}</DetailsText>
            <Button title='go back' onPress={goBack} />
        </Wrapper>
    )
};

export default DetailsScreen;