import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { register } from '../api/auth';
import { getDeviceId } from '../services/deviceIdentity';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const onRegister = async () => {
    try {
      const device_id = await getDeviceId();
      await register({ name, email, password, role, device_id });
      Alert.alert('Success', 'Registered, please login');
    } catch (err) {
      Alert.alert('Registration failed', err.response?.data?.error?.message || 'Unexpected error');
    }
  };

  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 8 }} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth: 1, padding: 8 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 8 }} />
      <Text>Role (student/teacher)</Text>
      <TextInput value={role} onChangeText={setRole} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}
