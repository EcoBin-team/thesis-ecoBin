import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { server_url } from '../../secret';
const ShopComponent = () => {
    const route = useRoute();
    const { userId } = route.params;
    console.log(userId)
  const [products, setProducts] = useState([]);
 console.log(userId)
const navigation = useNavigation();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${server_url}/getall`);
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.log('Error fetching shop products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(`${server_url}/users/${userId}`, {
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productsContainer}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.headerIcon} name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Shopping</Text>
     
    </View>
        {products.map((product, index) => (
          <Animatable.View key={product.id} style={styles.productContainer} animation="fadeInUp" delay={index * 100}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPoints}>Points: {product.points}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => addToCart(product.id)}>
              <View style={styles.buttonBackground}>
                <Image source={require('../../assets/carte.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Add to Cart</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
      <TouchableOpacity style={styles.goToCartButton} onPress={() => {navigation.navigate("cart",{ userId: userId })}}>
        <Text style={styles.goToCartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        height: 64,
        backgroundColor: 'white',
        elevation: 4, // Add shadow on Android
        shadowColor: '#000000', // Add shadow on iOS
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
      },
      headerIcon:{
        left: -125,
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
      },
  container: {
   
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: 50,
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
    top: -40,
    backgroundColor: '#6CC51D',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  goToCartButtonText: {
   
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ShopComponent;