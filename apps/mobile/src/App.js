import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TeacherDashboard from './screens/TeacherDashboard';
import StudentDashboard from './screens/StudentDashboard';
import { useAuthStore } from './state/authStore';

export default function App() {
  const auth = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  if (auth.loading) return <Text>Loading...</Text>;

  if (!auth.token) {
    return (
      <View style={{ marginTop: 48 }}>
        {showRegister ? <RegisterScreen /> : <LoginScreen onLoggedIn={auth.signIn} />}
        <Button title={showRegister ? 'Back to Login' : 'Create Account'} onPress={() => setShowRegister(!showRegister)} />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 48 }}>
      <Text style={{ padding: 16 }}>Logged in as {auth.user?.role}</Text>
      {auth.user?.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
      <Button title="Logout" onPress={auth.signOut} />
    </View>
  );
}
