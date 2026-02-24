import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { getActiveSession } from '../api/session';
import { markAttendance } from '../api/attendance';
import { getDeviceId } from '../services/deviceIdentity';
import { validateNetwork } from '../services/networkValidation';

export default function StudentDashboard() {
  const [status, setStatus] = useState('Idle');

  const onMarkAttendance = async () => {
    try {
      const { data: activeData } = await getActiveSession();
      const session = activeData.session;
      const device_id = await getDeviceId();
      const net = await validateNetwork(session.router_ip);

      if (!net.valid) {
        Alert.alert('Invalid network', 'Connect to the classroom WiFi/router LAN and retry.');
        return;
      }

      await markAttendance({
        session_id: session._id,
        device_id,
        device_ip: net.localIp,
        gateway_ip: net.gatewayIp
      });

      setStatus('Attendance marked successfully');
    } catch (err) {
      setStatus(err.response?.data?.error?.message || 'Attendance failed');
    }
  };

  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Text>{status}</Text>
      <Button title="Mark Attendance" onPress={onMarkAttendance} />
    </View>
  );
}
