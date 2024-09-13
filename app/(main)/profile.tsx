import { Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/screen-wrapper";
import Header from "@/components/Header";

const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();
  return (
    <ScreenWrapper bg={"white"}>
      <UserHeader user={user} router={router} />
      <Text>Profile</Text>
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Header title={"Profile"} showBackButton />
      </View>
    </View>
  );
};

export default Profile;
