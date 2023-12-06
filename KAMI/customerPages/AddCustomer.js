import {React, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddService({navigation}) {
  const [cName, setCname] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  function addCustomer() {
    getData();
    axios
      .post(
        'https://kami-backend-5rs0.onrender.com/customers',
        {
          name: cName,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        Alert.alert('Added successfully');
        navigation.goBack();
      })
      .catch(function (error) {
        Alert.alert('Server error');
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Customer name*</Text>
        <TextInput
          value={cName}
          onChangeText={text => setCname(text)}
          placeholder="Input your customer's name"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          cursorColor="black"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Phone*</Text>
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          placeholder='Input phone number'
          keyboardType="numeric"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          cursorColor="black"
        />
      </View>
      <View style={{margin: 10}}>
        <Button title="Add" color={'#ef506b'} onPress={() => addCustomer()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
});
export default AddService;
