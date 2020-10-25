import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Heading from '../atoms/Heading';
const avatarImage = require('../../assets/avatar.png');
const signOutIcon = require('../../assets/signOutIcon.png');

const Wrapper = styled(View)`
    width: 100%;
    height: 16%;
    background: #F0F2F5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;
const StyledImage = styled(Image)`
    transform: rotate(180deg);
    width: 22px;
    height: 22px;
    opacity: 0.4;
`;

const Header = ({ children, logout }) => {
    const { navigate } = useNavigation();

    return (
        <Wrapper>
            <TouchableOpacity onPress={()=> {
                logout();
                navigate('Login')
            }}>
                <StyledImage
                    source={signOutIcon}
                />
            </TouchableOpacity>

            <Heading>{children}</Heading>
            <TouchableOpacity onPress={() => navigate('Login')}>
                <Image
                    source={avatarImage}
                    style={{ width: 40, height: 40 }}
                />
            </TouchableOpacity>

        </Wrapper>
    )
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(Header);