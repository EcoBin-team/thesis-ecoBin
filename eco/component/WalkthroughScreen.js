import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Images from "../images";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

export default function WalkthroughScreen() {
  const walkthroughtList = [
    {
      id: 1,
      title: "Easy Sale of Waste",
      description:
        "Selling Waste, Dispose of Your Trash at Designated Locations and Earn Rewards",
      image: Images.img1,
      img: Images.vector,
    },
    {
      id: 2,
      title: "Everything Can Be Recycled",
      description:
        "By Recycling, You Contribute to Earth Conservation and Community Well-being",
      image: Images.img2,
      img: Images.vector,
    },
    {
      id: 3,
      title: "Recycle at the Nearest Location",
      description:
        "By recycling, you contribute to the conservation of the Earth and the well-being of society",
      image: Images.img3,
      img: Images.vector,
    },
    {
      id: 4,
      title: "Join Us",
      description:
        "Together, Let's Become Agents of Waste Management Caring for the Future",
      image: Images.img4,
      img: Images.vector,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwiperIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const handleGetStarted = () => {
    // Perform action when "Get Started" button is pressed
    //  navigate to the main screen of my application
  };

  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.imageContainer}>
        <Swiper
          loop={false}
          paginationStyle={{
            position: "absolute",
            bottom: "25%",
          }}
          activeDotColor="#09E4AF"
          activeDotStyle={{ width: 20, height: 8 }}
          onIndexChanged={handleSwiperIndexChanged}
        >
          {walkthroughtList.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              <View style={styles.bottomContent}>
                <Image source={item.img} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </ScrollView>
  
    {currentIndex === walkthroughtList.length - 1 && (
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.buttonStyle} onPress={handleGetStarted}>
          <Text style={styles.textStartedStyle}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.9,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "80%",
    textAlign: "center",
    marginTop: 5,
    position: "absolute",
    bottom: "60%",
    zIndex: 1,
  },
  description: {
    fontSize: 13,
    width: "80%",
    textAlign: "center",
    marginTop: 20,
    position: "absolute",
    bottom: "30%",
    zIndex: 1,
  },
  buttonStyle: {
    backgroundColor: "#2DCC70",
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  textStartedStyle: {
    fontWeight: "bold",
  },
  bottomContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
