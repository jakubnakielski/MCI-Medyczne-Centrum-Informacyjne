import React from 'react';
import { StatusBar } from 'react-native';
// import TabNavigator from './Navigators/TabNavigator';
import LoginStackNavigator from './Navigators/Login/StackNavigator';
import MainTemplate from './components/templates/MainTemplate';
import LoginScreen from './screens/LoginScreen';

const App = () => (
  <MainTemplate>
    <StatusBar
      backgroundColor='#F0F2F5'
      barStyle="dark-content"
    />
    <LoginStackNavigator />
  </MainTemplate>

);

export default App;
