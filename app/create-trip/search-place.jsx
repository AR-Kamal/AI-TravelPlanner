import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors } from '../../constants/Colors';

export default function SearchPlace() {

    const navigation=useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'Search'
        })
    }, [])

  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        language: 'en',
        components: 'country:my'
      }}
              // All other default props explicitly defined
        autoFillOnNotFound={false}
        currentLocation={false}
        currentLocationLabel="Current location"
        debounce={0}
        disableScroll={false}
        enableHighAccuracyLocation={true}
        enablePoweredByContainer={true}
        fetchDetails={true}
        filterReverseGeocodingByTypes={[]}
        GooglePlacesDetailsQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          type: 'restaurant',
        }}
        GoogleReverseGeocodingQuery={{}}
        isRowScrollable={true}
        keyboardShouldPersistTaps="always"
        listUnderlayColor="#c8c7cc"
        listViewDisplayed="auto"
        keepResultsAfterBlur={false}
        minLength={1}
        nearbyPlacesAPI="GooglePlacesSearch"
        numberOfLines={1}
        onFail={() => {}}
        onNotFound={() => {}}
        onTimeout={() =>
          console.warn('google places autocomplete: request timeout')
        }
        predefinedPlaces={[]}
        predefinedPlacesAlwaysVisible={false}
        styles={{}}
        suppressDefaultStyles={false}
        textInputHide={false}
        textInputProps={{}}
        timeout={20000}
    />

    </View>
  )
}
