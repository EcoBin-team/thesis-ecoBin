import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 100,
    marginLeft: 15,
  },
  name: {
    fontFamily: "MontserratBold",
    fontSize: 17,
    marginLeft: 15
  }
})

export default styles