import React, { useRef, useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TextInput, Keyboard, Animated } from 'react-native';
import styled from 'styled-components';
import store from '../store';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/atoms/Button';

const Container = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
`;
const StyledImage = styled(Animated.Image)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const NameText = styled(Text)`
  font-size: 22px;
`;
const DescriptionText = styled(Text)`
  font-size: 14px;
  color: grey;
`;
const ButtonsWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 150px;
`;
const DescriptionInput = styled(TextInput)`
  flex: 1;
  height: 50px;
  background-color: #ccc;
  padding: 0 10px;
`;
const ImageWrapper = styled(View)``;
const LeverIndicator = styled(Animated.View)`
 background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
`;
const LevelIndicatorText = styled(Text)`
  color: white;
  font-size: 12px;
  text-align: center;
`;
const SetDescriptionWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  height: 50px;
`;
const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

let socket;

const ProfileScreen = () => {
  const inputRef = useRef(null);
  const [currentDescription, setDescription] = useState('Description');
  const [inputContent, setInputContent] = useState('');
  const [level, setLevel] = useState(1);

  const handlePress = () => {
    inputRef.current.focus();
  }
  const changeDescription = () => {
    if (inputContent === '') return;

    setDescription(inputContent);
    setInputContent('');
    Keyboard.dismiss();

    AsyncStorage.setItem('DESCRIPTION', inputContent);
  }
  const handleInputChange = (text) => {
    setInputContent(text)
  }
  const levelUp = () => {
    // setLevel(parseInt(level) + 1);
    // AsyncStorage.setItem('LEVEL', String(level + 1));
  }

  return (
    <Container>
      <Content>
        <ImageWrapper>
          <StyledImage
            // source={profileImage}
          />
          <LeverIndicator>
            <LevelIndicatorText>{level}</LevelIndicatorText>
          </LeverIndicator>
        </ImageWrapper>

        <View>
          <NameText>Jan Nowak</NameText>
          <DescriptionText>{currentDescription}</DescriptionText>
        </View>

        <ButtonsWrapper>
          <Button onPress={handlePress}>Focus</Button>
          <Button onPress={levelUp}>Upgrade</Button>
        </ButtonsWrapper>
      </Content>
    </Container>
  )
};

export default ProfileScreen;
