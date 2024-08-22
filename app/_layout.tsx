import {Stack} from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";


const Layout = () => {
    return (
        <ScreenWrapper>
        <Stack screenOptions={{headerShown: false}} />
        </ScreenWrapper>
    )
}

export default Layout