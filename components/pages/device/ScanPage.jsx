/**
 * 扫描二维码
 */
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default function ScanPage() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(false);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000', flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    window: {
      width: 263, height: 263,
      borderColor: '#fff',
    },
    tint: {
      alignContent: 'center',
      marginTop: 100,
    },
    text: {
      color: '#fff',
      marginTop: 20,
      fontSize: 14,
    },
    scanner: {
      padding: 3,
    }
  });

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status == 'granted')
    })()
  }

  useEffect(() => {
    askForCameraPermission()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('type:', type, 'data:', data)
    // todo 设备详情接口需要增加按照 设备编码 查询设备详情
    navigation.replace('devicedetail', { deviceId: data })
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flex: .618 }}>
        <ImageBackground source={require('../../../assets/scanbox.png')} style={styles.scanner}>
          <BarCodeScanner style={styles.window}
            onBarCodeScanned={handleBarCodeScanned}
          />
        </ImageBackground>
        <View style={styles.tint}>
          <MaterialCommunityIcons name="flashlight" size={24} style={{ alignSelf: 'center' }} color="white" />
          <Text style={styles.text}>将二维码/条形码放入框内，即可自动扫描</Text>
        </View>
      </View>
    </View>
  )
}
