import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, FlatList, Text, Image, Pressable, TouchableOpacity } from "react-native";
import IconHistory from '../../assets/history.png';
import IconCross from '../../assets/cross.png';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { EvilIcons } from '@expo/vector-icons';

function Item({ item, onDelete, onSelected }) {
  console.log('word', item)
  return (
    <View style={styles.suggest}>
      <Pressable style={[styles.left, { flex: 1, height: 44 }]}
        onPress={() => onSelected && onSelected(item.word)}
      >
        <Image style={styles.icon} source={IconHistory} />
        <Text style={styles.text}>{item.word}</Text>
      </Pressable>
      {onDelete &&
        <Pressable style={{ padding: 8, }}
          onPress={() => {
            console.log('pressed remove')
            onDelete && onDelete(item.word)
          }}
        >
          <Image style={styles.cross} source={IconCross} />
        </Pressable>
      }
    </View >
  )
}

export default function SearchBarWidget({ placeholder, storeKey, onSubmit, onChangeText,
  resultPage, initStatus, rightButton, autoFocus, suggests: customSuggests }) {
  const [text, setText] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(false);
  const [suggests, setSuggests] = useState([]);
  const [history, setHistory] = useState([]);
  const storage = useAsyncStorage(`searchbar-suggest-${storeKey}`)

  let makeHistory = (word) => {
    return { word: word }
  }
  console.log('storeKey', storeKey)

  let addHistory = async (word) => {
    if (storeKey == undefined) {
      return
    }
    if (word == '') {
      return
    }
    var history = await loadHistory()
    console.log('history', history)
    history = history.filter(e => e.word != word)
    history.unshift(makeHistory(word))
    history = history.splice(0, 5)
    await storage.setItem(JSON.stringify(history))
    setHistory(history)
  }

  let loadHistory = async () => {
    if (storeKey == undefined) {
      return []
    }
    let string = await storage.getItem()
    if (null == string) {
      return []
    }
    try {
      return JSON.parse(string)
    } catch (e) {
      return []
    }
  }

  let removeHistory = async (word) => {
    console.log('remove')
    if (storeKey == undefined) {
      return
    }
    var history = await loadHistory()
    history = history.filter(e => e.word != word)
    console.log('after remove', history)
    await storage.setItem(JSON.stringify(history))
    setHistory(history)
  }

  let clearHistory = async () => {
    if (storeKey == undefined) {
      return
    }
    storage.removeItem()
    setHistory([])
  }

  useEffect(() => {
    loadHistory()
      .then(history => {
        setHistory(history)
      })
    if (initStatus) {
      let { isSearching, isResult } = initStatus;
      isSearching !== null && setSearching(isSearching)
      isResult !== null && setResult(isResult)
    }

  }, [])

  function search(word) {
    addHistory(word)
    onSubmit && onSubmit(word);
    setSearching(false);
    setResult(true);
    setText(word)
  }

  useEffect(() => {
    if (customSuggests !== undefined) {
      return
    }
    setSuggests(history.filter(e => e.word.indexOf(text) > -1).splice(0, 10))
  }, [text, history])

  useEffect(() => {
    if (customSuggests) {
      setSuggests(customSuggests.map(e => ({ 'word': e })))
    }
  }, [customSuggests])

  var searchBox;
  return (
    <View style={styles.container}>
      <View style={styles.bground}>
        <View style={styles.bar} ref={bar => this.bar = bar}>
          <EvilIcons name="search" size={22} color="white" />
          <TextInput style={styles.search}
            value={text}
            maxLength={100}
            ref={c => searchBox = c}
            placeholder={placeholder ?? '搜索词'}
            placeholderTextColor={'rgba(255 255 255 / .7)'}
            clearButtonMode='always'
            onChangeText={(text) => {
              setText(text)
              if (onChangeText) {
                let { isSearching, isResult } = onChangeText(text)
                isSearching !== null && setSearching(isSearching)
                isResult !== null && setResult(isResult)
              }
            }}
            autoFocus={autoFocus}
            onFocus={() => {
              setSearching(true);
            }}
            onSubmitEditing={() => search(text)}
          />
        </View>
        {rightButton}
      </View>
      {
        result
        && <View style={[styles.mainpage]}>
          {/* <Text>result</Text> */}
          {resultPage}
        </View>
      }

      {searching &&
        <View style={styles.history}>
          <FlatList
            data={suggests}
            keyExtractor={({ word }) => word}
            renderItem={({ item }) => <Item
              item={item}
              onDelete={customSuggests ? null : (word) => {
                removeHistory(word)
                searchBox.focus()
              }}
              onSelected={word => search(word)}
            />}
            scrollEnabled={false}
          />
          {suggests && suggests.length > 0 &&
            <View>
              {/* <Pressable style={styles.clearView}
                onPress={() => clearHistory()}
              >
                <Text style={styles.clear}>清空历史</Text>
              </Pressable> */}
              <Pressable style={{ height: 1024 }}
                onPress={() => {
                  searchBox.blur()
                  setSearching(false);
                  setResult(true);
                }}
              ></Pressable>
            </View>
          }
        </View>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255 255 255 / .15)',
    width: '100%',
    flex: 1,
  },
  bground: {
    backgroundColor: '#2882FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 99999,
  },
  bar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255 255 255 / .15)',
    margin: 6,
    borderRadius: 4,
    flex: 1,
  },
  search: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    paddingLeft: 4,
    marginVertical: 8,
    color: 'white',
    alignContent: 'center'
  },
  history: {
    position: 'absolute',
    top: 49, left: 0,
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
    flex: 1,
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