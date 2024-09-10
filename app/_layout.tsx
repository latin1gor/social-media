import {Stack, useRouter} from "expo-router";
import ScreenWrapper from "@/components/screen-wrapper";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";
import {supabase} from "@/lib/supabase";
import AuthProvider from "@/context/auth-provider";

const _layout = () => {

    return (
        <AuthProvider>
            <MainLayout/>
        </AuthProvider>
    )

}


const MainLayout = () => {
    const { setAuth } = useAuth()
    const router = useRouter()

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Session: ", session?.user?.id);

            if (session) {
                setAuth(session?.user);
                router.replace("/home");
            } else {
                setAuth(null);
                router.replace("/welcome");
            }

        })
    }, [])


    return (
        <Stack screenOptions={{headerShown: false}} />
    )
}

export default _layout