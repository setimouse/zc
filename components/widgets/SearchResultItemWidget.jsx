import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from "react-native";

export default function SearchResultItemWidget({ item, detailText, onTargetPress, onDetailPress }) {
  return (
    <View style={styles.searchbox}>
      <View style={styles.left}>
        {
          item.items.map(info => {
            console.log(info)
            return (
              <Text key={info.key} style={styles.infoText}>
                {info.key}: {info.value}
              </Text>
            )
          })
        }
      </View>
      <View style={styles.right}>
        <Pressable onPress={() => onDetailPress && onDetailPress()}>
          <Text style={{ color: '#B0B1B3', fontSize: 14 }}>{detailText} &raquo;</Text>
        </Pressable>
        <Pressable onPress={() => onTargetPress && onTargetPress()}>
          <Image style={styles.icon} source={require('../../assets/locate.png')} />
        </Pressable>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  searchbox: {
    // flex: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  left: {
    // flex: 6
  },
  right: {
    // flex: 4
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  infoText: {
    fontSize: 12,
    marginBottom: 4,
  },
  icon: {
    width: 40,
    height: 24,
  }
});
