import {Pressable, StyleSheet} from "react-native";
import Icon from "@/assets/icons";
import {theme} from "@/constants/theme";
import {Router} from "expo-router";

interface IBackButtonProps {
    size?: number
    router: Router
}

const BackButton = ({size = 26, router}: IBackButtonProps) => {

    return (
        <Pressable onPress={() => router.back()} style={styles.button}>
            <Icon name={"arrowLeft"} strokeWidth={2.5} color={theme.colors.text} size={size} />
        </Pressable>
    )
}


export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: "rgba(0,0,0,0.07)",
    }
})