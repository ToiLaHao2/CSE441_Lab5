import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/Login';
import MainNavigation from './pages/MainNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return <Login />;
};

export default App;
