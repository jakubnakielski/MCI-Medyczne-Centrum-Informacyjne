import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components'
import ProfileScreen from '../screens/ProfileScreen';
import ChatStackNavigator from './Chat/StackNavigator';
import LoginStackNavigator from './Login/StackNavigator';
import chatIcon from '../assets/chatIcon.png';
import userIcon from '../assets/userIcon.png';
import signInIcon from '../assets/signInIcon.png';

const TabIcon = styled(Image)`
   opacity: ${({ focused }) => focused ? 1 : 0.4};
   width: 20px;
   height: 20px;
`;

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            keyboardHidesTabBar: true
        }}
        initialRouteName='Chat'
        screenOptions={({ route }) => ({
            tabBarLabel: () => <Text>{route.name}</Text>,
            tabBarIcon: ({ focused }) => {
                if (route.name === 'Chat')
                    return <TabIcon source={chatIcon} focused={focused} />
                else if (route.name === 'Profile')
                    return <TabIcon source={userIcon} focused={focused} />
                else if (route.name === 'Login')
                    return <TabIcon source={signInIcon} focused={focused} />
            }

        })}
    >
        <Tab.Screen name='Chat' component={ChatStackNavigator} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        {/* <Tab.Screen name='Login' component={LoginStackNavigator} /> */}
    </Tab.Navigator >
);

export default TabNavigator;