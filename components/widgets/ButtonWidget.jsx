import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";

export default function ButtonWidget({ title, onPress }) {
  return (
    <Pressable style={styles.press} onPress={() => onPress && onPress()}>
      <Text style={styles.button}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  press: {
    height: 40,
    width: '100%',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#2882FF',
  },
  button: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
})