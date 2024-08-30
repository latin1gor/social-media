import {Pressable, StyleSheet, Text, View} from "react-native";
import {theme} from "@/constants/theme";
import {hp} from "@/helpers/common";
import Loading from "@/components/loading";

interface IButtonProps {
    textStyle?: any;
    title?: string;
    onPress?: () => void,
    buttonStyle?: any;
    loading: boolean;
    hasShadow?: boolean;
}

const Button = ({title='', buttonStyle, textStyle, onPress=()=>{}, loading = false, hasShadow = true}: IButtonProps ) => {

    const shadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    }

    if (loading) {
        return (
            <View style={[styles.button, buttonStyle, {backgroundColor: "white"}]}><Loading /></View>
    )}

    return (
        <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )
}

export default Button


const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl,
    },
    text: {
        fontSize: hp(2.5),
        color: 'white',
        fontWeight: 'bold',
    }
})