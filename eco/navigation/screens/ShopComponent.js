import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
//import { server_url } from "../../secret";
const ShopComponent = () => {
  const [products, setProducts] = useState([]);
  const [balance, setBalance] = useState(0)
  const userId = 'djbXQSIvNVY6g7MpaIv93T21AEq1'; // Replace with the actual user ID

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.43.232:3000/getall'); // replace the http with { server_url }
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.log('Error fetching shop products:', error);
      }
    };

    const fetchBalance = async () => {
      try {
        const response = await axios.get(`http://192.168.43.232:3000/balance/${userId}`);
        const { balance } = response.data;
        setBalance(balance);
      } catch (error) {
        console.log('Error fetching user balance:', error);
      }
    };

    fetchProducts();
    fetchBalance();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(`http://192.168.43.232:3000/users/${userId}`, {
        userId: userId,
        productId: productId,
      });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error adding to cart:', error.response.data);
      // Handle the error
    }
  };

  return (
    <View style={styles.container}>
            <Text style={styles.balanceText}>Balance: {balance}</Text>
      <ScrollView contentContainerStyle={styles.productsContainer}>
        {products.map((product, index) => (
          <Animatable.View key={product.id} style={styles.productContainer} animation="fadeInUp" delay={index * 100}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPoints}>Points: {product.points}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => addToCart(product.id)}>
              <View style={styles.buttonBackground}>
                <Image source={require('../../src/images/carte.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Add to Cart</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.goToCartButton} onPress={() => {}}>
        <Text style={styles.goToCartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: 50,
    marginBottom: 50, 
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '49%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPoints: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6CC51D',
    padding: 8,
    borderRadius: 8,
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  goToCartButton: {
    backgroundColor: '#6CC51D',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  goToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ShopComponent;
