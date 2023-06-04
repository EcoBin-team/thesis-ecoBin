import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';

const LaunchPage = () => {
  const logoRotation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoRotation, {
        toValue: 2, // Rotate 2 times (720 degrees)
        duration: 3000, // Adjust the duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 3000, // Adjust the duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: logoRotation.interpolate({
                inputRange: [0, 2],
                outputRange: ['0deg', '720deg'],
              }),
            },
          ],
        }}
      >
        <Image
          source={require('../../src/images/img1.png')}
          style={{ width: 200, height: 200 }}
        />
      </Animated.View>
      <Animated.View
        style={{
          opacity: fadeAnimation,
          marginTop: 5,
        }}
      >
        <Image
          source={require('../../src/images/logo.png')} 
          style={{ width: 250, height: 250 }}
        />
      </Animated.View>
    </View>
  );
};

export default LaunchPage;
