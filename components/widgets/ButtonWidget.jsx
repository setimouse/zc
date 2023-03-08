import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";

export default function ButtonWidget({ title, onPress }) {
  return (
    <Pressable onPress={() => onPress && onPress()}>
      <Text style={styles.button}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    color: 'white',
    width: '100%',
    padding: 8,
    borderRadius: 4,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#2882FF',
  },
})