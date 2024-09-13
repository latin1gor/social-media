import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { getUserImageSrc } from "@/services/imageService";

interface IProps {
  uri: string | undefined;
  size?: number;
  rounded?: number;
  style?: any;
}

const Avatar = ({
  uri,
  size = hp(4),
  rounded = theme.radius.md,
  style = {},
}: IProps) => {
  return (
    <Image
      source={getUserImageSrc(uri)}
      transition={100}
      style={[
        styles.avatar,
        { height: size, width: size, borderRadius: rounded },
        style,
      ]}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
});
