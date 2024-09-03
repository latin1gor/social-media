import {Alert, Pressable, StatusBar, StyleSheet, Text, View} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import BackButton from "@/components/back-button";
import {useRouter} from "expo-router";
import {hp, wp} from "@/helpers/common";
import {theme} from "@/constants/theme";
import Input from "@/components/input";
import Icon from "@/assets/icons";
import {useRef, useState} from "react";
import Button from "@/components/button";


const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || usernameRef.current) {
            Alert.alert("Please enter a valid email address");
            return
        }
        // good to go
    }

    return (
        <ScreenWrapper>
            <StatusBar barStyle={"dark-content"}/>
            <View style={styles.container}>
                <BackButton router={router}/>

                <View>
                    <Text style={styles.welcomeText}>Let's</Text>
                    <Text style={styles.welcomeText}>Get started</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>Please fill the details to create an account</Text>
                    <Input icon={<Icon name={"user"} strokeWidth={1.6}/>} placeholder={'Enter your name'} onChangeText={(value: string) => emailRef.current = value} />
                    <Input icon={<Icon name={"mail"} strokeWidth={1.6}/>} placeholder={'Enter your email'} onChangeText={(value: string) => emailRef.current = value} />
                    <Input icon={<Icon name={"lock"} strokeWidth={1.6}/>} placeholder={'Enter your password'} onChangeText={(value: string) => passwordRef.current = value} secureTextEntry />
                    <Text style={styles.forgotPassword}>Forgot password ?</Text>
                    <Button loading={loading} title={"Register"} onPress={onSubmit} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account !
                    </Text>
                    <Pressable onPress={() => router.push("/login")}>
                        <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: 'bold' }]}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default SignUp


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