import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';

export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setEmail(user?.email ?? '');
    });
    return unsubscribe;
  }, []);

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
      padding:25,
      paddingTop:55,
      backgroundColor:Colors.WHITE,
      height:'100%'
      }}
    >
      <Text
        style={{
          fontFamily:'outfit-bold',
          fontSize:35
        }}
      >
        Profile
      </Text>
      <View>
        <Text style={{ 
          fontFamily: 'outfit', 
          fontSize: 16, 
          color:Colors.PEIMARY,
        }}>
          {email || 'No email available'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: Colors.PEIMARY,
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 10,
          marginTop:500
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 16,
            fontFamily: 'outfit',
            textAlign:'center',
            
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
