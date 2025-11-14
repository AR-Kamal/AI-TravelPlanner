import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import StartNewTripCard from '../../componenets/MyTrips/StartNewTripCard';
import { auth, db } from '../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import UserTripList from '../../componenets/MyTrips/UserTripList';

export default function MyTrip() {

  const [userTrips, setUserTrips]=useState([]);
  const [loading,setLoading]=useState(false);
  const user=auth.currentUser;

  useEffect(()=>{
    user&&GetMyTrips();
  },[user])


  const GetMyTrips=async()=>{
    setLoading(true)
    setUserTrips([]);
    const q=query(collection(db, 'Usertrips'),where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev=>[...prev,doc.data()])
   });
    setLoading(false);

  }
  return (
    <View style={{
      padding:25,
      paddingTop:55,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>

      
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:35
        }}>My Trip</Text>
        <Ionicons name="add-circle" size={50} color="black" />
      </View>

      {loading&&<ActivityIndicator size={'large'} color={Colors.PEIMARY}/>}

      {userTrips?.length==0?
        <StartNewTripCard/>:
        <UserTripList userTrips={userTrips}/>
      }
    </View>
  )
}