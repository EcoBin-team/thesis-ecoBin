import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Images from "../images";
import Swiper from "react-native-swiper";

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
    // Example: navigate to the main screen of your application
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        loop={false} // Set loop prop to false
        paginationStyle={{
          position: "absolute",
          bottom: "20%",
        }}
        activeDotColor="#09E4AF"
        activeDotStyle={{ width: 20, height: 8 }}
        onIndexChanged={handleSwiperIndexChanged}
      >
        {walkthroughtList.map((item, index) => (
          <View
            key={item.id}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text style={styles.textStyle}>{item.title}</Text>
            <Image source={item.image} style={styles.imageContainer} />
          </View>
        ))}
      </Swiper>

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
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    width: "40%",
    textAlign: "center",
  },
  imageContainer: {
    height: "70%",
    width: "90%",
    resizeMode: "contain",
    marginHorizontal: 15,
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
});
