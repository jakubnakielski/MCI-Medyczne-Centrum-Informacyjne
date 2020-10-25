import React from 'react';
import { Text, View } from 'react-native';
import store from '../../store';
import styled, { css } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

const Wrapper = styled(View)`
    min-width: 80px;
    min-height: 60px;
    margin: 15px 0;
    margin-right: auto;
    align-items: center;
    justify-content: center;
    border-bottom-right-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    background: grey !important;
    padding: 20px;
    elevation: 3;

    ${({ isMyMessage }) => isMyMessage && css`
        border-bottom-left-radius: 50px;
        border-top-left-radius: 50px;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        margin-right: 0;
        margin-left: auto;
        background: #6E5694;
    `}
`;
const MessageContent = styled(Text)`
    color: white;
    font-size: 14px;
`;
const Author = styled(Text)`
    position: absolute;
    top: -22px;
    left: 10px;
    color: grey;
`;
const Message = ({ message, ...props }) => {
    const username = store.getState().username;

    return (
        <Wrapper
            as={LinearGradient}
            colors={['#F5B346', '#FA7D8E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            {...props}
        >
            <Author>{username}</Author>
            <MessageContent>{message.content}</MessageContent>
        </Wrapper>

    )
};

export default Message;