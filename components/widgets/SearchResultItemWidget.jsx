import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from "react-native";

export default function SearchResultItemWidget({ item, detailText, onTargetPress, onDetailPress }) {
  return (
    <View style={styles.searchbox}>
      <View style={styles.left}>
        <Pressable onPress={() => onDetailPress && onDetailPress()} style={{ backgroundColor: 'yellow' }}>
          {
            item.items.map(info => {
              // console.log(info)
              return (
                <Text key={info.key} style={styles.infoText}>
                  {info.key}: {info.value}
                </Text>
              )
            })
          }
        </Pressable>
      </View>
      <View style={styles.right}>
        {item.info.consumerName &&
          <Pressable onPress={() => onTargetPress && onTargetPress()}>
            <Image style={styles.icon} source={require('../../assets/locate.png')} />
          </Pressable>
        }
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  searchbox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  left: {
    flex: 1,
    overflow: 'hidden',
  },
  right: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'red',
    paddingLeft: 12,
  },
  infoText: {
    fontSize: 12,
    overflow: 'hidden',
    flexWrap: 'nowrap',
    marginBottom: 4,
    overflow: 'hidden',
  },
  icon: {
    width: 40,
    height: 24,
  }
});
