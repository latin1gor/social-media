import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AuthProvider from "@/context/auth-provider";
import { User } from "@supabase/auth-js";
import { getUserData } from "@/services/userService";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("Session: ", session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user, session?.user?.email);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);

  const updateUserData = async (user: User, email: string | undefined) => {
    const res = await getUserData(user?.id);
    if (res.success) setUserData({ ...res.data, email });
  };

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
