import { Image, StatusBar, StyleSheet, Text, View} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import {hp, wp} from "@/helpers/common";
import {theme} from "@/constants/theme";
import Button from "@/components/Button";


const Welcome = () => {
    return (
        <ScreenWrapper bg={"white"}>
            <StatusBar barStyle={"dark-content"} />
           <View style={styles.container}>
                <Image source={require("../assets/images/welcome.png")} resizeMode={"contain"} style={styles.welcomeImage} />

               <View style={{gap: 20}}>
                   <Text style={styles.title}>LinkUp!</Text>
                   <Text style={styles.punchline}>Where every thought finds a home and every image tells a story</Text>
               </View>

               <View style={styles.footer}>
                   <Button title="Getting started" onPress={() => {}} buttonStyle={{marginHorizontal: wp(3)}} />
               </View>

           </View>
       </ScreenWrapper>
    )
}

export default Welcome


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: wp(4),
        backgroundColor: "white",
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: "center"
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: "center",
        fontWeight: "bold",
    },
    punchline: {
        textAlign: "center",
        fontSize: hp(1.7),
        paddingHorizontal: wp(10),
        color: theme.colors.text,
    },
    footer: {
        gap: 30,
        width: '100%'
    }
})