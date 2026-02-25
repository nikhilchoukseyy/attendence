import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { startSession, getActiveSession } from '../api/session';

export default function TeacherDashboard() {
  const [routerIp, setRouterIp] = useState('192.168.1.1');
  const [active, setActive] = useState(null);

  const onStart = async () => {
    try {
      const { data } = await startSession({ router_ip: routerIp, duration_minutes: 5 });
      setActive(data.session);
      Alert.alert('Started', 'Attendance session is active for 5 minutes');
    } catch (err) {
      Alert.alert('Error', err.response?.data?.error?.message || 'Could not start session');
    }
  };

  const onRefresh = async () => {
    try {
      const { data } = await getActiveSession();
      setActive(data.session);
    } catch {
      setActive(null);
    }
  };

  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Text>Router IP</Text>
      <TextInput value={routerIp} onChangeText={setRouterIp} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Start Attendance" onPress={onStart} />
      <Button title="Refresh Active Session" onPress={onRefresh} />
      {active ? <Text>Active session: {active._id}</Text> : <Text>No active session</Text>}
    </View>
  );
}
