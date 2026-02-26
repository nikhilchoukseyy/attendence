import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login } from '../api/auth';
import { getDeviceId } from '../services/deviceIdentity';
import { getApiErrorMessage } from '../utils/errorMessage';

export default function LoginScreen({ onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const device_id = await getDeviceId();
      const { data } = await login({ email, password, device_id });
      onLoggedIn(data.token, data.user);
    } catch (err) {
      Alert.alert('Login failed', getApiErrorMessage(err, 'Unexpected error while logging in'));
    }
  };

  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth: 1, padding: 8 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
