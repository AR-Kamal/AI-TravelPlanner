import { Text, View } from 'react-native'
import { Colors } from '../../constants/Colors'

export default function discover() {
  return (
    <View style={{
      padding:25,
      paddingTop:55,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35
        
      }}>Discover</Text>
    </View>
  )
}