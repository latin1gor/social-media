import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import ScreenWrapper from "@/components/screen-wrapper";
import Header from "@/components/Header";
import { Image } from "expo-image";
import { getUserImageSrc } from "@/services/imageService";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/components/input";
import Icon from "@/assets/icons";
import { useEffect, useState } from "react";
import { LocateIcon, MapPin } from "lucide-react-native";

interface IUserState {
  name: string;
  phoneNumber: string;
  image: string | null;
  bio: string;
  address: string;
}

const defaultValue: IUserState = {
  name: "",
  phoneNumber: "",
  image: null,
  bio: "",
  address: "",
};

const EditProfile = () => {
  const [user, setUser] = useState<IUserState>(defaultValue);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser?.name || "",
        phoneNumber: currentUser?.phoneNumber || "",
        image: currentUser?.image || "",
        bio: currentUser?.bio || "",
        address: currentUser?.address || "",
      });
    }
  }, [currentUser]);

  const imageSource = getUserImageSrc(currentUser?.image);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title={"Edit profile"} />

          {/*form*/}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.cameraIcon}>
                <Icon name={"camera"} size={25} />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>
            <Input
              icon={<Icon name={"user"} />}
              placeholder={"Enter your name"}
              value={user.name}
              onChangeText={(text) =>
                setUser((prevState) => ({ ...prevState, name: text }))
              }
            />
            <Input
              icon={<Icon name={"phone"} />}
              placeholder={"Enter your number"}
              value={user.phoneNumber}
              onChangeText={(text) =>
                setUser((prevState) => ({ ...prevState, phoneNumber: text }))
              }
            />
            <Input
              icon={<MapPin color={"gray"} />}
              placeholder={"Enter your address"}
              value={user.address}
              onChangeText={(text) =>
                setUser((prevState) => ({ ...prevState, address: text }))
              }
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },

  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: "center",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.xl * 1.8,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },

  form: {
    gap: 18,
    marginTop: 20,
  },

  input: {
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  },
});
