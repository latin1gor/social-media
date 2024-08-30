import {StatusBar, StyleSheet, Text, View} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import BackButton from "@/components/back-button";
import {useRouter} from "expo-router";
import {hp, wp} from "@/helpers/common";
import {theme} from "@/constants/theme";


const Login = () => {
    const router = useRouter();
    return (
        <ScreenWrapper>
            <StatusBar barStyle={"dark-content"}/>
            <View style={styles.container}>
                <BackButton router={router}/>

                <View>
                    <Text style={styles.welcomeText}>Hey,</Text>
                    <Text style={styles.welcomeText}>Welcome back!</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>Please login to continue</Text>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login


const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 45,
      paddingHorizontal: wp(5)
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: "bold",
        color: theme.colors.text,
    },
    form: {
        gap: 25,
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: 600,
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})