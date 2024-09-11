import {Button, Text, View} from "react-native";
import {router} from "expo-router";
import ScreenWrapper from "@/components/screen-wrapper";
import Loading from "@/components/loading";


const HomeScreen = () => {

    return ( <View style={{flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: "white"}}>
            <Loading />
        </View>

    )
}

export default HomeScreen