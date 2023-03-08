import React from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import { useState } from "react";

export default function MapSearchWidget({ placeholder, onSubmitText, onFocus }) {
  placeholder = placeholder ?? '搜索词'
  const [text, setText] = useState('');
  return (
    <View style={styles.bar}>
      <TextInput style={styles.search}
        placeholder={placeholder}
        onChangeText={setText}
        value={text}
        onSubmitEditing={() => { onSubmitText && onSubmitText(text) }}
        ref={input => { this.textInput = input }}
        onFocus={(e) => {
          this.textInput.blur();
          onFocus && onFocus(e);
        }}
        clearButtonMode='always'></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 44,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  search: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    paddingLeft: 25,
    backgroundColor: 'rgba(255 255 255 / .15)',
    marginVertical: 8,
    color: 'black',
  },
})