import React from "react";
import { StyleSheet, View, TextInput, Keyboard, Pressable } from "react-native";
import { useState } from "react";
import { EvilIcons } from '@expo/vector-icons';

export default function MapSearchWidget({ placeholder, onSubmitText, onFocus }) {
  placeholder = placeholder ?? '搜索词'
  const [text, setText] = useState('');
  return (
    <View style={styles.bar}>
      <EvilIcons name="search" size={24} style={{ color: "#3E4146" }} />
      <TextInput style={styles.search}
        placeholder={placeholder}
        onChangeText={setText}
        value={text}
        onSubmitEditing={() => { onSubmitText && onSubmitText(text) }}
        ref={input => { this.textInput = input }}
        onFocus={(e) => {
          this.textInput.blur();
          Keyboard.dismiss()
          onFocus && onFocus(e);
        }}
        clearButtonMode='always'></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    shadowColor: 'rgba(0 0 0 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius: 4,
    flex: 1,
  },
  search: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    paddingLeft: 5,
    backgroundColor: 'rgba(255 255 255 / .15)',
    marginVertical: 8,
    color: 'black',
  },
})