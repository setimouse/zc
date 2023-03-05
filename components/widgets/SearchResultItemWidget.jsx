import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";

export default function SearchResultItemWidget(props) {

  return (
    <View style={styles.searchbox}>
      <View style={styles.left}>
        {
          props.item.items.map(item => {
            return (
              <Text key={item.key} style={styles.infoText}>
                {item.key}: {item.value}
              </Text>
            )
          })
        }
      </View>
      <View style={styles.right}>
        <Text style={{ color: '#B0B1B3', fontSize: 14 }}>车辆详情 &raquo;</Text>
        <Image style={styles.icon} source={require('../../assets/locate.png')} />
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
