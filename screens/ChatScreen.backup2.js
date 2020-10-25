import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated, KeyboardAvoidingView, Image, } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import io from 'socket.io-client';
import store from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import Message from '../components/atoms/Message';
import Input from '../components/atoms/Input';
import Header from '../components/molecules/Header';
const sendIconImage = require('../assets/sendIcon.png');

const StyledView = styled(View)`
    background-color: #F0F2F5;
`;
const Container = styled(KeyboardAvoidingView)`
        width: 100%;
        elevation: 50;
        height: 84%;
        overflow: hidden;
        background: #fff;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
`;
const MessageList = styled(Animated.FlatList)`
    display: flex;
    flex-direction: column;
`;
const InputWrapper = styled(View)`
    width: 90%;
    height: 60px;
    elevation: 70;
    margin: 0 auto;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 20px;
`;
const StyledInput = styled(Input)`
    width: 100%;
`;
const StyledTouchableOpacity = styled(TouchableOpacity)`
    margin-left: -70px;
    width: 80px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

/*
  const userID = store.getState().userID;
  console.log(111, userID);
  if (!userID) {
    return <Text>NIE JESTEŚ ZALOGOWANY!</Text>
  }*/ // to musi być w UseFocusEffect w class Component


class ChatScreen extends React.Component {
    state = {
        messages: [],
        inputContent: '',
        isTyping: false
    }

    setMessages = (task) => {
        this.setState((prevState) => ({
            ...messages, task
        }));
    }

    render() {
        return (
            <StyledView>
                <Header>MOPS Helpdesk</Header>
                <Container behavior='padding'>
                    <MessageList
                        data={messages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <Message
                                    message={item}
                                    key={index}
                                    isMyMessage={item.user === "Jakub" ? true : false}
                                />
                            )
                        }}
                        inverted
                        keyboardShouldPersistTaps={'always'}
                    />

                    <InputWrapper
                        as={LinearGradient}
                        colors={['#F5B346', '#FA7D8E']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <StyledInput
                            placeholder='Napisz wiadomość...'
                            placeholderTextColor="#FFF"
                            multiline={true}
                            value={inputContent}
                            onChangeText={(text) => setInputContent(text)}
                            // keyboardType='default'
                            // returnKeyType='none'
                            // onSubmitEditing={(event) => addTask(event.nativeEvent.text)}
                        />
                        <StyledTouchableOpacity onPress={addTask}>
                            <Image
                                source={sendIconImage}
                                style={{ width: 20, height: 20 }}
                            />
                        </StyledTouchableOpacity>
                    </InputWrapper>
                </Container>
            </StyledView>
        )
    }
}
let socket;

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputContent, setInputContent] = useState('');
    const userID = store.getState().userID;
    const username = store.getState().username;
    // const { navigate } = useNavigation();

    useEffect(() => {
        const socketConfig = io({
            reconnection: true,
        });
        socket = io.connect('http://io.rdnt.pl:5050');

    }, [])

    useFocusEffect(
        useCallback(() => {
            const username = store.getState().username || 'brak username';
            // socket.emit('welcome', username);
            // if (!userID) {
            //     navigate('Login');
            // }
        }, [])
    );

    useEffect(
        useCallback(() => {
            const username = store.getState().username || 'brak username';
            console.log(username);
            socket.emit('welcome', username);
            socket.emit('add', username);
        }, []), []
    );

    useEffect(() => {
        socket.on('chat', ({ message, username }) => {
            setMessages([{ user: username, content: message }, ...messages]);
        });
    }, [messages]);


    const addMessage = () => {
        if (inputContent === '') return;

        setMessages([{ user: 'Jakub', content: inputContent }, ...messages]);
        setInputContent('');

        const username = store.getState().username || 'brak username';
        socket.emit('chat', {
            message: inputContent,
            username: username,
        });
    }
    return (
        <StyledView>
            <Header>Konsultant medyczny</Header>
            <Container>
                <MessageList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <Message
                                message={item}
                                key={index}
                                isMyMessage={item.user === "Jakub" ? true : false}
                            />
                        )
                    }}
                    inverted
                    keyboardShouldPersistTaps={'always'}
                />

                <InputWrapper
                    as={LinearGradient}
                    colors={['#F5B346', '#FA7D8E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <StyledInput
                        placeholder='Napisz wiadomość...'
                        placeholderTextColor="#FFF"
                        multiline={true}
                        value={inputContent}
                        onChangeText={(text) => setInputContent(text)}
                    />
                    <StyledTouchableOpacity onPress={addMessage}>
                        <Image
                            source={sendIconImage}
                            style={{ width: 20, height: 20 }}
                        />
                    </StyledTouchableOpacity>
                </InputWrapper>
            </Container>
        </StyledView>
    )
};

export default ChatScreen;
