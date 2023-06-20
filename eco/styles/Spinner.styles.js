import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container:{
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center"
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  loaderIcon: {
    width: 50,
    height: 50,
  },
})

export default styles