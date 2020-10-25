import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated, KeyboardAvoidingView, Image, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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

let socket;

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputContent, setInputContent] = useState('');

    useEffect(() => {
        const socketConfig = io({
            reconnection: true,
        });
        socket = io.connect('http://io.rdnt.pl:5050');
    }, [])

    useFocusEffect(
        useCallback(() => {
            const userID = store.getState().userID || 'niezalogowany';
            console.log(userID);
            // socket.emit('add', userID);
        }, [])
    );

    useEffect(() => {
        socket.on('chat', ({ message, username }) => {
            setTasks([{ user: username, content: message }, ...tasks]);
        });

    }, [tasks]);

    const addTask = () => {
        // Keyboard.dismiss();
        if (inputContent === '') return;

        setTasks([{ user: 'Jakub', content: inputContent }, ...tasks]);
        setInputContent('');

        const username = store.getState().username || 'niezalogowany';
        socket.emit('chat', {
            message: inputContent,
            username: username,
        });
    }

    return (
        <StyledView>
            <Header>Konsultant Jan</Header>
            <Container behavior='padding'>
                <MessageList
                    data={tasks}
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
};

export default TodoList;



/* <AddTaskButton
    activeOpacity={0.7}
    delayPressIn={0}
    style={scaleTransform(addTaskScale)}

>
    <AddTaskButtonText>
        Wyślij
</AddTaskButtonText>
</AddTaskButton> */