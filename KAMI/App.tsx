import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Navigator/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return <Login />;
};

export default App;
