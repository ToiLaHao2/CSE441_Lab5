import {React, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Icon} from 'react-native-paper';

function TransactionDetail({navigation, route}) {
  const {item} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity title="options">
          <MenuComponent />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const MenuComponent = () => {
    return (
      <Menu>
        <MenuTrigger>
          <Icon source="dots-vertical" size={25} color="white" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => Alert.alert('edit pressed')}>
            <Text>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert('delete pressed')}>
            <Text>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

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

  function BText(props) {
        return (
            <Text style={[{ color: 'black', fontWeight: '600' }, props.style]}>
                {props.children}
            </Text>
        );
    }

  return (
    <View style={styles.container}>
      <View style={styles.Itemcontainer}>
        <Text style={styles.pinkText}>General information</Text>
        <View style={styles.GeneralContainer}>
          <View style={{flex: 2, justifyContent: 'space-around'}}>
            <BText>Transaction code </BText>
            <BText>Customer </BText>
            <BText>Creation time </BText>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'flex-end',
              justifyContent: 'space-around',
            }}>
            <BText>{item.id}</BText>
            <BText>
              {item.customer.name} - {item.customer.phone}
            </BText>
            <BText>{dateFormater(item.createdAt)}</BText>
          </View>
        </View>
      </View>
      <View style={styles.Itemcontainer}>
        <Text style={styles.pinkText}>Service list</Text>
        <View style={styles.ServiceContainer}>
          <View style={{flex: 2, justifyContent: 'space-around'}}>
            {item.services.map(service => {
              return <BText key={service._id}>{service.name}</BText>;
            })}
          </View>
          <View
            style={{
              flex: 0,
              alignItems: 'flex-end',
              justifyContent: 'space-around',
            }}>
            {item.services.map(service => {
              return <Text key={service._id}>x{service.quantity}</Text>;
            })}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-around',
            }}>
            {item.services.map(service => {
              return (
                <BText key={service._id}>
                  {priceFormater(service.price)}{' '}
                  <BText style={{textDecorationLine: 'underline'}}>
                    đ
                  </BText>
                </BText>
              );
            })}
          </View>
        </View>
        <View style={{justifyContent: 'space-around'}}>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <BText style={{flex: 1}}>Total</BText>
          <View>
            <BText style={{flex: 1}}>
              {item.price.toLocaleString('de-DE')}{' '}
              <BText style={{textDecorationLine: 'underline'}}>đ</BText>
            </BText>
          </View>
        </View>
      </View>
      <View style={styles.Itemcontainer}>
        <Text style={styles.pinkText}>Service list</Text>
        <View style={styles.CostContainer}>
          <View style={{flex: 2, justifyContent: 'space-around'}}>
            <BText>Amount of money</BText>
            <BText>Discout</BText>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'flex-end',
              justifyContent: 'space-around',
            }}>
            <BText>
              {item.priceBeforePromotion.toLocaleString('de-DE')}{' '}
              <BText style={{textDecorationLine: 'underline'}}>đ</BText>
            </BText>
            <BText>
              -{priceFormater(item.priceBeforePromotion - item.price)}{' '}
              <BText style={{textDecorationLine: 'underline'}}>đ</BText>
            </BText>
          </View>
        </View>
        <View style={{justifyContent: 'space-around'}}>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <BText style={{flex: 1}}>Total</BText>
          <View>
            <BText style={[{flex: 1}, styles.pinkText]}>
              {item.price.toLocaleString('de-DE')}{' '}
              <BText
                style={[{textDecorationLine: 'underline'}, styles.pinkText]}>
                đ
              </BText>
            </BText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Itemcontainer: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  GeneralContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 90,
  },
  ServiceContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 140,
  },
  CostContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
  },
  pinkText: {
    fontSize: 16,
    color: '#ef506b',
    fontWeight: 'bold',
  },
});

export default TransactionDetail;
