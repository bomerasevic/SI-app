import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text, Image
} from 'react-native';

import Puzzle from "../assets/cart.png";
function ItemCustomers({ item,openItem }) {
  const {kolicina,nazivProizvoda,cijenaProizvoda,jedinicaMjere,sifra} = item;
  return (
    <TouchableOpacity
    
    onPress={() => openItem(item)}
      style={[
        styles.item,
        { backgroundColor:  'white' },
      ]}
    >
      <Image
        style={styles.image}
        source={Puzzle}
      />
      
    <Text style={styles.title}>{nazivProizvoda}-{sifra}</Text>
    <Text style={styles.description}>{kolicina} x {cijenaProizvoda}KM</Text>
      <Text style={styles.description2}>Mjera:{jedinicaMjere}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightcyan',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    height: 70
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    position: "absolute",
    top: 10,
    left: 80,
    color: 'black'
  },
  description: {
    fontSize: 14,
    color: 'black',
    position: "absolute",
    top: 40,
    left: 80,
  },
  description2: {
    fontSize: 14,
    color: 'black',
    position: "absolute",
    top: 40,
    left: 200,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
});
export { ItemCustomers };