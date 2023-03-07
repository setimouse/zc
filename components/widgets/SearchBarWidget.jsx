import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function SearchBarWidget({ placeholder, onSubmit }) {
  const [text, setText] = useState('');

  return (
    <View style={styles.bar}>
      <TextInput style={styles.search}
        placeholder={placeholder ?? '搜索词'}
        clearButtonMode='always'
        onChangeText={setText}
        onSubmitEditing={() => onSubmit && onSubmit(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 44,
    width: '100%',
    backgroundColor: '#2882FF',
    paddingHorizontal: 12,
  },
  search: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    paddingLeft: 25,
    backgroundColor: 'rgba(255 255 255 / .15)',
    marginVertical: 8,
    color: 'white',
  },
})