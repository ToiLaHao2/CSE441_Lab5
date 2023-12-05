import React from 'react';
import {BottomNavigation, Text, Icon} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home'
import ServiceDetail from './ServiceDetail';
import AddService from './AddAService';
import {TouchableOpacity} from 'react-native';
import EditService from './EditService';

function MainNavigation() {
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

  const Transaction = () => <Text>Transaction</Text>;

  const Customer = () => <Text>Customer</Text>;

  const Setting = () => <Text>Setting</Text>;

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
      transaction: Transaction,
      customer: Customer,
      setting: Setting,
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
