import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumbers] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎登录</Text>
      <View>
        <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumbers} placeholder="请输入手机号"></TextInput>
        <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='请输入密码'></TextInput>
      </View>
      <Pressable style={styles.loginButton}>
        <Text style={{ color: 'white', fontSize: 16, width: 320, textAlign: 'center' }}>登录</Text>
      </Pressable>
      <Text style={{ fontSize: 14, color: '#3E4146', fontWeight: 'bold' }}>忘记密码？</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    flexDirection: 'column',
    marginBottom: 60,
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#F7F8F8',
    fontSize: 14,
    width: 320,
    height: 48,
    paddingLeft: 45,
    margin: 8,
    borderRadius: 24,
    color: '#B0B1B3',
  },
  loginButton: {
    justifyContent: 'center',
    width: 320,
    height: 48,
    alignContent: 'center',
    color: '#fff',
    borderRadius: 24,
    backgroundColor: '#2882FF',
    marginBottom: 24,
  }
});