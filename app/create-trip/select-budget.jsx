import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function SelectBudget() {

    const navigation=useNavigation();
    const [selectBudger,setSelectBudget]=useState();

    useEffect(()=>{
        navigation.setOptions=({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'',
        });
    },[]);

  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:20}}
    >Budget</Text>

        <View style={{
            marginTop:20,
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:20,
            }}>Choose spending hapits for your trip</Text>

            <FlatList
                data={SelectTravelesList}
                renderItem={({item, index})=>(
                    <TouchableOpacity 
                    onPress={()=>setSelectedTraveler(item)}
                    style={{
                        marginVertical:10
                    }}>
                    <OptionCard 
                        option={item}
                        selectedTraveler={selectedTraveler}    
                    />
                    </TouchableOpacity>
                )}
            />
        </View>
    </View>
  )
}