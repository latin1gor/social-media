import { ICustomUser } from "@/context/auth-provider";
import { Router } from "expo-router";
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "@/constants/theme";
import { hp, stripHtmlTags, wp } from "@/helpers/common";
import Avatar from "@/components/avatar";
import moment from "moment";
import {
  Ellipsis,
  HeartIcon,
  MessageSquareMore,
  Share as ShareIcon,
} from "lucide-react-native";
import RenderHTML from "react-native-render-html";
import { downloadFile, getSupabaseFileUrl } from "@/services/imageService";
import { Image } from "expo-image";
import { Video } from "expo-av";
import { createPostLike, removePostLike } from "@/services/postService";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

interface IPostCardProps {
  item: any;
  currentUser: ICustomUser | null;
  router: Router;
  hasShadow?: boolean;
  showMoreIcon?: boolean;
}

const PostCard = ({
  item,
  currentUser,
  router,
  hasShadow = true,
  showMoreIcon = true,
}: IPostCardProps) => {
  const shadowStyles = {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };

  const [likes, setLikes] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLikes(item?.postLIkes);
  }, []);

  console.log("post item comments", item?.comments);

  const created_at = moment(item?.created_at).format("MMM D");
  const liked = likes?.filter(
    (like: any) => like?.userId === currentUser?.id,
  )[0];
  console.log(item);

  const openPostDetails = () => {
    if (!showMoreIcon) return null;
    router.push({ pathname: "/post-details", params: { postId: item.id } });
  };

  const onLike = async () => {
    if (liked) {
      // remove like

      const updatedLikes = likes.filter(
        (like: any) => like.userId !== currentUser?.id,
      );

      setLikes([...updatedLikes]);
      const res = await removePostLike(item?.id, currentUser?.id as string);
      if (!res?.success) {
        Alert.alert("Like", "Fail to like post");
      }
    } else {
      const data = {
        userId: currentUser?.id,
        postId: item?.id,
      };

      setLikes([...likes, data]);
      const res = await createPostLike(data);
      if (!res?.success) {
        Alert.alert("Like", "Fail to like post");
      }
    }
  };

  const onShare = async () => {
    const content = { message: stripHtmlTags(item?.body) };
    if (item?.file) {
      setLoading(true);
      // @ts-ignore
      content.url = await downloadFile(getSupabaseFileUrl(item?.file)?.uri);
      setLoading(false);
    }
    Share.share(content);
  };
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
            <Text style={styles.postTime}>{created_at}</Text>
          </View>
        </View>
        {showMoreIcon && (
          <TouchableOpacity>
            <Ellipsis size={hp(3.4)} strokeWidth={3} color={"black"} />
          </TouchableOpacity>
        )}
      </View>

      {/*Post body & media */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHTML contentWidth={wp(100)} source={{ html: item.body }} />
          )}
        </View>
      </View>

      {item?.file && item?.file?.includes("postImages") && (
        <Image
          source={getSupabaseFileUrl(item.file)}
          transition={100}
          style={styles.postMedia}
          contentFit={"cover"}
        />
      )}

      {item?.file && item?.file?.includes("postVideos") && (
        <Video
          useNativeControls
          style={[styles.postMedia, { height: hp(30) }]}
          // @ts-ignore
          resizeMode={"cover"}
          // @ts-ignore
          source={getSupabaseFileUrl(item?.file)}
          isLooping
        />
      )}

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={onLike}>
            <HeartIcon
              fill={liked ? theme.colors.rose : "transparent"}
              size={24}
              color={liked ? theme.colors.rose : theme.colors.textLight}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes?.length}</Text>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity>
            <MessageSquareMore
              size={24}
              color={theme.colors.textLight}
              onPress={openPostDetails}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{item?.comments[0]?.count || 0}</Text>
        </View>
        <View style={styles.footerButton}>
          {loading ? (
            <Loading size={"small"} />
          ) : (
            <>
              <TouchableOpacity onPress={onShare}>
                <ShareIcon size={24} color={theme.colors.textLight} />
              </TouchableOpacity>
              <Text style={styles.count}>{0}</Text>
            </>
          )}
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
