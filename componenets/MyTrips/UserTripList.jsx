import moment from 'moment';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function UserTripList({userTrips}) {


    const LocalData = JSON.parse(userTrips[0].tripData);

  return (
    <View>
      <View>
        <Image source={require('./../../assets/images/kedahs.jpeg')}
            style={{
                width:'100%',
                height:300,
                objectFit:'cover',
                borderRadius:15
            }}        
        />
        <View style={{
            marginTop:10,
        }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20,

            }}>{userTrips[0].tripPlan?.location}</Text>

            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:5
            }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:17,
                color:Colors.GRAY
            }}>{moment(LocalData.startDate).format('DD MMM YYYY')}</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:17,
                color:Colors.GRAY
            }}>{LocalData.traveler.title}</Text>
            </View>
            <TouchableOpacity 
                onPress={()=>onClickContinue()}
                style={{
                padding:15,
                backgroundColor:Colors.PEIMARY,
                borderRadius:15,
                marginTop:20}}>
                <Text style={{
                    textAlign:'center',
                    color:Colors.WHITE,
                    fontFamily:'outfit-medium',
                    fontSize:20,
                }}>Continue</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}