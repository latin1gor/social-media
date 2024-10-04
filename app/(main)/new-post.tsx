import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/avatar";
import { useAuth } from "@/hooks/useAuth";
import RichTextEditor from "@/components/rich-text-editor";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ImageIcon, Trash2, VideoIcon } from "lucide-react-native";
import Button from "@/components/button";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset, ImagePickerOptions } from "expo-image-picker";
import { Image } from "react-native";
import { getSupabaseFileUrl } from "@/services/imageService";
import { Video } from "expo-av";
import { createOrUpdatePost } from "@/services/postService";

type FileType = ImagePickerAsset | null | string | any;

const NewPost = () => {
  const { user } = useAuth();

  const bodyRef = useRef("");
  const editorRef = useRef<any>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<FileType>();

  const onPick = async (isImage: boolean) => {
    let mediaConfig: ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    };

    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      };
    }

    const result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const isLocalFile = (file: FileType) => {
    if (!file) return null;
    return typeof file === "object";
  };

  const getFileType = (file: FileType) => {
    if (!file) return null;
    if (isLocalFile(file)) return file.type;

    // check image or video for the remote file
    if (file.includes("postImage")) {
      return "image";
    }
    return "video";
  };

  const getFileUri = (file: FileType) => {
    if (!file) return null;
    if (isLocalFile(file)) return file.uri;

    return getSupabaseFileUrl(file as string)?.uri;
  };

  const onSubmit = async () => {
    if (!bodyRef.current && !file) {
      Alert.alert("Post", "Please enter the all fields (text and media)");
      return;
    }

    const data = {
      file: file,
      body: bodyRef.current,
      userId: user?.id,
    };

    // create post
    setLoading(true);

    const res = await createOrUpdatePost(data);
    setLoading(false);
    console.log(res);

    if (res?.success) {
      setFile(null);
      bodyRef.current = "";
      editorRef.current.setContentHTML("");
      router.back();
    } else {
      Alert.alert("Post", res?.msg);
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title={"Create post"} />
        <ScrollView
          contentContainerStyle={{ gap: 20 }}
          keyboardDismissMode={"on-drag"}
        >
          {/* avatar*/}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Avatar
                uri={user?.image}
                size={hp(6.5)}
                rounded={theme.radius.xl}
              />
            </TouchableOpacity>
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef}
              onChange={(body: any) => (bodyRef.current = body)}
            />
          </View>

          {file && (
            <View style={styles.file}>
              {getFileType(file) === "video" ? (
                <Video
                  // @ts-ignore
                  resizeMode={"cover"}
                  style={{ flex: 1 }}
                  useNativeControls
                  isLooping
                  source={{ uri: getFileUri(file) }}
                />
              ) : (
                <Image
                  source={{ uri: getFileUri(file) }}
                  resizeMode={"cover"}
                  style={{ flex: 1 }}
                ></Image>
              )}
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setFile(null)}
              >
                <Trash2 size={20} color={"white"} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post!</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <ImageIcon size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <VideoIcon size={30} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button
          buttonStyle={{ height: hp(6.2) }}
          hasShadow={false}
          loading={loading}
          title={"Post"}
          onPress={onSubmit}
        />
      </View>
    </ScreenWrapper>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  username: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: theme.colors.text,
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  publicText: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
  },
  textEditor: {
    // marginTop: 10,
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  addImageText: {
    fontSize: hp(1.9),
    color: theme.colors.text,
  },
  imageIcon: {
    // backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.md,
    // padding: 6,
  },
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    padding: 7,
    borderRadius: theme.radius.sm,
  },
});
