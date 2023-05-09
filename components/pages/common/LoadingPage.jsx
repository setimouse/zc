/**
 * 页面加载
 */
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} color={'#2882FF'} style={{ marginBottom: 10 }}></ActivityIndicator>
      <Text style={{ fontSize: 14, color: '#B0B1B3' }}>页面加载中</Text>
    </View>
  )
}
