import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import Icon from "@/assets/icons";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import Avatar from "@/components/avatar";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/postService";
import PostCard from "@/components/post-card";

let limit = 1;
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    limit = limit + 10;
    const res = await fetchPosts(limit);
    if (res.success) {
      // @ts-ignore
      setPosts(res?.data);
    }
  };
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LinkUp</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Icon
                name={"heart"}
                color={theme.colors.text}
                size={hp(3.2)}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/new-post")}>
              <Icon
                name={"add"}
                color={theme.colors.text}
                size={hp(3.2)}
                strokeWidth={2}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Avatar uri={user?.image} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          // @ts-ignore
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard item={item} currentUser={user} router={router} />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },

  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: "800",
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },

  pillText: {
    color: "white",
    fontSize: hp(1.2),
    fontWeight: "bold",
  },
});
