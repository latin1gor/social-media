import {theme} from "@/constants/theme";
import {ActivityIndicator} from "react-native";
import exp from "node:constants";


const Loading = ({size = "large", color = theme.colors.primary}) => {
    return (
        <ActivityIndicator size={size} color={color} />
    )
}

export default Loading