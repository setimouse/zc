import React, { useState } from "react";
import { StyleSheet, View, TextInput, FlatList, Text, Image } from "react-native";
import IconHistory from '../../assets/history.png';
import IconCross from '../../assets/cross.png';

function Item({ item }) {
  return (
    <View style={styles.suggest}>
      <View style={styles.left} >
        <Image style={styles.icon} source={IconHistory} />
        <Text style={styles.text}>{item.word}</Text>
      </View>
      <View style={styles.right}>
        <Image style={styles.cross} source={IconCross} />
      </View>
    </View >
  )
}

export default function SearchBarWidget({ placeholder, suggests, onSubmit, onChangeText, resultPage }) {
  const [text, setText] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.bar} ref={bar => this.bar = bar}>
        <TextInput style={styles.search}
          placeholder={placeholder ?? '搜索词'}
          clearButtonMode='always'
          onChangeText={(text) => {
            setText(text)
            onChangeText && onChangeText(text)
          }}
          autoFocus={true}
          onFocus={() => {
            setSearching(true);
          }}
          onBlur={() => {
            setSearching(false);
            setResult(true);
          }}
          onSubmitEditing={() => {
            onSubmit && onSubmit(text);
          }}
        />
      </View>
      {result &&
        <View style={styles.mainpage}>
          {resultPage}
        </View>
      }
      {searching &&
        <View style={styles.history}>
          <FlatList
            data={suggests}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <Item item={item} />}
          />
          {suggests && suggests.length > 0 &&
            <View style={styles.clearView}>
              <Text style={styles.clear}>清空历史</Text>
            </View>
          }
        </View>
      }
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
  history: {
    position: 'absolute',
    top: 45, left: 0,
    zIndex: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  suggest: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    padding: 12,
    borderBottomColor: '#DDDEDF',
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: 'center',
  },
  icon: {
    width: 16, height: 16,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: '#3E4146',
  },
  cross: {
    width: 16, height: 16,
  },
  mainpage: {
    backgroundColor: '#F7F8F8',
  },
  clearView: {
    marginVertical: 16,
    alignItems: 'center',
  },
  clear: {
    color: '#3E4146',
    fontSize: 12,
  }
})