import {React, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {Icon, FAB} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

keyExtractor = ({_id}) => _id;

function Transaction({navigation}) {
  const [transaction, setTransaction] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTransaction();
    }
  }, [isFocused]);

  function getTransaction() {
    axios
      .get('https://kami-backend-5rs0.onrender.com/transactions')
      .then(function (response) {
        setTransaction(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function dateFormater(dString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dString);
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(
      date,
    );
    return formattedDate.replace(',', '');
  }

  function priceFormater(priceIn) {
    let formattedPrice = priceIn;
    if (priceIn > 1000000000) {
      formattedPrice =
        (priceIn / 1000000000).toFixed(2).toLocaleString('de-DE') + 'B';
    } else {
      formattedPrice = priceIn.toLocaleString('de-DE');
    }
    return formattedPrice;
  }

  const renderTrans = ({item}) => {
    const {customer, id, price, services, status, updatedAt} = item;
    return (
      <TouchableOpacity
        style={styles.itemBox}
        onPress={() => {
          navigation.navigate('TransactionDetail', {item});
        }}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>
            {id} - {dateFormater(updatedAt)}
            {status == 'cancelled' ? (
              <Text style={styles.pinkText}> - Cancelled</Text>
            ) : null}
          </Text>
          <View>
            {services.map(service => {
              return (
                <Text
                  key={service._id}
                  numberOfLines={1}
                  style={{color: 'black'}}>
                  - {service.name}
                </Text>
              );
            })}
          </View>
          <Text>Customer: {customer.name}</Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.pinkText}>
            {priceFormater(price)}{' '}
            <Text style={{textDecorationLine: 'underline'}}>đ</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={transaction}
        renderItem={renderTrans}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.button}>
        <Button
          title="+"
          color={'#EF506C'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  itemBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    underlayColor: 'grey',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
  },

  price: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pinkText: {
    color: '#EF506C',
  },
});

export default Transaction;
