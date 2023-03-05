import React from "react";
import { StyleSheet, Pressable, View, Text, Image } from "react-native";

export default function MapButtonWidget(props) {
  return (
    <Pressable>
      <View style={styles.button}>
        <Image style={styles.icon} source={props.icon} />
        <Text style={styles.text}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 8,
    paddingBottom: 4,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    fontSize: 8,
  }
})