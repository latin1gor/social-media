import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Router, useRouter } from "expo-router";
import ScreenWrapper from "@/components/screen-wrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Icon from "@/assets/icons";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/avatar";
import { ICustomUser } from "@/context/auth-provider";

interface IUserHeaderProps {
  user: ICustomUser | null;
  router: Router;
  handleLogout: () => void;
}

const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign out", "Error signing out");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Modal cancelled"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: onLogout,
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenWrapper bg={"white"}>
      <UserHeader user={user} router={router} handleLogout={handleLogout} />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router, handleLogout }: IUserHeaderProps) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(4) }}
    >
      <View>
        <Header title={"Profile"} showBackButton mb={25} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name={"logout"} color={"red"} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xl * 3.4}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => router.push("/edit-profile")}
            >
              <Icon name={"edit"} size={25} strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* username and address */}

          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.infoText}>{user?.address}</Text>
          </View>

          <View style={{ gap: 15 }}>
            <View style={styles.info}>
              <Icon name={"mail"} size={20} color={theme.colors.textLight} />
              <Text style={styles.infoText}>{user?.email}</Text>
            </View>
          </View>

          {user && user?.phoneNumber && (
            <View style={{ gap: 15 }}>
              <View style={styles.info}>
                <Icon name={"phone"} size={20} color={theme.colors.textLight} />
                <Text style={styles.infoText}>{user?.phoneNumber}</Text>
              </View>
            </View>
          )}

          {user && user?.bio && (
            <Text style={styles.infoText}>{user?.bio}</Text>
          )}
        </View>
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
