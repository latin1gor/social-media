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
import {supabase} from "@/lib/supabase";


const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Please enter a valid email address");
            return
        }
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email, password
        })
        setLoading(false)
        console.log(error)
        if (error) {
            Alert.alert("Sign in", error.message);
        }
    }

    return (
        <ScreenWrapper>
            <StatusBar barStyle={"dark-content"}/>
            <View style={styles.container}>
                <BackButton router={router}/>

                <View>
                    <Text style={styles.welcomeText}>Hey,</Text>
                    <Text style={styles.welcomeText}>Welcome back</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>Please login to continue</Text>
                    <Input icon={<Icon name={"mail"} strokeWidth={1.6}/>} placeholder={'Enter your email'} onChangeText={(value: string) => emailRef.current = value} />
                    <Input icon={<Icon name={"lock"} strokeWidth={1.6}/>} placeholder={'Enter your password'} onChangeText={(value: string) => passwordRef.current = value} secureTextEntry />
                    <Text style={styles.forgotPassword}>Forgot password ?</Text>
                    <Button loading={loading} title={"Login"} onPress={onSubmit} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account ?
                    </Text>
                    <Pressable onPress={() => router.push("/sign-up")}>
                        <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: 'bold' }]}>
                        Sign up
                        </Text>
                    </Pressable>
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