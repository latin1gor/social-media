import {Text} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Home from "@/assets/icons/home";
import {theme} from "@/constants/theme";


const Login = () => {
    return (
            <ScreenWrapper>
                <Text>Login page </Text>
                <Home strokeWidth={2} color={theme.colors.primary} />
            </ScreenWrapper>
    )
}

export default Login