import {Button, Text, View} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import {useAuth} from "@/hooks/useAuth";

const Home = () => {

    const { setAuth } = useAuth();

    const onLogout = async () => {

    }

    return (
        <ScreenWrapper>
            <Text>Home</Text>
            <Button title={"Log out"} onPress={onLogout} />
        </ScreenWrapper>
    );
};

export default Home;