import {Alert, Button, Text, View, StyleSheet} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import {supabase} from "@/lib/supabase";
import {theme} from "@/constants/theme";
import {hp, wp} from "@/helpers/common";

const Home = () => {
    console.log('created all of needed tables in supabase')

    const onLogout = async () => {
        const {error} = await supabase.auth.signOut()

        if (error) {
            Alert.alert("Sign out", "Error signing out")
        }
    }

    return (
        <ScreenWrapper>
            <Text>Home</Text>
            <Button title={"Log out"} onPress={onLogout}/>
        </ScreenWrapper>
    );
};

export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: wp(4)
    },

    title: {
        color: theme.colors.text,
        fontSize: hp(3.2),
        fontWeight: '900',
    },
    avatarImage: {
        height: hp(4.3),
        width: hp(4.3),
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderColor: theme.colors.gray,
        borderWidth: 3
    },

    listStyle: {
        paddingTop: 20,
        paddingHorizontal: wp(4)
    },
    noPosts: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.text
    },
    pill: {
        position: 'absolute',
        right: -10,
        top: -4,
        height: hp(2.2),
        width: hp(2.2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: theme.colors.roseLight
    },

    pillText: {
        color: 'white',
        fontSize: hp(1.2),
        fontWeight: "bold"
    }
})
