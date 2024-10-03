import { ICustomUser } from "@/context/auth-provider";
import { Router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { has } from "react-native-reanimated/lib/typescript/createAnimatedComponent/utils";
import Avatar from "@/components/avatar";

interface IPostCardProps {
  item: any;
  currentUser: ICustomUser | null;
  router: Router;
  hasShadow?: boolean;
}

const PostCard = ({
  item,
  currentUser,
  router,
  hasShadow = true,
}: IPostCardProps) => {
  const shadowStyles = {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };

  console.log(item);
  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        {/*user info and post time*/}
        <View style={styles.userInfo}>
          <Avatar
            uri={item?.user?.image}
            size={hp(4.5)}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item?.user?.name}</Text>
            <Text style={styles.postTime}>{item?.created_at}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xl * 1.1,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: "#000",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  postBody: { marginLeft: 5 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  footerButton: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8),
  },

  username: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: "500",
  },

  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: "500",
  },

  content: {
    gap: 10,
    // marginBottom: 10
  },

  postMedia: {
    height: hp(40),
    width: "100%",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
});
