import {Button, Text, View} from "react-native";
import {router} from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";


const HomeScreen = () => {

    return (
        <View>
            <Text>Home</Text>
            <Button title={"welcome"} onPress={() => router.push('/welcome')} />
        </View>
    )
}

export default HomeScreen