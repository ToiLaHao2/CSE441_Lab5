import React from 'react';
import {BottomNavigation, Text, Icon} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import Home from '../serVicePages/Home';
import ServiceDetail from '../serVicePages/ServiceDetail';
import AddService from '../serVicePages/AddAService';
import EditService from '../serVicePages/EditService';
import Customer from '../customerPages/Customer';
import AddCustomer from '../customerPages/AddCustomer';
import Transaction from '../transactionsPages/Transaction';
import TransactionDetail from '../transactionsPages/TransactionDetail';
import Setting from './Setting';

function MainNavigation({setTrigger}) {
  const HomeRoute = () => {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ef506b',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ServiceDetail"
            component={ServiceDetail}
            options={{
              title: 'Service detail',
              headerRight: () => <TouchableOpacity title="options" />,
            }}
          />
          <Stack.Screen
            name="AddService"
            component={AddService}
            options={{title: 'Add Service'}}
          />
          <Stack.Screen
            name="EditService"
            component={EditService}
            options={{title: 'Edit Service'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const TransactionR = () => {
    const TransactionStack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <TransactionStack.Navigator
          initialRouteName="Transaction"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ef506b',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <TransactionStack.Screen
            name="Transaction"
            component={Transaction}
            options={{title: 'Transaction'}}
          />
          <TransactionStack.Screen
            name="TransactionDetail"
            component={TransactionDetail}
            options={{title: 'Transaction Detail'}}
          />
        </TransactionStack.Navigator>
      </NavigationContainer>
    );
  };

  const CustomerR = () => {
    const CustomerStack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <CustomerStack.Navigator
          initialRouteName="Customer"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ef506b',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <CustomerStack.Screen
            name="Customer"
            component={Customer}
            options={{title: 'Customer'}}
          />
          <CustomerStack.Screen
            name="AddCustomer"
            component={AddCustomer}
            options={{title: 'Add Customer'}}
          />
        </CustomerStack.Navigator>
      </NavigationContainer>
    );
  };

  const SettingR = () => {
    const SettingStack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <SettingStack.Navigator
          initialRouteName="Setting"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ef506b',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <SettingStack.Screen name="Setting" options={{title: 'Setting'}}>
            {props => <Setting {...props} setTrigger={setTrigger} />}
          </SettingStack.Screen>
        </SettingStack.Navigator>
      </NavigationContainer>
    );
  };

  const MyComponent = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      {key: 'home', title: 'Home', focusedIcon: 'home'},
      {key: 'transaction', title: 'Transaction', focusedIcon: 'cash'},
      {key: 'customer', title: 'Customer', focusedIcon: 'account'},
      {key: 'setting', title: 'Setting', focusedIcon: 'cog'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
      home: HomeRoute,
      transaction: TransactionR,
      customer: CustomerR,
      setting: SettingR,
    });

    return (
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        compact={true}
        activeColor="#ef506b"
        renderIcon={({route, focused}) => (
          <Icon
            source={route.focusedIcon}
            color={focused ? '#ef506b' : 'gray'}
            size={30}
          />
        )}
        barStyle={{
          backgroundColor: 'white',
          borderTopColor: 'lightgrey',
          borderTopWidth: 1,
        }}
      />
    );
  };

  return <MyComponent />;
}
export default MainNavigation;
