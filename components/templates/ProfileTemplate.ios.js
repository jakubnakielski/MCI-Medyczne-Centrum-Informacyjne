import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

const ProfileTemplate = ({ children }) => (
    <KeyboardAvoidingView behavior='padding'>
        {children}
    </KeyboardAvoidingView>
);




export default ProfileTemplate;