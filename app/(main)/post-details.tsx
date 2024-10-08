import {
  Alert,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  createComment,
  fetchPostDetails,
  removeComment,
} from "@/services/postService";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import PostCard from "@/components/post-card";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/loading";
import Input from "@/components/input";
import { SendIcon } from "lucide-react-native";
import { comment } from "postcss";
import CommentItem from "@/components/comment-item";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/userService";

const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const inputRef = useRef(null);
  const commentRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [startLoading, setStartLoading] = useState(true);

  const onNewComment = async () => {
    if (!commentRef.current) return null;

    const data = {
      userId: user?.id,
      postId: post?.id,
      text: commentRef?.current,
    };
    console.log(data);
    setLoading(true);
    const res = await createComment(data);
    setLoading(false);
    if (res?.success) {
      // @ts-ignore
      inputRef?.current?.clear();
      commentRef.current = "";
    } else {
      Alert.alert("Comment", res.msg);
    }
  };

  const getPostDetails = async () => {
    console.log(postId);
    const res = await fetchPostDetails(postId as string);
    if (res?.success) setPost(res?.data);
    setStartLoading(false);
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  const handleNewComment = async (payload: any) => {
    console.log("Got new comment", payload.new);
    if (payload.new) {
      const newComment = { ...payload.new };
      const res = await getUserData(newComment.userId);
      newComment.user = res.success ? res?.data : {};
      setPost((prevPost: any) => {
        return { ...prevPost, comments: [newComment, ...prevPost.comments] };
      });
    }
  };

  useEffect(() => {
    const commentChannel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `postId=eq.${postId}`,
        },
        handleNewComment,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentChannel);
    };
  }, []);

  const onCommentDelete = async (comment: any) => {
    console.log("comment", comment);
    const res = await removeComment(comment?.id);
    if (res?.success) {
      setPost((prevPost: any) => {
        const updatedPost = { ...prevPost };
        updatedPost.comments = updatedPost.comments.filter(
          (c: { id: any }) => c.id !== comment?.id,
        );
        return updatedPost;
      });
    } else {
      Alert.alert("Comment", res.msg);
    }
  };

  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <PostCard
          item={{ ...post, comments: [{ count: post.comments.length }] }}
          currentUser={user}
          router={router}
          hasShadow={false}
          showMoreIcon={false}
        />
        <View style={styles.inputContainer}>
          <Input
            inputRef={inputRef}
            placeholder={"Type comment..."}
            // @ts-ignore

            onChangeText={(value) => (commentRef.current = value)}
            placeholderTextColor={theme.colors.textLight}
            containerStyles={{
              flex: 1,
              height: hp(6.2),
              borderRadius: theme.radius.xl,
            }}
          />
          {loading ? (
            <View style={styles.loading}>
              <Loading size={"small"} />
            </View>
          ) : (
            <TouchableOpacity style={styles.sendIcon} onPress={onNewComment}>
              <SendIcon color={theme.colors.primaryDark} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginVertical: 15, gap: 17 }}>
          {post?.comments?.map((comment: any) => (
            <CommentItem
              item={comment}
              onDelete={onCommentDelete}
              key={comment}
            />
          ))}
          {!post?.comments?.length && (
            <Text style={{ color: theme.colors.text, marginLeft: 5 }}>
              Be first to comment!
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: wp(7),
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  list: {
    paddingHorizontal: wp(4),
  },
  sendIcon: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
    height: hp(5.8),
    width: hp(5.8),
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: "bold",
  },

  loading: {
    height: hp(5.8),
    width: hp(5.8),
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.3 }],
  },
});
