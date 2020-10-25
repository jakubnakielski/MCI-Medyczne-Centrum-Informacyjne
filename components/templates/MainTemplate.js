import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { NavigationContainer } from '@react-navigation/native';

const MainTemplate = ({ children }) => (
    <Provider store={store}>
        <NavigationContainer>
            {children}
        </NavigationContainer>
    </Provider>

);

export default MainTemplate;