import {Button, Text, View} from "react-native";
import {router} from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";


const HomeScreen = () => {

    return ( <ScreenWrapper>
            <Text>Home</Text>
            <Button title={"welcome"} onPress={() => router.push('/welcome')} />
        </ScreenWrapper>

    )
}

export default HomeScreen