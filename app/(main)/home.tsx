import {Alert, Button, Text, View} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import {supabase} from "@/lib/supabase";

const Home = () => {
    console.log('created all of needed tables in supabase')

    const onLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            Alert.alert("Sign out", "Error signing out" )
        }
    }

    return (
        <ScreenWrapper>
            <Text>Home</Text>
            <Button title={"Log out"} onPress={onLogout} />
        </ScreenWrapper>
    );
};

export default Home;