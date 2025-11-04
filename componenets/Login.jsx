import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Login() {

    const router=useRouter();

  return (
    <View>
      <Image source={require('./../assets/images/boat.jpg')}
        style={{
            width: '100%',
            height: 560
        }}
    />
    <View style={styles.container}>
        <Text style={{
            fontSize:30,
            fontFamily: 'outfit-bold',
            textAlign: 'center',
            marginTop: 10
        }}>
            MaiKedah
        </Text>
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 15,
            color:Colors.GRAY
        }}>
            Find your Dream Destnition with MaiKedah, an AI Planner with smart personalization for Kedah state.
        </Text>
        <TouchableOpacity style={styles.button}
            onPress={()=>router.push('auth/sign-in')}
        >
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize: 16,
            }}>Get Started</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.WHITE,
        marginTop:-28,
        height: '100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding: 25
    },

    button:{
        padding:15,
        backgroundColor:Colors.PEIMARY,
        borderRadius:99,
        marginTop:'25%'
    }
})