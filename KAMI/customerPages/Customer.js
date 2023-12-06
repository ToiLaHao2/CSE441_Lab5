import {React, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, Button} from 'react-native';
import {Icon} from 'react-native-paper';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

keyExtractor = ({_id}) => _id;

function Customer({navigation}) {
  const [customer, setCustomer] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCustomer();
    }
  }, [isFocused]);

  function getCustomer() {
    axios
      .get('https://kami-backend-5rs0.onrender.com/customers')
      .then(function (response) {
        setCustomer(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const renderCustomers = ({item}) => {
    const {name, phone, loyalty, totalSpent} = item;
    return (
      <View style={styles.cusContainer}>
        <View style={styles.info}>
          <Text style={styles.text}>
            Customer: <Text>{name}</Text>
          </Text>
          <Text style={styles.text}>
            Phone: <Text>{phone}</Text>
          </Text>
          <Text style={styles.text}>
            Total money:{' '}
            <Text style={{color: '#ef506b', fontWeight: 'bold'}}>
              {totalSpent}
            </Text>
          </Text>
        </View>
        <View>
          <Icon source="chess-queen" color="#ef506b" size={25} />
          <Text style={styles.text}>
            {loyalty == 'member' ? 'Member' : 'Guest'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={customer}
        renderItem={renderCustomers}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.button}>
        <Button
          title="+"
          color={'#EF506C'}
          onPress={() => navigation.navigate('AddCustomer')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cusContainer: {
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  info: {
    flex: 4,
  },
  button: {
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  text: {
    color: 'black',
  },
});

export default Customer;
