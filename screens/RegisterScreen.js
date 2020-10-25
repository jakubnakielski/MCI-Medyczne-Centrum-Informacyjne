import React from 'react';
import { SafeAreaView, View, Text, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { registerAction } from '../actions';
import styled from 'styled-components';
import { Formik } from 'formik';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Wrapper = styled(SafeAreaView)`
    width: 100%;
    height: 100%;
    background: white;
    justify-content: center;
    align-items: center;
`;
const LoginText = styled(Text)`
    font-size: 40px;
    margin-bottom: 40px;
`;
const StyledInput = styled(Input)`
    width: 200px;
    height: 30px;
    background-color: #eee;
    margin-bottom: 10px;
    padding: 0 10px;
`;
const StyledView = styled(View)`
    display: flex;
    align-items: center;
`;
const ButtonsWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 225px;
`;

const RegisterScreen = ({ register }) => {
    const { goBack } = useNavigation();

    return (
        <Wrapper>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={({ username, password }) => {
                    register(username, password);
                    Keyboard.dismiss();
                    goBack();
                }}
            >
                {({ values, handleChange, handleSubmit }) => {

                    return (
                        <StyledView>
                            <LoginText>Rejestracja</LoginText>
                            <StyledInput
                                as={TextInput}
                                type='text'
                                name='username'
                                placeholder='username'
                                values={values.username}
                                onChangeText={handleChange('username')}
                            />
                            <StyledInput
                                as={TextInput}
                                type='password'
                                name='password'
                                placeholder='password'
                                values={values.password}
                                onChangeText={handleChange('password')}
                            />

                            <ButtonsWrapper>
                                <Button title="Submit" onPress={() => goBack()}>
                                    Wróć
                            </Button>
                                <Button title="Submit" onPress={handleSubmit}>Zarejestruj się</Button>
                            </ButtonsWrapper>
                        </StyledView>
                    )
                }}
            </Formik>
        </Wrapper>
    )

};

const mapDispatchToProps = (dispatch) => ({
    register: (username, password) => dispatch(registerAction(username, password)),
});

export default connect(null, mapDispatchToProps)(RegisterScreen);