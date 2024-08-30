import {StatusBar, StyleSheet, Text, View} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import Icon from "@/assets/icons";
import {theme} from "@/constants/theme";
import BackButton from "@/components/back-button";
import {useRouter} from "expo-router";


const Login = () => {
    const router = useRouter();
    return (
            <ScreenWrapper>
                <StatusBar barStyle={"dark-content"} />
                <View style={styles.container}>
                    <BackButton />
                </View>
            </ScreenWrapper>
    )
}

export default Login


const styles = StyleSheet.create({

})