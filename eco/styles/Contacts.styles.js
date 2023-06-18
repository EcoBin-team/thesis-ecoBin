import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  header: {
    color: "#09E4AF",
    fontFamily: "MontserratBold",
    fontSize: 24,
    marginLeft: 15
  },
  search: {
    backgroundColor: "#ECECEC",
    width: 400,
    height: 39,
    borderRadius: 5,
    margin: 10,
    fontFamily: "MontserratMedium",
  },
  searchVector: {
    position: "absolute",
    top: 20,
    left: 40
  },
  createChat: {
    height: 40,
    width: 40,
  },
  createChatButton: {
    marginLeft: "auto",
    marginRight: 10
  },
  createContainer: {
    flex: 1,
    alignSelf: "flex-end",
    marginRight: 10
  }
})

export default styles