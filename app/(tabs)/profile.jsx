import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      router.replace('auth/sign-in'); // Redirect to sign-in screen
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          marginBottom: 30,
          fontFamily: 'outfit-bold',
        }}
      >
        Profile
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: Colors.PEIMARY,
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 16,
            fontFamily: 'outfit',
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
