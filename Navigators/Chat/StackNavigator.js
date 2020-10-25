import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import ChatScreen from '../../screens/ChatScreen';
import DetailsScreen from '../../screens/DetailsScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator
        headerMode='none'
        screenOptions={{
            animationEnabled: false,
        }}
    >
        <Stack.Screen
            name='List'
            component={ChatScreen}
            options={{
                headerTitle: 'Main Page',
            }}
        />
        <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
    </Stack.Navigator >
);

export default StackNavigator;
