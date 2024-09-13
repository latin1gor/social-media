import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Router, useRouter } from "expo-router";
import ScreenWrapper from "@/components/screen-wrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/helpers/common";
import { User } from "@supabase/auth-js";
import { theme } from "@/constants/theme";

interface IUserHeaderProps {
  user: User | null;
  router: Router;
}

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

const UserHeader = ({ user, router }: IUserHeaderProps) => {
  const handleLogout = async () => {};

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(4) }}
    >
      <View>
        <Header title={"Profile"} showBackButton />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: wp(5),
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },

  userName: {
    fontSize: hp(3),
    fontWeight: "500",
    color: theme.colors.textDark,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: theme.colors.textLight,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "#fee2e2",
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
  },
  noPosts: {
    fontSize: hp(2.5),
    textAlign: "center",
    color: theme.colors.text,
  },
});
