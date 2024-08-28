import {Text} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Home from "@/assets/icons/home";
import {theme} from "@/constants/theme";
import Icon from "@/assets/icons";


const Login = () => {
    return (
            <ScreenWrapper>
                <Text>Login page </Text>
                <Icon name={"home"} />
            </ScreenWrapper>
    )
}

export default Login