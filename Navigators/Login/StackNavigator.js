import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
// import AppTabNavigator from '../TabNavigator';

const Stack = createStackNavigator();

const LoginStackNavigator = () => (
    <Stack.Navigator
        headerMode='none'
        initialRouteName='App'
        screenOptions={{
            animationEnabled: false,
        }}
    >
        {/* <Stack.Screen name='App' component={AppTabNavigator} /> */}
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator >
);

export default LoginStackNavigator;
