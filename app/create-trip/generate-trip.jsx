import { useRouter } from 'expo-router';
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { chatSession } from '../../configs/AiModal';
import { Colors } from '../../constants/Colors';
import { AI_PROMPT } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';
import { auth, db } from './../../configs/FirebaseConfig';

export default function GenerateTrip() {

    const {tripData,setTripData}=useContext(CreateTripContext);
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    

    useEffect(()=>{
        tripData && GenerateAiTrip()
    },[tripData])

    const GenerateAiTrip=async()=>{

        const user=auth.currentUser;

        setLoading(true);

        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',tripData?.locationInfo.name)
        .replace('{totalDays}',tripData?.totalNoOfDays)
        .replace('{totalNight}',tripData?.totalNoOfDays - 1)
        .replace('{traveler}',tripData.traveler?.title)
        .replace('{budget}',tripData?.budget)
        .replace('{totalDays}',tripData?.totalNoOfDays)
        .replace('{totalNight}',tripData?.totalNoOfDays - 1);
        console.log("FINAL PROMPT: ", FINAL_PROMPT)

/*         let rawText;
        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            rawText = result.response.text(); // <-- CORRECT: Get the raw string here
            console.log("AI Response Text:", rawText);
        } catch (error) {
             console.error("Error during AI sendMessage:", error);
             setLoading(false);
             return;
        }       
        
        // 4. Robust Parsing Logic (Fix for 'Unexpected end of input' error)
        let tripResp;
        
        // Check for empty/null response string
        if (!rawText || rawText.trim().length === 0) {
            console.error("AI returned an empty or invalid response string.");
            setLoading(false);
            return; 
        }

        try {
            // Clean up Markdown code fences (```json\n...\n```) from the start and end
            const cleanText = rawText.trim().replace(/^```json\n|```$/g, '');
            
            tripResp = JSON.parse(cleanText); // <-- CORRECT: Parse the cleaned string
            
        } catch (e) {
            console.error("Failed to parse AI response as JSON. Check AI format.", e);
            console.log("Failed Raw AI Response:", rawText); 
            setLoading(false);
            return; 
        }

 */
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result.response.text());
        const tripResp=JSON.parse(result.response.text());


        const docId=Date.now().toString()

        /* const result_=await setDoc(doc(db, "Usertrips", docId),{
            userEmail: user?.email ?? user?.uid,
            tripPlan:tripResp,
            tripData:JSON.stringify(tripData),

        }); */

        // 5. Firestore Save (Fix for previous 'undefined' error)

        try {
            const result_=await setDoc(doc(db, "Usertrips", docId),{
                // user?.email ?? user?.uid ensures a string is always saved
                userEmail: user.email ?? user.uid, 
                tripPlan:tripResp, // tripResp is now a valid object
                tripData:JSON.stringify(tripData),
            });
            console.log("Trip saved successfully with ID:", docId);
        } catch (e) {
            console.error("Error saving trip to Firestore:", e);
            setLoading(false);
            return;
        }

        setLoading(false)

        router.push('(tabs)/mytrip')

    }

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
        marginTop:20,
        textAlign:'center',
      }}>Please Wait...</Text>
        <Text style={{
        fontFamily:'outfit-medium',
        fontSize:25,
        marginTop:40,
        textAlign:'center'
      }}>Your Trip is generating</Text>
            <Image source={require('./../../assets/images/loading.gif')}
                style={{
                    width: '100%',
                    height: 300,
                    objectFit:'contain'
                }}/>    
        <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        color:Colors.GRAY,
        marginTop:20,
        textAlign:'center'
    }}>Don't go back</Text>  
    </View>
  )
}