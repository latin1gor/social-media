import {Pressable, Text} from "react-native";
import Icon from "@/assets/icons";
import {theme} from "@/constants/theme";


const BackButton = ({size = 26}: {size?: number }) => {


    return (
        <Pressable>
            <Icon name={"arrowLeft"} strokeWidth={2.5} color={theme.colors.text} size={size} />
        </Pressable>
    )
}


export default BackButton