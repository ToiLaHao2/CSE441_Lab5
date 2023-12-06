import {React, useState, useEffect} from 'react';
import {Button, Menu, TextInput} from 'react-native-paper';
import {View, Text, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MainNavigation from './MainNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';

const Login = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [logined, setLogined] = useState(false);
  function authentication() {
    axios
      .post('https://kami-backend-5rs0.onrender.com/auth', {
        phone: text,
        password: password,
      })
      .then(function (response) {
        storeData(response.data);
        storeToken(response.data.token);
        setLogined(true);
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Wrong information');
      });
  }

  //storing data
  const storeToken = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('data', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  if (logined) {
    return (
      <SafeAreaProvider>
        <MenuProvider>
          <MainNavigation />
        </MenuProvider>
      </SafeAreaProvider>
    );
  } else
    return (
      <View
        style={{backgroundColor: 'f2f2f2', flex: 1, justifyContent: 'center'}}>
        <View style={styles.container}>
          <Text style={styles.textTitle}> Login </Text>
          <TextInput
            keyboardType="numeric"
            label={'Phone'}
            value={text}
            onChangeText={text => setText(text)}
            style={styles.textInput}
            mode="outlined"
          />
          <TextInput
            label={'Password'}
            value={password}
            onChangeText={password => setPassword(password)}
            style={styles.textInput}
            mode="outlined"
            secureTextEntry={hidePass ? true : false}
            right={
              <TextInput.Icon
                icon={hidePass ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setHidePass(!hidePass)}
              />
            }
          />
          <Button
            mode="contained"
            onPress={() => authentication()}
            style={styles.button}>
            <Text style={{color: 'white', fontSize: 18}}> Login </Text>
          </Button>
        </View>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
  },
  textTitle: {
    color: '#ef506b',
    fontSize: 60,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: 'silver',
  },
  button: {
    height: 50,
    backgroundColor: '#ef506b',
    borderRadius: 10,
    justifyContent: 'center',
  },
});
export default Login;
